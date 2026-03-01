import React from "react";
import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  return (
    <div style={{
        background: "#0f172a", // light mode navbar background
        padding: "15px 130px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white", // text color
        transition: "0.4s ease",
      }}>
      <h3 style={{ cursor: "pointer", fontWeight: "bold" }} onClick={() => navigate("/admin")}>KDrama World</h3>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button onClick={() => navigate("/admin")}
          style={{
            padding: "6px 20px",
            background: "cadetblue", // primary button
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "0.3s",
          }}>
          Home
        </button>

        <button onClick={() => navigate("/admin/movies")}
          style={{
            padding: "6px 20px",
            background: "cadetblue", // primary button
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "0.3s",
          }}>
          Movies
        </button>

        <button onClick={() => navigate("/admin/upcoming/list")}
          style={{
            padding: "6px 10px",
            background: "cadetblue", // primary button
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "0.3s",
          }}>
          Upcoming
        </button>

        <button onClick={() => navigate("/")}
          style={{
            padding: "6px 12px",
            background: "#ef4444", // logout button
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "0.3s",
          }}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminNavbar;