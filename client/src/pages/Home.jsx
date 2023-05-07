import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
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
  return (
    <div className="homepage">
      <div className="top-banner">
        <p>
          Up to $7,500 tax credit available for Model Y and Model 3.{" "}
          <a href="#">Learn More</a>
        </p>
      </div>
      <header>
        <div className="left-header">
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
        </div>
        <div className="center-header">
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
        <div className="right-header">
          <ul>
            <li>shop</li>
            {user.length == 0 && (
              <li>
                <Link to={"/login"}>account</Link>
              </li>
            )}
            {user.length != 0 && (
              <li>
                <Link to={"/posts"}>Posts</Link>
              </li>
            )}
            {user.length != 0 && (
              <li>
                <Link to={"/search"}>Search</Link>
              </li>
            )}
            <li>menu</li>
          </ul>
        </div>
      </header>
      <h1>Model 3</h1>
      <span>
        <a href="#">View Inventory</a>
      </span>
      <div className="botoes">
        <div className="order">
          <a href="#">Order Now</a>
        </div>
        <div className="demo">
          <a href="#">Demo Drive</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
