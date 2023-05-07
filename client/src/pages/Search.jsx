import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Search = () => {
  const [pesquisa, setPesquisa] = useState("");

  const imagem = document.querySelector("#agent-img");
  const agent_name = document.querySelector("#agent-name");
  const agent_description = document.querySelector("#agent-description");
  const content_pesquisa = document.querySelector(".content-pesquisa");
  const content_error = document.querySelector(".content-error");

  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [token, set_token] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const tokenUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response);
      } catch (error) {
        navigate("/");
      }
    };
    tokenUser();
  }, [token]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    content_pesquisa.style.display = "none";
    content_error.style.display = "none";
    let contador = 0;
    const res = await axios
      .get("https://valorant-api.com/v1/agents/")
      .then(function (response) {
        const agent_pesquisa = document.querySelector("#pesquisa").value;
        for (let i = 0; i < response.data.data.length; i++) {
          if (
            agent_pesquisa.toLowerCase() ===
            response.data.data[i].displayName.toLowerCase()
          ) {
            content_pesquisa.style.display = "flex";
            agent_name.innerHTML = response.data.data[i].displayName;
            imagem.src = response.data.data[i].fullPortrait;
            agent_description.innerHTML = response.data.data[i].description;
            break;
          }
          contador++;
        }
        if (contador >= response.data.data.length) {
          content_error.style.display = "flex";
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  return (
    <div className="searchpage">
      <header>
        <div className="logo">
          <svg
            class="tds-icon tds-icon-logo-wordmark tds-site-logo-icon"
            viewBox="0 0 342 35"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 .1a9.7 9.7 0 0 0 7 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 0 0 7-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 0 0 6-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 0 0-8.7 7h39.9v-21h-31.2v-7h24zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 13.8h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 14.1h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zM308.5 7h26a9.6 9.6 0 0 0 7-7h-40a9.6 9.6 0 0 0 7 7z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div className="language">
          <FontAwesomeIcon icon={faGlobe} />
          <span>en-US</span>
        </div>
      </header>
      <div className="search-container">
        <h1>Pesquisar:</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="inputs">
            <input
              type="text"
              name="pesquisa"
              id="pesquisa"
              onChange={(e) => setPesquisa(e.target.value)}
            />
          </div>
          <button id="pesquisar" type="submit">
            Pesquisar
          </button>
        </form>
      </div>
      <div className="content-pesquisa">
        <img src="#" alt="agente" id="agent-img" />
        <div className="right-agent">
          <h2 id="agent-name"></h2>
          <p id="agent-description"></p>
        </div>
      </div>
      <div className="content-error">Nenhum agente encontrado!</div>
    </div>
  );
};

export default Search;
