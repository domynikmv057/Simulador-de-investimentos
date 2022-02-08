import { useEffect, useState } from "react";
import { api } from "../api/Api";
import { RendimentoButton } from "./Buttons/RendimentoButton.jsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { IndexacaoButton } from "./Buttons/IndexacaoButton.jsx";
import "./Form.css";

export const Formularios = () => {
  const [nomes, setNomes] = useState([]);
  const [rendimentoValue, setRendimentoValue] = useState("bruto"); //uso este estate pare receber do filho RendimentoButton o valor da operação
  const [indexacaoValue, setIdexacaoValue] = useState("pos");
  useEffect(() => {
    api.get("indicadores").then((response) => {
      setNomes(response.data);
    });
    console.log(nomes);
  }, []);

  return (
    <div>
      <div className="main-container">
        <section className="left-form-container">
          <span className="space-element">
            <h2>Simulador</h2>
            <p>Rendimento I</p>
            <RendimentoButton setOp={setRendimentoValue} />
          </span>

          <span className="riht-button-span">
            <p>Tipos de indexação I</p>
            <IndexacaoButton setOp={setIdexacaoValue} />
          </span>
        </section>

        <section className="right-form-container">
          <form action="" className="form-group">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1 },
              }}
              noValidate
              autoComplete="off"
              className="form-input-text space-element"
            >
              <TextField
                id="standard-basic"
                label="Aporte Inicial"
                variant="standard"
                required
              />
              <TextField
                id="standard-basic"
                label="Prazo (em meses)"
                variant="standard"
                required
              />
              <TextField
                id="standard-basic"
                label="IPCA (ao ano)"
                variant="standard"
                value={nomes[1]?.valor > 0 ? nomes[1].valor : 0}
              />
            </Box>

            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1 },
              }}
              noValidate
              autoComplete="off"
              className="form-input-text"
            >
              <TextField
                id="standard-basic"
                label="Aporte Mensal"
                variant="standard"
                required
              />
              <TextField
                id="standard-basic"
                label="Rentabilidade"
                variant="standard"
                required
              />
              <TextField
                id="standard-basic"
                label="CDI (ao ano)"
                variant="standard"
                value={nomes[0]?.valor > 0 ? nomes[0].valor : 0}
              />
            </Box>
          </form>
        </section>
      </div>

      <section className="botton-buttons">
        <button>Limpar campos</button>
        <button disabled={true}>Simular</button>
      </section>
    </div>
  );
};
