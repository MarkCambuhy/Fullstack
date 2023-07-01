import { React, useState, useEffect, useRef } from "react";
import axios from "../../api/api.js";
import "./style.css";

import { useNavigate, Navigate } from "react-router-dom";
import Header from "../../components/header/Header.jsx";

const URL = "/signup";

const Register = () => {
  const erroM = useRef();

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(URL, {
          firstname,
          lastname,
          email,
          password,
        })
        .then(function (response) {
          navigate("/auth");
        })
        .catch(function (error) {
          console.log(error);
          erroM.current.innerHTML = "Não é possível cadastrar o usuário";
        });
    } catch (error) {
      console.log(error);
    }
  };

  return token === null ? (
    <div className="container">
      <Header />
      <div className="subcontainer">
        <h1>Registrar</h1>
        <p ref={erroM} className="erro"></p>
        <form className="formulario" onSubmit={(e) => handleSubmit(e)}>
          <div className="formItem">
            <label htmlFor="firstname">First name:</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="formItem">
            <label htmlFor="lastname">Last name:</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="formItem">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="formItem">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="submit" type="submit">
            Submit
          </button>
        </form>
        <span className="or">or</span>
        <button onClick={() => navigate("/auth")} className="create">
          Login
        </button>
      </div>
    </div>
  ) : (
    <Navigate to={"/"} />
  );
};

export default Register;
