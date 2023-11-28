import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import apiAuth from "../../../services/apiAuth";
import { AuthContext } from "../../AuthContext";
import image from "./login-img.png"

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await apiAuth.post("/session", {
        email,
        password,
      });

      const token = response.data.token;

      localStorage.setItem("token", token);
      setLoggedIn(true);
      navigate("/Home");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao fazer login:", error.message);
      } else {
        console.error("Erro ao fazer login. Erro desconhecido.");
      }
    }
  };

  return (
    // Adicione a classe CSS ao div principal para definir a imagem de fundo
    <div className="main-login">
      <div className="left-login">
        <img src={image} alt="" />
      </div>
      <div className="right-login">
        <div className="card-login">
          <h1>LOGIN</h1>
          <div className="textfield">
            <input
              type="email"
              name="usuario"
              placeholder="Usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="textfield">
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn-login" onClick={handleLogin}>
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
