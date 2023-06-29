import { React, useState } from "react";
import axios from "../../api/api.js";

const URL = "/auth/register";

const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Registrar</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
