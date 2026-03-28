import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.access_token);
      navigate("/gallery");
    } catch (err) {
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Đăng nhập</h2>

        <input
          className="auth-input"
          placeholder="Tên đăng nhập"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Mật khẩu"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-btn" onClick={handleLogin}>
          Vào Thư Viện
        </button>

        <p className="auth-switch">Chưa có tài khoản?</p>

        <button
          className="auth-btn secondary"
          onClick={() => navigate("/register")}
        >
          Đăng ký
        </button>
      </div>
    </div>
  );
}

export default Login;