import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Posts from "./pages/Posts/Posts.jsx";
import Search from "./pages/Search/Search.jsx";

import PrivateRoute from "./privateRoute.jsx";

const Rotas = (props) => {
  return (
    <BrowserRouter history={props.history}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/auth" element={<Login />} />
        <Route exact path="/signup" element={<Register />} />
        <Route
          exact
          path="/posts"
          element={
            <PrivateRoute>
              <Posts />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/search"
          element={
            <PrivateRoute>
              <Search />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
