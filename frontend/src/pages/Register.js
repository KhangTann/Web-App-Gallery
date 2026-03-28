import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("/auth/register", {
        username,
        email,
        password,
      });

      alert("Đăng ký thành công!");
      navigate("/");
    } catch (err) {
      alert("Đăng ký thất bại!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Đăng ký</h2>

        <input
          className="auth-input"
          placeholder="Tên đăng nhập"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="auth-input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Mật khẩu"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-btn" onClick={handleRegister}>
          Tạo tài khoản
        </button>

        <p className="auth-switch">Đã có tài khoản?</p>

        <button
          className="auth-btn secondary"
          onClick={() => navigate("/")}
        >
          Quay lại đăng nhập
        </button>
      </div>
    </div>
  );
}

export default Register;