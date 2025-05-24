import React from "react";
import Button from "react-bootstrap/Button";
import logo from "../assets/logo.png";
import image2 from "../assets/vector3.png";
import { useNavigate } from "react-router-dom";

const Beranda = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#01194C",
        color: "#FFFFFF",
        minHeight: "100vh",
        padding: "2rem",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Foreground Image (di depan bg, tapi di belakang teks) */}
      <img
        src={image2}
        alt="Illustration"
        style={{
          position: "absolute",
          top: "50%",
          right: "0",
          transform: "translateY(-50%)",
          height: "100%",
          zIndex: 0,
          //opacity: 0.3,
          objectFit: "contain",
        }}
      />

      {/* Content Layer (zIndex lebih tinggi) */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "3rem",
          }}
        >
          <img src={logo} alt="RecruitEase Logo" style={{ height: "50px" }} />

            <div style={{ display: "flex", gap: "0.5rem" }}>
              {localStorage.getItem("token") ? (
              <>
                <Button
                variant="primary"
                onClick={() => navigate("/upload")}
                >
                Upload Resume
                </Button>
                <Button
                variant="outline-light"
                style={{ borderColor: "#FFFFFF", color: "#FFFFFF" }}
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
                >
                Logout
                </Button>
              </>
              ) : (
              <>
                <Button variant="primary" onClick={() => navigate("/register")}>
                Daftar
                </Button>
                <Button
                  variant="outline-light"
                  style={{
                  borderColor: "#FFFFFF",
                  color: "#FFFFFF",
                  backgroundColor: "transparent",
                  }}
                  onClick={() => navigate("/login")}
                  onMouseOver={e => (e.currentTarget.style.backgroundColor = "#FFFFFF", e.currentTarget.style.color = "#01194C")}
                  onMouseOut={e => (e.currentTarget.style.backgroundColor = "transparent", e.currentTarget.style.color = "#FFFFFF")}
                >
                  Login
                </Button>
              </>
              )}
            </div>
        </div>
      </div>

      {/* Hero Text */}
      <div
        style={{
          maxWidth: "600px",
          position: "absolute",
          left: "50px", // Jarak dari kiri
          top: "50%",
          transform: "translateY(120%)", // Posisi vertikal tengah
        }}
      >
        <h1
          style={{
            fontWeight: "bold",
            fontSize: "2.5rem",
            marginBottom: "1rem",
          }}
        >
          One Click Closer <br /> to the Perfect Candidate
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#DADADA" }}>
          Helping HR analyze resumes automatically with AI to make the
          recruitment process faster and more efficient.
        </p>
      </div>
    </div>
  );
};

export default Beranda;
