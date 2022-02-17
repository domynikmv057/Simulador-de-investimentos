//  Sobre o Codigo...
// ...
// Este é meu componente principal, aqui está estruturado todo meu código
// ...
// useEffect: Linha: 74
// Começo usando um useEfect para pegar da api os dados do CDI e IPCA, para usá-los nos inputs
// também guardo estes dados no state [ nome ] para que possam ser usados mais tarde na função [ clearForm ]
// guardo essa informação no state [ formValues ] que é o state que eu uso para salvar os valores dos inputs,
// ...
// handleInputChange: Linha: 89
// esta função eu uso para mudar e salvar os valores dos meus inputs, e também para verificar se este valor é
// um número ou não, eu salvo o valor do input no state [ formValues ] e caso ele seja um número
// defino o state [ erroLaybel ] para falso, se não for numero defino para verdadeiro.
//...
//handleSubmit: Linha: 101
// esta é a função que define o [ simulationState ] para verdadeiro, o que por sua vez faz com que o componente
// Simulation.jsx seja renderizado.
//  ...
//validateButton: Linha: 105
//Esta é a função responsável por liberar o botão de Simulação, ela percorre o objeto [ formValues ], verificando
//se os valores dos inputs estão vazios, se estiverem ela retorna 'verdadeiro' o que desabilita o botão, caso
//o input não estiver vazio ela percorre o objeto [ erroLaybel ] verificando se o valor de input dele esta definido
//como verdadeiro( o que aponta que o input tem uma letra), caso seja verdadeiro, a função também retorna verdadeiro
//desabilitando o botão, se nenhuma dessas condições for verdadeira, ele sai do 'for', e retorna falso liberando
//o botão.
//...
//clearForm: Linha: 120
//esta função retesa os valores dos inputs no [ formValues ], [ erroLaybel ] e [ simulationState ]
// limpando o formulário o input de erro, e sumindo com o componente de simulação
//...
//return: Linha: 134
//aqui estão meus inputs, usei o MaterialUI para agilizar o processo de estilização dos componentes
//...
//simulationState: Linha: 291
//aqui é onde eu chamo o componente Simulation.jsx, porem eu uso um ternário para verificar o state
//[ simulationState ], para renderizar ou não o componente, o valor de [ simulationState ] só se torna
//verdadeiro quando clicamos no botão simular, que só é liberado quando todos os inputs são preenchidos.
//...
//em  helperText uma variável dos meus inputs, uso um ternário, para que ela verifique o input correspondente
//esta com algum erro em [ erroLaybel ] caso esteja ela exibe a mensagem de erro, se não ela não exibe nada.

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
  //uso este estate para salvar os dados da api
  const [rendimentoValue, setRendimentoValue] = useState("bruto");
  //uso este estate para receber do filho RendimentoButton o valor da operação
  const [indexacaoValue, setIdexacaoValue] = useState("pos");
  //uso este estate para receber do filho IndexaçaoButton o valor da operação
  const [erroLaybel, setErroLaybel] = useState([]);
  //uso este estate para verificar se os valores do input é um numero ou nao.
  const [cdi, setCdi] = useState(0);
  //dado vindo da api
  const [ipca, setIpca] = useState(0);
  //dado vindo da api
  const [simulationState, setSimulationState] = useState(false);
  //estado que verifica se deve ou nao ser renderizado o componente Simulation Simulation.jsx
  const [formValues, setFormValues] = useState({
    aporteInicial: "",
    aporteMensal: "",
    prazoMes: "",
    rentabilidade: "",
  });
  //estado que armazena os valores dos inputs

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
