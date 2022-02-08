import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./OperationButton.css";
import { useState } from "react";

export const RendimentoButton = ({ setOp }) => {
  const [alignment, setAlignment] = useState("bruto");

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
      <ToggleButton value="bruto">
        {alignment === "bruto" ? "✓ Bruto" : "Bruto"}
      </ToggleButton>
      <ToggleButton value="liquido">
        {alignment === "liquido" ? "✓ Líquido" : "Líquido"}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
