import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Equipments from "./pages/Equipements/Equipments";
import EquipmentsForm from "./pages/Equipements/Form"
import EquipmentsDetail from "./pages/Equipements/Detail"
import EquipmentsReserve from "./pages/Equipements/Reserve"
import Exemplary from "./pages/Equipements/Exemplarys/Exemplary"
import ExemplaryForm from "./pages/Equipements/Exemplarys/Form"
import Login from "./login/pages/Login/login"


export const Router: React.FC = () => {
    return (
        <Routes>
            <Route path="/session" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Equipments" element={<Equipments />} />
            <Route path="/Cadastrar_equipamentos" element={<EquipmentsForm />} />
            <Route path="/Cadastrar_equipamentos/:equipmentId" element={<EquipmentsForm />} />
            <Route path="/Equipments/:equipmentId" element={<EquipmentsDetail/>} />
            <Route path="/Equipments/:equipmentId" element={<EquipmentsReserve/>} />
            <Route path="/Exemplary" element={<Exemplary />} />
            <Route path="/Cadastrar_exemplary" element={<ExemplaryForm />} />
            <Route path="/Cadastrar_exemplary" element={<ExemplaryForm />} />

        </Routes>
    );
}

export default Router;
