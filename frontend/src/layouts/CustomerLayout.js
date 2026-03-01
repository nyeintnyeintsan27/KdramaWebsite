import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import FootPage from "../components/FootPage";
import AdminLogin from "../components/AdminLogin";

export default function CustomerLayout() {
  const [showAdminModal, setShowAdminModal] = useState(false);

  return (
    <>
      <Navbar onAdminLoginClick={() => setShowAdminModal(true)} />
      
      <div className="container mt-4">
        <Outlet />
      </div>

      <FootPage />

      {/* Admin Login Modal */}
      {showAdminModal && (
        <AdminLogin onClose={() => setShowAdminModal(false)} />
      )}
    </>
  );
}