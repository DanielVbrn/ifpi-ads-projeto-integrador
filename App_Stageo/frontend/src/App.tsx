import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Router from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider, AuthContext } from "./login/AuthContext";
import Login from "./login/pages/Login/login";
import Header from "./components";


function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Router/>
      <Routes>
        <Route path="/" element={<Navigate to="/session" replace />} />
        <Route path="/session" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
