import React, { useState } from "react";
import axios from "axios";

export default function AdminLogin({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      console.log("Login response:", res.data);

      const token = res.data.token;
      if (token) {
        localStorage.setItem("adminToken", token);
        // redirect to admin dashboard
        window.location.href = "/admin";
      } else {
        alert("Login failed, no token returned");
      }
    } catch (err) {
      console.log("Login error:", err.response?.data);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ background: "rgba(0,0,0,0.85)", zIndex: 9999 }}
      onClick={onClose}>
      <form
        onSubmit={handleLogin}
        className="bg-white p-5 rounded-4"
        style={{ minWidth: "350px", maxWidth: "400px" }}
        onClick={(e) => e.stopPropagation()}>

        <h2 className="mb-4 text-center">Admin Login</h2>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-danger" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}