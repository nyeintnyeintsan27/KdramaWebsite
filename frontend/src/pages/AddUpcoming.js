import React, { useState } from "react";
import axios from "axios";

export default function AddUpcoming() {
  const [formData, setFormData] = useState({
    title: "",
    cast_names: "",
    category: "",
    description: "",
    release_date: "",
    director: "",
    episode: 1,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (image) data.append("image", image);

    try {
      const res = await axios.post("http://localhost:5000/api/upcoming", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message);

      // Reset form
      setFormData({
        title: "",
        cast_names: "",
        category: "",
        description: "",
        release_date: "",
        director: "",
        episode: 1,
      });
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      setMessage("Failed to add upcoming movie.");
    }
  };

  return (
    <div className="container my-5 p-4 rounded shadow" style={{ maxWidth: "500px", background: "#0f172a", color: "white", fontFamily: "Segoe UI, sans-serif" }}>
       <a href="/admin/upcoming/list" className="btn btn-light">← Back</a>
      <h2 className="text-center mb-4" style={{ letterSpacing: "1px" }}>Add Upcoming Movie</h2>
      {message && <div className="alert text-center" style={{ background: "#1e293b", color: "white", borderRadius: "8px" }}>{message}</div>}
      <form class="container p-3" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <input type="text" name="title" className="form-control" placeholder="Title" value={formData.title} onChange={handleChange} required style={{ background: "#fff", color: "#0f172a", border: "1px solid #0f172a", borderRadius: "8px" }}/>
        </div>
        <div className="mb-3">
          <input type="text" name="cast_names" className="form-control" placeholder="Cast Names (comma separated)" value={formData.cast_names} onChange={handleChange} style={{ background: "#fff", color: "#0f172a", border: "1px solid #0f172a", borderRadius: "8px" }}/>
        </div>
        <div className="mb-3">
          <input type="text" name="category" className="form-control" placeholder="Category" value={formData.category} onChange={handleChange} style={{ background: "#fff", color: "#0f172a", border: "1px solid #0f172a", borderRadius: "8px" }}/>
        </div>
        <div className="mb-3">
          <textarea name="description" className="form-control" placeholder="Description" value={formData.description} onChange={handleChange} style={{ background: "#fff", color: "#0f172a", border: "1px solid #0f172a", borderRadius: "8px", minHeight: "90px" }}></textarea>
        </div>
        <div className="mb-3">
          <input type="date" name="release_date" className="form-control" value={formData.release_date} onChange={handleChange} style={{ background: "#fff", color: "#0f172a", border: "1px solid #0f172a", borderRadius: "8px" }}/>
        </div>
        <div className="mb-3">
          <input type="text" name="director" className="form-control" placeholder="Director" value={formData.director} onChange={handleChange} style={{ background: "#fff", color: "#0f172a", border: "1px solid #0f172a", borderRadius: "8px" }}/>
        </div>
        <div className="mb-3">
          <input type="number" name="episode" className="form-control" min="1" value={formData.episode} onChange={handleChange} style={{ background: "#fff", color: "#0f172a", border: "1px solid #0f172a", borderRadius: "8px" }}/>
        </div>
        <div className="mb-3">
          <input type="file" name="image" className="form-control" accept="image/*" onChange={handleImageChange} style={{ color: "white" }}/>
        </div>
        {preview && (
          <div className="mb-3 rounded overflow-hidden" style={{ border: "1px solid #334155" }}>
            <img src={preview} alt="Preview" className="img-fluid" style={{ maxHeight: 280, objectFit: "cover" }}/>
          </div>
        )}
        <button type="submit" className="btn w-100" style={{ background: "cadetblue", color: "white", fontWeight: "600", borderRadius: "8px", fontSize: "15px" }}>Add Upcoming Movie</button>
      </form>
    </div>
  );
}