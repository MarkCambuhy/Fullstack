import { React, useState, useEffect, useRef } from "react";
import axios from "../../api/api.js";
import { useNavigate, Navigate } from "react-router-dom";
import Header from "../../components/header/Header.jsx";

const URL = "/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const erroMsn = useRef();

  const verificaToken = () => {
    if (token) {
      navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(URL, {
          email,
          password,
        })
        .then(function (response) {
          localStorage.setItem("token", response.data.accessToken);
          navigate("/");
        })
        .catch(function (error) {
          erroMsn.current.innerHTML = error.response.data;
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return token === null ? (
    <div className="container">
      <Header />
      <div className="subcontainer">
        <h1>Login</h1>
        <p ref={erroMsn} className="erroMsn"></p>
        <form className="formulario" onSubmit={(e) => handleSubmit(e)}>
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
        <button onClick={() => navigate("/signup")} className="create">
          Create account
        </button>
      </div>
    </div>
  ) : (
    <Navigate to={"/"} />
  );
};

export default Login;
