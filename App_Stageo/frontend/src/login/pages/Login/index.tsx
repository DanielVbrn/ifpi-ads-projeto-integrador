import React from "react";
import "./index.css"

const Login: React.FC = () => {
  return (
        <div className="main-login">
          <div className="left-login">
            <img
              src="https://drive.google.com/uc?id=18k0fdcM8edDEnB6Zk6lkYp8x6dUwtPkk"
              alt="Três homens pilotando drones"
              className="left-login-image"
            />
          </div>

          <div className="right-login">
            <div className="card-login">
              <h1>LOGIN</h1>
              <div className="textfield">
                <input type="text" name="usuario" placeholder="Usuário" />
              </div>
              <div className="textfield">
                <input type="password" name="senha" placeholder="Senha" />
              </div>
              <button className="btn-login">
                <a href="./Home">Entrar</a>
              </button>
            </div>
          </div>
        </div>
  );
};

export default Login;
