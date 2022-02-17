import { useEffect, useState } from "react";
import { api } from "../../api/Api.js";
import "./Simulation.css";

export const Simulation = ({ indexacaoValue, rendimentoValue }) => {
  const [simlationsApi, setSimlationsApi] = useState([]);
  const [selectedSimulation, setSelectedSimulation] = useState([]);
  useEffect(() => {
    api.get("simulacoes").then((response) => {
      const respData = response.data;
      respData.map((item) => {
        if (
          item.tipoIndexacao === indexacaoValue &&
          item.tipoRendimento === rendimentoValue
        ) {
          setSelectedSimulation(item);
        }
      });
      setSimlationsApi(respData);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const OperationChose = () => {
    console.log(selectedSimulation);
    console.log(simlationsApi);
  };
  return (
    <section className="main-section-simulation">
      <h2>Resultado da Simulação</h2>
      <ul className="simulation-list">
        <li>
          <h3>Valor Final Bruto</h3>
          <p>R$ {selectedSimulation.valorFinalBruto}</p>
        </li>
        <li>
          <h3>Alíquota do IR</h3>
          <p>{selectedSimulation.aliquotaIR} %</p>
        </li>
        <li>
          <h3>Valor Pago em IR</h3>
          <p>R$ {selectedSimulation.valorPagoIR}</p>
        </li>
        <li>
          <h3>Valor Final Líquido</h3>
          <p className="green-style">
            R$ {selectedSimulation.valorFinalLiquido}
          </p>
        </li>
        <li>
          <h3>Valor Total Investido</h3>
          <p>R$ {selectedSimulation.valorTotalInvestido}</p>
        </li>
        <li>
          <h3>Ganho Líquido</h3>
          <p className="green-style">R$ {selectedSimulation.ganhoLiquido}</p>
        </li>
      </ul>
    </section>
  );
};
