import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <div className="container mt-4">
        <Outlet />
      </div>
    </>
  );
}

export default AdminLayout;