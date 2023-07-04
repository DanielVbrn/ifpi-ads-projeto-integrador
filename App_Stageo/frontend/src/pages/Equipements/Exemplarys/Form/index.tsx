import React, { ChangeEvent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../../services/api";
import "./index.css";
import Equipments from "../../Equipments";

interface IExemplary {
  tombo: number;
  equipmentId: number;
  status: boolean;
}

const Exemplary: React.FC = () => {
  const history = useNavigate();
  const { tombo } = useParams(); // Obtém o ID da URL

  const [model, setModel] = useState<IExemplary>({
    tombo: 0,
    equipmentId: 0,
    status: true
  });

  useEffect(() => {
    // Verifica se é uma edição e carrega os dados do equipamento existente
    if (tombo !== undefined) {
      findExemplary(tombo);
    }
  }, [tombo]);

  async function findExemplary(tombo: string) {
    try {
      const response = await api.get(`/Exemplary/${tombo}`);
      const equipmentData = response.data;
      setModel(equipmentData);
    } catch (error) {
      console.error("Failed to fetch exemplary", error);
    }
  }

  function updateModel(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    setModel(prevModel => ({
      ...prevModel,
      [name]: value
    }));
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (tombo) {
        const response = await api.put(`/Exemplary/${tombo}`, model);
        console.log(response);
      } else {
        const response = await api.post(`/Exemplary`, model);
        console.log(response);
      }

      history("/Exemplary/"); // Redireciona para a página de lista de equipamentos
    } catch (error) {
      console.error("Failed to save exemplary", error);
    }
  }

  function back() {
    history("/Exemplary");
  }

  return (
    <div className="container">
      <br />
      <div className="equipment-header">
        <h1>{tombo ? "Editar Reserva" : "Nova Reserva"}</h1>
        <Button variant="dark" onClick={back} size="sm">
          Voltar
        </Button>
      </div>
      <br />
      <div className="container">
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <h3>Status</h3>
            <Form.Check
              type="checkbox"
              label="Disponível"
              name="status"
              checked={model.status}
              onChange={updateModel}
            />
          </Form.Group>

          <Button variant="dark" type="submit">
            Salvar
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Exemplary;
