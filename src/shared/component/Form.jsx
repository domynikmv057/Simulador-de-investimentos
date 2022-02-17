import { useEffect, useState } from "react";
import { api } from "../api/Api";
import { RendimentoButton } from "./Buttons/RendimentoButton.jsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { IndexacaoButton } from "./Buttons/IndexacaoButton.jsx";
import FormControl from "@mui/material/FormControl";
import { Simulation } from "./Simulation/Simulation.jsx";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import "./Form.css";

export const Formularios = () => {
  const [nomes, setNomes] = useState([]);
  const [rendimentoValue, setRendimentoValue] = useState("bruto"); //uso este estate pare receber do filho RendimentoButton o valor da operação
  const [indexacaoValue, setIdexacaoValue] = useState("pos");
  const [erroLaybel, setErroLaybel] = useState([]);
  const [cdi, setCdi] = useState(0);
  const [ipca, setIpca] = useState(0);
  const [simulationState, setSimulationState] = useState(false);
  const [formValues, setFormValues] = useState({
    aporteInicial: "",
    aporteMensal: "",
    prazoMes: "",
    rentabilidade: "",
  });

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
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (isNaN(value)) {
      setFormValues({ ...formValues, [name]: value });
      setErroLaybel({ ...erroLaybel, [name]: true });
    } else {
      setFormValues({ ...formValues, [name]: value });
      setErroLaybel({ ...erroLaybel, [name]: false });
    }
  };

  const handleSubmit = (e) => {
    setSimulationState(true);
  };

  const validateButton = () => {
    for (const [key, value] of Object.entries(formValues)) {
      if (value === "") {
        return true;
      } else {
        for (const [chave, valor] of Object.entries(erroLaybel)) {
          if (valor) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const clearForm = (e) => {
    e.preventDefault();
    setFormValues({
      aporteInicial: "",
      aporteMensal: "",
      prazoMes: "",
      rentabilidade: "",
      [nomes[0].nome]: nomes[0].valor,
      [nomes[1].nome]: nomes[1].valor,
    });
    setErroLaybel([]);
    setSimulationState(false);
  };

  return (
    <div className="main-container">
      <div>
        <section className="left-form-container">
          <span className="space-element">
            <h2>Simulador</h2>
            <p className="information-style">
              Rendimento{" "}
              <span>
                <InfoOutlinedIcon fontSize="small" />
              </span>
            </p>
            <RendimentoButton setOp={setRendimentoValue} />
          </span>

          <span className="riht-button-span">
            <p className="information-style">
              Tipos de indexação{" "}
              <span>
                <InfoOutlinedIcon fontSize="small" />
              </span>
            </p>
            <IndexacaoButton setOp={setIdexacaoValue} />
          </span>
        </section>

        <section className="right-form-container">
          <FormControl className="form-group">
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
                  error={erroLaybel.aporteInicial}
                  helperText={
                    erroLaybel.aporteInicial ? "Aporte deve ser um número" : ""
                  }
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
                  error={erroLaybel.prazoMes}
                  helperText={
                    erroLaybel.prazoMes ? "O Prazo deve ser um número" : ""
                  }
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
                <TextField
                  id="standard-basic"
                  label="IPCA (ao ano)"
                  variant="standard"
                  value={ipca}
                  error={erroLaybel.ipca}
                  helperText={
                    erroLaybel.aporteInicial ? "O IPCA deve ser um número" : ""
                  }
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
                  error={erroLaybel.aporteMensal}
                  helperText={
                    erroLaybel.aporteMensal ? "Aporte deve ser um número" : ""
                  }
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
                  error={erroLaybel.rentabilidade}
                  helperText={
                    erroLaybel.rentabilidade
                      ? "A rentabilidade deve ser um número"
                      : ""
                  }
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
                <TextField
                  id="standard-basic"
                  label="CDI (ao ano)"
                  variant="standard"
                  value={cdi}
                  error={erroLaybel.cdi}
                  helperText={erroLaybel.cdi ? "O CDI deve ser um número" : ""}
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
              <button
                onClick={(e) => {
                  handleSubmit();
                }}
                disabled={validateButton()}
              >
                Simular
              </button>
            </section>
          </FormControl>
        </section>
      </div>

      {simulationState ? (
        <Simulation
          indexacaoValue={indexacaoValue}
          rendimentoValue={rendimentoValue}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};
