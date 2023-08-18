import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Router from "./routes";
import Header from "./components/index";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./login/AuthContext";
import Login from "./login/pages/Login/login";



function App() {
  const isLoggedIn = false; // Altere isso com base no estado de autenticação do usuário

  return (
    <BrowserRouter>
      <AuthProvider>

        <Route path="/session" element={<Login />} />
        <Routes>
          <Header />
          {isLoggedIn ? (
            <Route path="/" element={<Router />} />
          ) : (
            <Route path="/" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
