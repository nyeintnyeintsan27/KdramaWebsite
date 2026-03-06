import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DramaCard from "../components/DramaCard";

function MovieList() {
  // ===== Theme state =====
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState(""); // search input state
  const [selectedCategory, setSelectedCategory] = useState(""); // category filter
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/movies");
        setMovies(res.data);
        setFilteredMovies(res.data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    let filtered = movies;

    if (search) {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(lowerSearch)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(movie =>
        movie.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredMovies(filtered);
  }, [search, selectedCategory, movies]);

  const categories = Array.from(new Set(movies.map(m => m.category))).filter(Boolean);

  return (
    <div style={{ padding: "40px" }}>

      {/* == THEME BUTTON (TOP RIGHT) == */}
    <div className="d-flex justify-content-end mb-3">
      <button
        className="btn btn-sm btn-danger rounded-pill"
        onClick={toggleTheme}
      >
        {theme === "dark" ? "🌙 Dark" : "☀ Light"}
      </button>
    </div>

    <style>
      {`
        :root[data-theme="dark"] {
          --bg-color: #111;
          --text-color: #fff;
        }

        :root[data-theme="light"] {
          --bg-color: #f4f4f4;
          --text-color: #000;
        }

        body {
          background: var(--bg-color);
          color: var(--text-color);
          transition: 0.4s ease;
        }
      `}
    </style>

      <h2>Movie Catalog</h2>
      {/* Search and Category flex container */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
          marginBottom: "20px",
          gap: "10px",
        }}
      >
        {/* Left Search */}
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            flex: "1 1 200px", 
            minWidth: "150px",
          }}
        />

        {/* Right: Categories */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          <button
            onClick={() => setSelectedCategory("")}
            style={{
              padding: "6px 12px",
              borderRadius: "5px",
              border: selectedCategory === "" ? "2px solid #e36939" : "1px solid #ccc",
              background: selectedCategory === "" ? "#e36939" : "#fff",
              color: selectedCategory === "" ? "#fff" : "#000",
              cursor: "pointer",
            }}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "6px 12px",
                borderRadius: "5px",
                border: selectedCategory === cat ? "2px solid #e36939" : "1px solid #ccc",
                background: selectedCategory === cat ? "#e36939" : "#fff",
                color: selectedCategory === cat ? "#fff" : "#000",
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="row mt-4">
        {filteredMovies.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          filteredMovies.map((movie) => (
            <DramaCard
              key={movie.id}
              title={movie.title}
              image={`http://localhost:5000/uploads/${movie.image}`}
              onClick={() => navigate(`/movies/${movie.id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default MovieList;