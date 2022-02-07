import { useEffect, useState } from "react";
import { api } from "../api/Api";

export const Formularios = () => {
  const [nomes, setNomes] = useState([]);
  useEffect(() => {
    api.get("indicadores").then((response) => {
      setNomes(response.data);
    });
    console.log(nomes);
  }, []);

  return (
    <div>
      <h1>{nomes[1]?.valor}</h1>
    </div>
  );
};
