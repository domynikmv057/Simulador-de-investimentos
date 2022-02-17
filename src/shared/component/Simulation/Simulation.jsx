//  Sobre o Codigo...
// ...
// Esse é o componente responsável pela simulação, primeiramente uso um useEffect para
// pegar da api os dados que eu quero, como explicado na parte de IndexacaoButton.jsx
// eu guardava a informação do valor escolhido no botão, e a envio para este componente
// então eu pego essa informação e uso ela para pegar o tipo de simulação escolhido LINHA: 20
// após separa a simulação que eu queria da api eu a salvo em um estado e uso para montar
// os cards da simulação.

import { useEffect, useState } from "react";
import { api } from "../../api/Api.js";
import "./Simulation.css";

export const Simulation = ({ indexacaoValue, rendimentoValue }) => {
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
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
