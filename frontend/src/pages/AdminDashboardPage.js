import React, { useEffect, useState } from "react";
import AdminCard from "../components/AdminCard";
import axios from "axios";

function AdminDashboard() {
  const [moviesCount, setMoviesCount] = useState(0);
  const [upcomingCount, setUpcomingCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const moviesRes = await axios.get("http://localhost:5000/api/movies");
        const upcomingRes = await axios.get("http://localhost:5000/api/upcoming");
        setMoviesCount(moviesRes.data.length); 
        setUpcomingCount(upcomingRes.data.length);
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div style={{
        padding: "50px",
        minHeight: "100vh",
        background: "transparent",
        color: "#94a3b8",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{
          marginBottom: "40px",
          fontWeight: "700",
          letterSpacing: "1px",
          color: "#0f172a",
        }}
      >
        Admin Dashboard
      </h1>

      <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
        }}
      >
        <AdminCard title="Movies" description={`Manage movies (${moviesCount})`} route="/admin/movies"/>
        <AdminCard title="Upcoming" description={`Manage upcoming (${upcomingCount})`} route="/admin/upcoming/list"/>

      </div>
    </div>
  );
}

export default AdminDashboard;