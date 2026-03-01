const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db"); // MySQL connection

const app = express();
app.use(cors());
app.use(express.json()); // parse JSON

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // backend/uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ======================
// Admin Login API
// ======================
app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.promise().query(
      "SELECT * FROM users WHERE email = ? AND role = 'admin' AND status='active'",
      [email]
    );

    if (rows.length === 0)
      return res.status(401).json({ message: "Admin not found or inactive" });

    const user = rows[0];

    // Compare password using bcrypt
    const match = await bcrypt.compare(password, user.password);
if (!match) return res.status(401).json({ message: "Invalid password" });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      "your_secret_key", // Change to env secret in production
      { expiresIn: "1d" }
    );

    // Return token and admin info
    res.json({
      message: "Login success",
      token,
      admin: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.log("Admin Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ======================
// Update/Edit Movie
// ======================
app.put("/api/movies/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { title, cast, category, description, year, director, episode } = req.body;
  const newImage = req.file ? req.file.filename : null;

  db.query("SELECT * FROM movies WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ error: "Movie not found" });

    const movie = result[0];
    const updatedTitle = title || movie.title;
    let updatedCast = cast || movie.cast_names;

    try {
      if (typeof updatedCast === "string" && updatedCast.startsWith("[")) {
        updatedCast = JSON.parse(updatedCast).join(",");
      }
    } catch {}

    const sql = `
      UPDATE movies
      SET title=?, cast_names=?, category=?, description=?, year=?, director=?, episode=?, image=?
      WHERE id=?
    `;

    const updatedImage = newImage || movie.image;

    db.query(sql, [updatedTitle, updatedCast, category || movie.category, description || movie.description,
      year || movie.year, director || movie.director, episode || movie.episode, updatedImage, id],
      (err2) => {
        if (err2) return res.status(500).json({ error: err2.message });

        // delete old image if replaced
        if (newImage && movie.image) {
          const fs = require("fs");
          fs.unlink(require("path").join(__dirname, "uploads", movie.image), err3 => {
            if(err3) console.log("Old image deletion error:", err3);
          });
        }

        res.json({ message: "Movie updated successfully" });
      });
  });
});

// ======================
// Delete Movie
// ======================
const fs = require("fs");

app.delete("/api/movies/:id", (req, res) => {
  const id = req.params.id; // <-- use as string, works for INT or UUID

  db.query("SELECT * FROM movies WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ error: "Movie not found" });

    const movie = result[0];

    db.query("DELETE FROM movies WHERE id = ?", [id], (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });

      // Delete image file if exists
      if (movie.image) {
        const filePath = path.join(__dirname, "uploads", movie.image);
        fs.unlink(filePath, (err) => {
          if (err) console.log("Image deletion error:", err);
        });
      }

      res.json({ message: "Movie deleted successfully" });
    });
  });
});


// ======================
// Add Movie API
// ======================
app.post("/api/movies", upload.single("image"), (req, res) => {
  const { title, cast, category, description, year, director, episode } = req.body;
  const image = req.file ? req.file.filename : null;

  // Parse cast if it's a JSON string
  let castNames = cast;
  try {
    if (typeof cast === "string") {
      castNames = JSON.parse(cast).join(",");
    }
  } catch (err) {
    castNames = cast;
  }

  const sql = `
    INSERT INTO movies
    (title, cast_names, category, description, year, director, episode, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, castNames, category, description, year, director, episode, image],
    (err, result) => {
      if (err) {
        console.log("DB Error:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Movie Added Successfully", movieId: result.insertId });
    }
  );
});

// ======================
// Get All Movies API
// ======================
app.get("/api/movies", (req, res) => {
  db.query("SELECT * FROM movies", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// ======================
// Get Single Movie by ID
// ======================
app.get("/api/movies/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM movies WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("DB Error:", err);
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(result[0]);
  });
});
// ======================
// Add Upcoming Movie
// ======================
app.post("/api/upcoming", upload.single("image"), (req, res) => {
  let { title, cast_names, category, description, release_date, director, episode } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  // parse episode
  episode = parseInt(episode) || 1;

  const image = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO upcoming
    (title, cast_names, category, description, release_date, director, episode, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [title, cast_names, category, description, release_date || null, director, episode, image], (err, result) => {
    if (err) {
      console.log("DB Error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Upcoming movie added successfully", upcomingId: result.insertId });
  });
});

// ======================
// Get All Upcoming Movies
// ======================
app.get("/api/upcoming", (req, res) => {
  db.query("SELECT * FROM upcoming ORDER BY release_date ASC", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// ======================
// Get Single Upcoming Movie
// ======================
app.get("/api/upcoming/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM upcoming WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ error: "Upcoming movie not found" });
    res.json(result[0]);
  });
});

// ======================
// Delete Upcoming Movie
// ======================
app.delete("/api/upcoming/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM upcoming WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ error: "Upcoming movie not found" });

    const movie = result[0];
    db.query("DELETE FROM upcoming WHERE id = ?", [id], (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });

      if (movie.image) {
        const filePath = path.join(__dirname, "uploads", movie.image);
        fs.unlink(filePath, (err) => { if (err) console.log("Image deletion error:", err); });
      }

      res.json({ message: "Upcoming movie deleted successfully" });
    });
  });
});


// ======================
// Start Server
// ======================
app.listen(5000, () => {
  console.log("Server running on port 5000");
});