import React from "react";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Yakin ingin keluar?");
    if (confirmLogout) {
       localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-between p-4 shadow"
      style={{ width: "330px", minHeight: "100vh", backgroundColor: "#01194C" }}
    >
      <div>
      {/* Logo */}
      <div className="text-center mb-4">
        <a href="/">
        <img src={logo} alt="Logo ResumeEase" style={{ height: "50px" }} />
        </a>
      </div>

      {/* Navigation Links */}
      <Nav className="flex-column gap-2">
        <Nav.Link
        className={`sidebar-link ${window.location.pathname === "/upload" ? "active" : ""}`}
        href="/upload"
        style={
          window.location.pathname === "/upload"
          ? { color: "#01194C", background: "#fff", fontWeight: "bold" }
          : { color: "#fff" }
        }
        >
        <i className="bi bi-upload me-2"></i> Upload Resume
        </Nav.Link>
        <Nav.Link
        className={`sidebar-link ${window.location.pathname === "/resume" ? "active" : ""}`}
        href="/resume"
        style={
          window.location.pathname === "/resume"
          ? { color: "#01194C", background: "#fff", fontWeight: "bold" }
          : { color: "#fff" }
        }
        >
        <i className="bi bi-card-text me-2"></i> Resume Summary
        </Nav.Link>
        <Nav.Link
        className={`sidebar-link ${window.location.pathname === "/history" ? "active" : ""}`}
        href="/history"
        style={
          window.location.pathname === "/history"
          ? { color: "#01194C", background: "#fff", fontWeight: "bold" }
          : { color: "#fff" }
        }
        >
        <i className="bi bi-clock-history me-2"></i> History
        </Nav.Link>
      </Nav>
      </div>

      <div>
      <Nav.Link
        className="text-white sidebar-link"
        onClick={handleLogout}
        style={{ cursor: "pointer" }}
      >
        <i className="bi bi-box-arrow-right me-2"></i> Logout
      </Nav.Link>
      </div>
    </div>
  );
};

export default Sidebar;
