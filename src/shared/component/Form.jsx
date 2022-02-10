import { useEffect, useState } from "react";
import { api } from "../api/Api";
import { RendimentoButton } from "./Buttons/RendimentoButton.jsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { IndexacaoButton } from "./Buttons/IndexacaoButton.jsx";

import "./Form.css";

export const Formularios = () => {
  const [nomes, setNomes] = useState([]);
  const [formValues, setFormValues] = useState({
    aporteInicial: 0,
    aporteMensal: 0,
    prazoMes: 0,
    rentabilidade: 0,
  });
  const [rendimentoValue, setRendimentoValue] = useState("bruto"); //uso este estate pare receber do filho RendimentoButton o valor da operação
  const [indexacaoValue, setIdexacaoValue] = useState("pos");
  const [cdi, setCdi] = useState(0);
  const [ipca, setIpca] = useState(0);

  useEffect(() => {
    api.get("indicadores").then((response) => {
      const respData = response.data;
      setNomes(respData);
      setCdi(respData[0].valor);
      setIpca(respData[1].valor);
      setFormValues({
        ...formValues,
        [respData[0].nome]: respData[0].valor,
        [respData[1].nome]: respData[1].valor,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(formValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  const clearForm = (e) => {
    e.preventDefault();
    setFormValues({
      aporteInicial: 0,
      aporteMensal: 0,
      prazoMes: 0,
      rentabilidade: 0,
      [nomes[0].nome]: nomes[0].valor,
      [nomes[1].nome]: nomes[1].valor,
    });
  };
  return (
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
        <form onSubmit={handleSubmit} className="form-group">
          <div className="input-camp">
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
                name={"aporteInicial"}
                value={formValues.aporteInicial}
                error={isNaN(formValues.aporteInicial)}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />

              <TextField
                id="standard-basic"
                label="Prazo (em meses)"
                variant="standard"
                required
                name={"prazoMes"}
                value={formValues.prazoMes}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <TextField
                id="standard-basic"
                label="IPCA (ao ano)"
                variant="standard"
                value={ipca}
                name={"ipcaAno"}
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
                type={"text"}
                name={"aporteMensal"}
                value={formValues.aporteMensal}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <TextField
                id="standard-basic"
                label="Rentabilidade"
                variant="standard"
                required
                name={"rentabilidade"}
                value={formValues.rentabilidade}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <TextField
                id="standard-basic"
                label="CDI (ao ano)"
                variant="standard"
                value={cdi}
                name={"cdiAno"}
              />
            </Box>
          </div>

          <section className="botton-buttons">
            <button
              onClick={(e) => {
                clearForm(e);
              }}
            >
              Limpar campos
            </button>
            <button type="submit" disabled={false}>
              Simular
            </button>
          </section>
        </form>
      </section>
    </div>
  );
};
