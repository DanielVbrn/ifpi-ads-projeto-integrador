import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { Badge, Button, Form } from "react-bootstrap";
import "./Exemplary.css";

interface IExemplary {
  tombo: number;
  nome: string;
  equipmentId: number;
  status: boolean;
}

const Exemplary: React.FC = () => {
  const [exemplary, setExemplary] = useState<IExemplary[]>([]);
  const [selectedExemplaries, setSelectedExemplaries] = useState<number[]>([]);
  const [devolutionDate, setDevolutionDate] = useState<string>(""); // Adicionado estado para a data de devolução
  const history = useNavigate();

  useEffect(() => {
    loadExemplarys();
  }, []);

  async function loadExemplarys() {
    try {
      const response = await api.get("/Exemplary");
      setExemplary(response.data);
    } catch (error) {
      console.error("Failed to fetch exemplarys", error);
    }
  }

  function addExemplary() {
    history("/Cadastrar_exemplary", { replace: false });
  }

  function updateExemplary(tombo: number) {
    history(`/Cadastrar_exemplary/${tombo}`, { replace: false });
  }

  async function reserveExemplary(tombo: number) {
    const updatedExemplaryList = exemplary.map((exemplary) =>
      exemplary.tombo === tombo ? { ...exemplary, status: !exemplary.status } : exemplary
    );

    setExemplary(updatedExemplaryList);

    setSelectedExemplaries((prevSelectedExemplaries) =>
      prevSelectedExemplaries.includes(tombo)
        ? prevSelectedExemplaries.filter((exemplaryTombo) => exemplaryTombo !== tombo)
        : [...prevSelectedExemplaries, tombo]
    );
  }

  async function confirmReservations() {
    try {
      const selectedExemplaryIds = selectedExemplaries
        .map((tombo) => exemplary.find((exemplary) => exemplary.tombo === tombo)?.equipmentId)
        .filter(Boolean);

      await api.post("/ReserveExemplary", { exemplaries: selectedExemplaryIds, devolutionDate });
      console.log("Reservations confirmed successfully.");

      setSelectedExemplaries([]); // Limpar os exemplares selecionados após a confirmação
      setDevolutionDate(""); // Limpar a data de devolução após a confirmação
      loadExemplarys(); // Recarregar os exemplares atualizados
    } catch (error) {
      console.error("Failed to confirm reservations", error);
    }
  }

  function deleteExemplary(tombo: number) {
    api.delete(`/Exemplary/${tombo}`)
      .then(() => {
        console.log(`Exemplary ${tombo} deleted successfully.`);
        loadExemplarys();
      })
      .catch((error) => {
        console.error(`Failed to delete exemplary ${tombo}`, error);
      });
  }

  return (
    <div className="container">
      <br />
      <h1>Reservas deste Equipamento</h1>
      <br />
      <div className="exemplary-header">
        <Button variant="dark" size="sm" onClick={addExemplary}>
          Cadastrar Reserva
        </Button>
        <Button variant="dark" size="sm" onClick={() => history("/Equipments")}>
          Voltar
        </Button>
      </div>
      <br />
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>Tombo</th>
            <th>Status</th>
            <th>Ações</th>
            <th>Reservar</th>
          </tr>
        </thead>
        <tbody>
          {exemplary.map((exemplary) => (
            <tr key={exemplary.tombo}>
              <td>{exemplary.tombo}</td>
              <td>
                <Badge bg={exemplary.status ? "success" : "warning"}>
                  {exemplary.status ? "Disponível" : "Indisponível"}
                </Badge>
              </td>
              <td>
                <div className="btn-group" role="group" aria-label="Exemplo de botões separados">
                  <Button size="sm" onClick={() => updateExemplary(exemplary.tombo)}>
                    Editar
                  </Button>{" "}
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => deleteExemplary(exemplary.tombo)}
                  >
                    Remover
                  </Button>{" "}
                </div>
              </td>
              <td>
                <Button
                  size="sm"
                  variant={selectedExemplaries.includes(exemplary.tombo) ? "info" : "success"}
                  onClick={() => reserveExemplary(exemplary.tombo)}
                  disabled={!exemplary.status}
                >
                  {selectedExemplaries.includes(exemplary.tombo) ? "Selecionado" : "Reservar"}
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Form.Group controlId="devolutionDate">
        <Form.Label>Data de Devolução:</Form.Label>
        <Form.Control
          type="date"
          value={devolutionDate}
          onChange={(e) => setDevolutionDate(e.target.value)}
        />
      </Form.Group>
      <br />
      <Button
        className="bt-confirm"
        variant="primary"
        disabled={selectedExemplaries.length === 0 || !devolutionDate}
        onClick={confirmReservations}
      >
        Confirmar Reservas
      </Button>
    </div>
  );
};

export default Exemplary;
