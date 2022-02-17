import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./OperationButton.css";
import { useState } from "react";

export const IndexacaoButton = ({ setOp }) => {
  const [alignment, setAlignment] = useState("pos");

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
