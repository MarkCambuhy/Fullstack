import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const msn_erro = document.querySelector(".msn_erro");
  const cont_err = document.querySelector(".mensagem_err");

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
      } catch (error) {}
    };
    tokenUser();
  }, [token]);

  useEffect(() => {
    if (user.length != 0) {
      navigate("/");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    cont_err.style.display = "none";
    msn_erro.innerHTML = "";
    try {
      const res = await axios
        .post("/auth/login", {
          email,
          password,
        })
        .then(function (response) {
          console.log(response);
          localStorage.setItem("token", response.data.accessToken);
          navigate("/");
        })
        .catch(function (error) {
          msn_erro.innerHTML = "" + error.response.data;
          msn_erro.style.display = "flex";
          cont_err.style.display = "flex";
          console.log(error.response.data);
        });
    } catch (error) {}
  };

  return (
    <div className="loginpage">
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
      <div className="signin">
        <h1>Sign In</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="inputs">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <span id="errEmail"></span>
          </div>
          <div className="inputs">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mensagem_err">
            <span className="msn_erro"></span>
          </div>
          <button id="logar" type="submit">
            Sign In
          </button>
        </form>
        <span id="already">
          Don't have an account? <Link to={"/register"}>Sign Up</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
