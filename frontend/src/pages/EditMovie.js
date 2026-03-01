import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditMovie() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    title: "",
    cast: "",
    category: "",
    description: "",
    year: "",
    director: "",
    episode: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) { navigate("/admin/movies"); return; }

    axios.get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        const data = res.data;
        setMovie({
          title: data.title || "",
          cast: data.cast_names || "",
          category: data.category || "",
          description: data.description || "",
          year: data.year || "",
          director: data.director || "",
          episode: data.episode || "",
        });
        setLoading(false);
      })
      .catch(err => { 
        console.error(err); 
        alert("Movie not found!"); 
        navigate("/admin/movies"); 
      });
  }, [id, navigate]);

  const handleChange = e => setMovie({ ...movie, [e.target.name]: e.target.value });
  const handleFileChange = e => setImage(e.target.files[0]);

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(movie).forEach(k => formData.append(k, movie[k]));
    if (image) formData.append("image", image);

    try {
      await axios.put(`http://localhost:5000/api/movies/${id}`, formData);
      alert("Movie updated successfully!");
      navigate("/admin/movies");
    } catch (err) {
      console.error(err.response || err);
      alert("Error updating movie: " + (err.response?.data?.error || err.message));
    }
  };

  if (loading) return <p>Loading movie data...</p>;

  return (
    <div style={{ padding: "40px" }}>
      <button onClick={() => navigate("/admin/movies")} style={{
        padding: "8px 16px",
        marginBottom: "20px",
        background: "#6b7280",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}>
        ⬅ Back to Movie List
      </button>

      <h2>Edit Movie</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="title" placeholder="Movie Title" value={movie.title} onChange={handleChange} required /><br/><br/>
        <input name="cast" placeholder="Cast Names" value={movie.cast} onChange={handleChange} required /><br/><br/>
        <input name="category" placeholder="Category" value={movie.category} onChange={handleChange} /><br/><br/>
        <textarea name="description" placeholder="Description" value={movie.description} onChange={handleChange}></textarea><br/><br/>
        <input name="year" type="number" placeholder="Year" value={movie.year} onChange={handleChange} /><br/><br/>
        <input name="director" placeholder="Director" value={movie.director} onChange={handleChange} /><br/><br/>
        <input name="episode" type="number" placeholder="Episode Number" value={movie.episode} onChange={handleChange} /><br/><br/>
        <input type="file" onChange={handleFileChange} accept="image/*" /><br/><br/>
        <button type="submit" style={{ padding: "8px 16px", background: "#4CAF50", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Update Movie
        </button>
      </form>
    </div>
  );
}

export default EditMovie;