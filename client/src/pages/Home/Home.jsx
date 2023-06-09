import React, { useEffect, useState, useRef } from "react";
import "./Home.css";
import io from "socket.io-client";

const sokcet = io.connect("https://localhost:3001");
var i = 0;
var teste = [];

const Home = () => {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [msnR, setMsnR] = useState("");

  const inputClear = useRef();

  const token = localStorage.getItem("token");

  const joinRoom = (e) => {
    e.preventDefault();
    if (room !== "") {
      sokcet.emit("join_room", room);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    sokcet.emit("send_message", { message, room });
    inputClear.current.value = "";
    teste[i] = "" + message;
    i++;
  };

  useEffect(() => {
    sokcet.on("receive_message", (data) => {
      setMsnR(data.message);
      teste[i] = data.message;
      i++;
    });
  }, [sokcet]);

  return (
    <div className="homecontainer">
      <header className="header">
        <div className="logo">
          <a href="home">
            <svg width={"120px"} height={"24px"} viewBox="0 0 342 35">
              <path
                d="M0 .1a9.7 9.7 0 0 0 7 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 0 0 7-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 0 0 6-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 0 0-8.7 7h39.9v-21h-31.2v-7h24zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 13.8h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 14.1h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zM308.5 7h26a9.6 9.6 0 0 0 7-7h-40a9.6 9.6 0 0 0 7 7z"
                fill="currentColor"
              ></path>
            </svg>
          </a>
        </div>
        <div className="header_center">
          <ul>
            <li>
              <a href="#">
                <span>Model S</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>Model 3</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>Model X</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>Model Y</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>Solar Roof</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>Solar Panels</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="header_right">
          {token == null && (
            <ul>
              <li>
                <a href="/auth" className="menu_right" id="account_show">
                  <span>Account</span>
                </a>
              </li>
            </ul>
          )}
          {token != null && (
            <ul>
              <li>
                <a href={"/posts"}>Posts</a>
              </li>
              <li>
                <a href={"/search"}>Pesquisa api</a>
              </li>
            </ul>
          )}
        </div>
      </header>
      <h1 className="modelthree">Model 3</h1>
      <p className="modelthree">
        Starting at $32,740 <br /> After Federal Tax Credit
      </p>
      {token != null && (
        <div>
          <br />
          <div className="chat">
            <form onSubmit={(e) => joinRoom(e)}>
              <input
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Sala..."
              />
              <button onClick={(e) => joinRoom(e)}>Join</button>
            </form>
            <form onSubmit={(e) => sendMessage(e)}>
              <input
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message..."
                ref={inputClear}
              />
              <button onClick={(e) => sendMessage(e)}>Send message</button>
            </form>
            <h3>Message:</h3>
            <div className="msn">
              <ul>
                {teste.map((mess, index) => (
                  <li key={index}>{mess}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
