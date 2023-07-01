import { React, useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import Header from "../../components/header/Header";

const Search = () => {
  const [pesquisa, setPesquisa] = useState("");

  const name = document.querySelector("#name");
  const imagem = document.querySelector("#agenteImg");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const agentes = await axios.get("https://valorant-api.com/v1/agents/");
      const info = pesquisarPersonagem(agentes, pesquisa);
      if (info != null) {
        name.innerHTML = info.displayName;
        imagem.src = info.fullPortrait;
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
    <div className="searchcontainer">
      <Header />
      <form className="searchform" onSubmit={(e) => handleSubmit(e)}>
        <input
          id="pesquisa"
          name="pesquisa"
          type="text"
          onChange={(e) => setPesquisa(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </form>
      <div className="info">
        <h1 id="name"></h1>
        <img width={"380px"} id="agenteImg" src="#" alt="agente" />
      </div>
    </div>
  );
};

export default Search;
