import { useEffect, useState } from "react";
import { api } from "../api/Api";
import { OperationButton } from "./Buttons/OperationButton.jsx";

export const Formularios = () => {
  const [nomes, setNomes] = useState([]);
  const [operation, setOperation] = useState("bruto"); //uso este estate pare receber do filho OperationButton o valor da operação

  useEffect(() => {
    api.get("indicadores").then((response) => {
      setNomes(response.data);
    });
    console.log(nomes);
  }, []);

  return (
    <div>
      <h2>Simulador</h2>
      <p>Rendimento I</p>
      <OperationButton setOp={setOperation} />
      <h1>{operation}</h1>
    </div>
  );
};
