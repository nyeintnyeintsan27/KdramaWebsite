import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function MovieDetail() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error("Error fetching movie:", err);
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div style={{ padding: "40px", display: "flex", justifyContent: "center" }}>
      
      {/* ================= THEME BUTTON ================= */}
      <div style={{ position: "absolute", top: "20px", right: "30px" }}>
        <button
          className="btn btn-sm btn-outline-danger rounded-pill"
          onClick={toggleTheme}
        >
          {theme === "dark" ? "🌙 Dark" : "☀ Light"}
        </button>
      </div>

      {/* ================= CSS ================= */}
      <style>
        {`
        :root[data-theme="dark"] {
          --bg-color: #111;
          --text-color: #fff;
          --card-bg: #1f1f1f;
        }

        :root[data-theme="light"] {
          --bg-color: #f4f4f4;
          --text-color: #000;
          --card-bg: #ffffff;
        }

        body {
          background: var(--bg-color);
          color: var(--text-color);
          transition: 0.4s ease;
        }

        .movie-card {
          background: var(--card-bg);
          border-radius: 16px;
          padding: 30px;
          max-width: 900px;
          width: 100%;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .movie-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 30px;
          align-items: start;
        }

        .movie-image {
          width: 100%;
          border-radius: 12px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.25);
        }

        .movie-title {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 15px;
        }

        .movie-info p {
          margin-bottom: 10px;
          line-height: 1.6;
        }

        .back-btn {
          padding: 8px 16px;
          margin-bottom: 20px;
          background: #6b7280;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .back-btn:hover {
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .movie-grid {
            grid-template-columns: 1fr;
          }
        }
      `}
      </style>

      <div className="movie-card">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="back-btn"
        >
          ⬅ Back
        </button>

        <div className="movie-grid">
          <img
            src={`http://localhost:5000/uploads/${movie.image}`}
            alt={movie.title}
            className="movie-image"
          />

          <div className="movie-info">
            <div className="movie-title">{movie.title}</div>

            <p><strong>Cast:</strong> {movie.cast_names}</p>
            <p><strong>Category:</strong> {movie.category}</p>
            <p><strong>Description:</strong> {movie.description}</p>
            <p><strong>Year:</strong> {movie.year}</p>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Episode:</strong> {movie.episode}</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default MovieDetail;