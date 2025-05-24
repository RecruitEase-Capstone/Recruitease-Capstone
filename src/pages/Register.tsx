import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../components/Api";

function Register() {
  // State untuk simpan input dan pesan
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validasi form dulu
    if (!username || !email || !password || !confirm) {
      setMessage("All fields are required!");
      setIsError(true);
      return;
    }

    if (password !== confirm) {
      setMessage("Passwords do not match!");
      setIsError(true);
      return;
    }

    // Cek data yang akan dikirim
    console.log({
      name: username,
      email,
      password,
      confirm_password: confirm,
    });

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        name: username,
        email,
        password,
        confirm_password: confirm,
      });

      const token = response.data.obj.jwt_token;
      localStorage.setItem("token", token);
      console.log(token);

      setMessage("Registration successful! Please log in.");
      setIsError(false);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error: any) {
      // Tangani error dengan detail
      if (error.response) {
        // Server balas error
        setMessage(error.response.data.message || "Registration failed.");
      } else if (error.request) {
        // Request dikirim, tapi gak ada response
        setMessage("No response from server. Please try again later.");
      } else {
        // Error lain saat setup request
        setMessage(error.message);
      }
      setIsError(true);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-title">Create an Account</h2>
        <p>Enter your personal details to create an account</p>
        <form onSubmit={handleRegister} className="register-form">
          <div className="input-group mb-3">
            <i className="bi bi-person input-icon"></i>
            <input
              className="form-control"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group mb-3">
            <i className="bi bi-envelope input-icon"></i>
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group mb-3">
            <i className="bi bi-lock input-icon"></i>
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-group mb-3">
            <i className="bi bi-lock input-icon"></i>
            <input
              className="form-control"
              type="password"
              placeholder="Password Confirmation"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          {message && (
            <div
              className={isError ? "alert alert-danger" : "alert alert-success"}
            >
              {message}
            </div>
          )}

          <button className="btn btn-primary w-100" type="submit">
            Register
          </button>
        </form>

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
