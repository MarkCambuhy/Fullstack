import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem("token");

  let isAuthenticated = false;
  if (token) {
    isAuthenticated = true;
  }

  return (
    <div>
      <header>
        <div className="header-left"></div>
      </header>
      Home
      {isAuthenticated && (
        <form onSu>
          <input type="text" />
        </form>
      )}
      {(!isAuthenticated && <Link to={"/login"}>Sign in</Link>) || (
        <span>Welcome Back!</span>
      )}
      {isAuthenticated && <Link to={"/upload"}>Upload</Link>}
    </div>
  );
};

export default Home;
