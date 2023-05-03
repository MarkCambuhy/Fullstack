// import React from "react";
import { Link } from "react-router-dom";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./Home.css";

const Home = () => {
  const token = Cookies.get("token");

  let isAuthenticated = false;
  if (token) {
    isAuthenticated = true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let agente_esc = document.querySelector(".pesquisaapi").value;
    const res = await fetch("https://valorant-api.com/v1/agents/");
    const data = await res.json();
    for (let i = 0; i <= 22; i++) {
      let ag = data.data[i].displayName.toString();
      console.log(ag);
    }
    console.log(data);
  };

  return (
    <div>
      <div className="top-banner">
        <p>
          Up to $7,500 tax credit available for Model Y and Model 3.{" "}
          <a href="#">Learn More</a>
        </p>
      </div>
      <header className="header">
        <div className="header-left">
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
        <div className="header-center">
          <ul>
            <li>Model S</li>
            <li>Model 3</li>
            <li>Model X</li>
            <li>Model Y</li>
            <li>Solar Roof</li>
            <li>Solar Panels</li>
            <li>Powerwall</li>
          </ul>
        </div>
        <div className="header-right">
          <div className="pesquisa">
            {isAuthenticated && (
              <form className="pesquisaapi" onSubmit={(e) => handleSubmit(e)}>
                <input type="text" />
              </form>
            )}
          </div>
          <div className="account">
            {(!isAuthenticated && <Link to={"/login"}>Account</Link>) || (
              <span>Welcome Back!</span>
            )}
          </div>
          <div className="menu">Menu</div>
        </div>
      </header>
      <div className="heroku">
        <div className="content-heroku">
          <div className="heroku-info">
            <h1>Model 3</h1>
            <a href="#">View Inventory</a>
          </div>
          <div className="botoes">
            <div className="order">
              <a href="#">Order Now</a>
            </div>
            <div className="demo">
              <a href="#">Demo Drive</a>
            </div>
          </div>
        </div>
      </div>
      <div className="agentes_info">
        <h2 className="name_agent"></h2>
        <img src="#" alt="agent" />
      </div>
    </div>
  );
};

export default Home;
