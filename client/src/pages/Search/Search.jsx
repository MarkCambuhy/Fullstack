import { React, useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [pesquisa, setPesquisa] = useState("");

  const name = document.querySelector("#name");
  const imagem = document.querySelector("#agenteImg");
  const descricao = document.querySelector("#descricao");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const agentes = await axios.get("https://valorant-api.com/v1/agents/");
      const info = pesquisarPersonagem(agentes, pesquisa);
      if (info != null) {
        name.innerHTML = info.displayName;
        imagem.src = info.fullPortrait;
        descricao.innerHTML = info.description;
      }
    } catch (err) {}
  };

  const pesquisarPersonagem = (agentes, pesquisa) => {
    for (let i = 0; i < agentes.data.data.length; i++) {
      if (
        pesquisa.toLowerCase() ===
        agentes.data.data[i].displayName.toLowerCase()
      ) {
        return agentes.data.data[i];
      }
    }
    return null;
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          id="pesquisa"
          name="pesquisa"
          type="text"
          onChange={(e) => setPesquisa(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </form>
      <div>
        <h1 id="name"></h1>
        <img width={"500px"} id="agenteImg" src="#" alt="agente" />
        <p id="descricao"></p>
      </div>
    </div>
  );
};

export default Search;
