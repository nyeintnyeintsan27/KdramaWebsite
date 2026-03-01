import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminUpcomingList() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/upcoming");
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this upcoming movie?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/upcoming/${id}`);
      fetchMovies();
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

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
          onClick={() => navigate("/admin/upcoming")}
          style={{
            padding: "8px 15px",
            border: "none",
            background: "#0f172a",
            color: "white",
            cursor: "pointer",
            borderRadius: "6px",
          }}
        >
          + Add Upcoming
        </button>
      </div>

      <h2 style={{ marginBottom: "30px" }}>Upcoming Movies</h2>

      {movies.length === 0 ? (
        <p>No upcoming movies found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
            gap: "30px",
          }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              style={{
                background: "#0f172a",
                color:"white",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={`http://localhost:5000/uploads/${movie.image}`}
                alt={movie.title}
                style={{
                  width: "100%",
                  color:"white",
                  height: "250px",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "15px" }}>
                <h4 style={{color:"white"}}>{movie.title}</h4>

                <p style={{ fontSize: "14px", color: "#fff" }}>
                  {movie.category}
                </p>

                <p style={{ fontSize: "13px", color: "#fff" }}>
                  Release: {movie.release_date}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  <button
                    onClick={() => navigate(`/admin/upcoming/edit/${movie.id}`)}
                    style={{
                      flex: 1,
                      padding: "6px",
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
                    onClick={() => handleDelete(movie.id)}
                    style={{
                      flex: 1,
                      padding: "6px",
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