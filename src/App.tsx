import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ResumeProvider } from "./context/ResumeContext";

import Beranda from "./pages/Beranda";
import Upload from "./pages/Upload";
import Resume from "./pages/Resume";
import History from "./pages/History";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "primereact/resources/themes/saga-blue/theme.css"; // tema bebas, sesuaikan
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <ResumeProvider>
      <Router>
        <div style={{ minHeight: "100vh" }}>
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Ini semua rute yang butuh login/token */}
            <Route
              path="/Beranda"
              element={
                <ProtectedRoute>
                  <Beranda />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <Upload />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resume"
              element={
                <ProtectedRoute>
                  <Resume />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </ResumeProvider>
  );
}

export default App;
