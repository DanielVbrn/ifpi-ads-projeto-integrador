import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import apiAuth from "../../../services/apiAuth";
import { AuthContext } from "../../AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedIn } = useContext(AuthContext); // Use o contexto de autenticação
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await apiAuth.post("/session", {
        email,
        password,
      });

      // O token de autenticação estará no corpo da resposta do servidor.
      const token = response.data.token;

      // Armazene o token no localStorage ou em outro local seguro para uso posterior
      localStorage.setItem("token", token);

      // Defina o estado de autenticação como true no contexto
      setLoggedIn(true);

      // Redirecionar o usuário para a página após o login bem-sucedido.
      navigate("/Home");
    } catch (error) {
      // Lida com erros de autenticação (credenciais inválidas, servidor offline, etc.).
      console.error("Erro ao fazer login:", { message: error });
    }
  };

  return (
    <div className="main-login">

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
