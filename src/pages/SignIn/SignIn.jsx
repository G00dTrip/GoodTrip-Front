import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import "./signIn.css";

const SignIn = ({ setToken, token }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (email && password) {
        const { data } = await axios.post("http://127.0.0.1:3000/signin", {
          email,
          password,
        });
        Cookies.set("userToken", data.token, { secure: true });
        setToken(data.token);
        navigate("/");
      } else {
        setErrorMessage("Veuillez remplir tous les champs");
      }
    } catch (error) {
      setErrorPassword("Accès refusé, veuillez réessayer");
      console.log("error.response->", error);
    }
  };

  const handleClick = () => {
    <Link to="/" />;
  };

  return (
    <main className="loginPage">
      <form onSubmit={handleSubmit} className="formLogin">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setErrorMessage("");
            setEmail(event.target.value);
          }}
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => {
            setErrorMessage("");
            setErrorPassword("");
            setPassword(event.target.value);
          }}
        />

        <button className="buttonConnecter" onClick={handleClick}>
          Se connecter
        </button>
        <div className="errorMessage">
          {errorMessage && <p>{errorMessage}</p>}{" "}
        </div>
      </form>

      <div className="errorPassword">
        {errorPassword && <p>{errorPassword}</p>}
      </div>
      <Link className="link" to="/SignUp">
        Pas encore de compte ? Inscrivez-vous !
      </Link>
    </main>
  );
};

export default SignIn;
