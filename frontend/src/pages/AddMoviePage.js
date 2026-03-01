import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddMovie() {
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    title: "",
    cast: "",
    category: "",
    description: "",
    year: "",
    director: "",
    episode: ""
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const castArray = movie.cast.split(",").map(name => name.trim());

    const formData = new FormData();
    formData.append("title", movie.title);
    formData.append("cast", JSON.stringify(castArray));
    formData.append("category", movie.category);
    formData.append("description", movie.description);
    formData.append("year", movie.year);
    formData.append("director", movie.director);
    formData.append("episode", movie.episode);
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/movies", formData);
      alert("Movie added successfully");

      setMovie({
        title: "",
        cast: "",
        category: "",
        description: "",
        year: "",
        director: "",
        episode: ""
      });

      setImage(null);

    } catch (err) {
      console.error(err.response?.data || err);
      alert("Error adding movie: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="container my-5">
      {/* Top Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-dark" onClick={() => navigate("/admin/movies")}>← Back to Dashboard</button>
        <div></div>
      </div>

      {/* Form Card */}
      <div className="card shadow-sm p-4" style={{ maxWidth: "600px", margin: "auto", borderRadius: "10px", background: "#0f172a" }}>
        <h2 className="text-center" style={{ color: "white" }}>Add Movie</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label text-white">Title</label>
            <input type="text" name="title" className="form-control" placeholder="Movie Title" value={movie.title} onChange={handleChange} required style={{ background: "#0f172a", color: "white", border: "1px solid #fff" }}/>
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Cast</label>
            <input type="text" name="cast" className="form-control" placeholder="Cast Names (comma separated)" value={movie.cast} onChange={handleChange} required style={{ background: "#0f172a", color: "white", border: "1px solid #fff" }}/>
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Category</label>
            <input type="text" name="category" className="form-control" placeholder="Category" value={movie.category} onChange={handleChange} style={{ background: "#0f172a", color: "white", border: "1px solid #fff" }}/>
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Description</label>
            <textarea name="description" className="form-control" placeholder="Description" value={movie.description} onChange={handleChange} rows="4" style={{ background: "#0f172a", color: "white", border: "1px solid #fff" }} />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Year</label>
            <input type="number" name="year" className="form-control" placeholder="Year" value={movie.year} onChange={handleChange} style={{ background: "#0f172a", color: "white", border: "1px solid #fff" }}/>
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Director</label>
            <input type="text" name="director" className="form-control" placeholder="Director" value={movie.director} onChange={handleChange} style={{ background: "#0f172a", color: "white", border: "1px solid #fff" }}/>
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Episode</label>
            <input type="number" name="episode" className="form-control" placeholder="Episode Number" value={movie.episode} onChange={handleChange} style={{ background: "#0f172a", color: "white", border: "1px solid #fff" }}/>
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Poster</label>
            <input type="file" className="form-control" accept="image/*" onChange={handleFileChange} style={{ color: "white" }} />
          </div>
          <button type="submit" className="btn w-100" style={{ background: "cadetblue", color: "white", fontWeight: "600" }}>Add Movie</button>
        </form>
      </div>
    </div>
  );
}

export default AddMovie;