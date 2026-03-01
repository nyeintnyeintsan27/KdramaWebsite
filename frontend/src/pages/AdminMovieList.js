import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminMovieList() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/movies");
      setMovies(res.data);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  useEffect(() => { fetchMovies(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
      const res = await axios.delete(`http://localhost:5000/api/movies/${id}`);
      console.log(res.data.message);
      fetchMovies();
    } catch (err) {
      console.error("Delete error:", err.response ? err.response.data : err);
      alert(err.response?.data?.error || "Delete failed");
    }
  };

  return (
    <div style={{ padding: "40px", background: "transparent", minHeight: "100vh" }}>

      {/* TOP BAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <button
          onClick={() => navigate("/admin")}
          style={{
            padding: "8px 15px",
            border: "none",
            background: "#0f172a",
            color: "white",
            cursor: "pointer",
            borderRadius: "6px",
          }}
        >
          ← Back to Dashboard
        </button>

        <button
          onClick={() => navigate("/admin/movies/add")}
          style={{
            padding: "8px 15px",
            border: "none",
            background: "#0f172a",
            color: "white",
            cursor: "pointer",
            borderRadius: "6px",
          }}
        >
          + Add Movie
        </button>
      </div>

      <h2 style={{ marginBottom: "30px" }}>Movies</h2>

      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
            gap: "30px",
          }}
        >
          {movies.map((m) => (
            <div
              key={m.id}
              style={{
                background: "#0f172a",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                display: "flex",
                color:"white",
                flexDirection: "column",
                minHeight: "420px"
              }}
            >
              <img
                src={`http://localhost:5000/uploads/${m.image}`}
                alt={m.title}
                style={{
                  width: "100%",
                  height: "250px",
                  color:"white",
                  objectFit: "cover",
                }}
              />

              <div
                style={{
                  padding: "15px",
                  display: "flex",
                  color:"white",
                  flexDirection: "column",
                  flex: 1
                }}
              >
                <h4 style={{ marginBottom: "6px" }}>{m.title}</h4>

                <p style={{ fontSize: "13px", color: "#fff" }}>
                  {m.category}
                </p>

                <p style={{ fontSize: "13px", color: "#fff" }}>
                  Year: {m.year}
                </p>

                <p style={{ fontSize: "13px", color: "#fff" }}>
                  Director: {m.director}
                </p>

                {/* BUTTONS */}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "auto"
                  }}
                >
                  <button
                    onClick={() => navigate(`/admin/movies/edit/${m.id}`)}
                    style={{
                      flex: 1,
                      padding: "8px",
                      border: "none",
                      background: "cadetblue",
                      color: "white",
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(m.id)}
                    style={{
                      flex: 1,
                      padding: "8px",
                      border: "none",
                      background: "#ef4444",
                      color: "white",
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                  >
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminMovieList;