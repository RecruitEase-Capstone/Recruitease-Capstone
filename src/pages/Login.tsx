import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "primereact/button";
import Beranda from "./Beranda";
import axios from "axios";
import { API_BASE_URL } from "../components/Api";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setMessage("Email and password are required!");
      setIsError(true);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      const token = response.data.obj.jwt_token;
      localStorage.setItem("token", token);
      console.log(token);

      setMessage("Login successful!");
      setIsError(false);

      setTimeout(() => {
        navigate("/Upload");
      }, 1500);
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
      setIsError(true);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login to Your Account</h2>
        <p>Enter your email & password to login</p>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <i className="bi bi-envelope input-icon"></i>
            <input
              className="input-field"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="input-group">
            <i className="bi bi-lock input-icon"></i>
            <input
              className="input-field"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>

          {message && (
            <div className={isError ? "alert error" : "alert success"}>
              {message}
            </div>
          )}

          <div className="flex justify-content-center mt-3">
            <Button
              type="submit"
              label="Login"
              icon="pi pi-user"
              className="w-10rem"
              style={{
                borderRadius: "16px",
                padding: "10px 30px",
                fontSize: "14px",
              }}
            />
          </div>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
