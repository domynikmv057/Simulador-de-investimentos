//  Sobre o Codigo...
// ...
// IndexacaoButton é meu componente para criar os botoes de alternância, uso eles para fazer a seleção das opções
// Pre, Pos e Fixado, para que o usuário possa escolhe no tipo de indexação que ele deseja.
// ...
//  Uso o sate [alignment] para armazenar a opção escolhida e enviar essa informação para o componente
// que poderia vir a ser usada futuramente
// ...

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./OperationButton.css";
import { useState } from "react";

export const IndexacaoButton = ({ setOp }) => {
  const [alignment, setAlignment] = useState("pos"); //usado para guardar o valor do botao.

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    setOp(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      {/* aqui eu uso esse ternário para que ele veja qual valor está salvo no state, 
      caso seja o mesmo valor que o dele ele adiciona "✓ " no texto do botão. */}
      <ToggleButton value="pre">
        {alignment === "pre" ? "✓ PRÉ" : "PRÉ"}
      </ToggleButton>
      <ToggleButton value="pos">
        {alignment === "pos" ? "✓ POS" : "POS"}
      </ToggleButton>
      <ToggleButton value="ipca">
        {alignment === "fixado" ? "✓ FIXADO" : "FIXADO"}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
