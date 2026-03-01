import React from "react";
import { useNavigate } from "react-router-dom";

function AdminCard({ title, description, route }) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(route)} style={{
        width: "260px",
        padding: "25px",
        margin: "20px",
        backgroundColor: "#0f172a",
        color: "#fff",
        borderRadius: "12px",
        cursor: "pointer",
        transition: "0.3s",
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
      }}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default AdminCard;