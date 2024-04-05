import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import "./signUp.css";

const SignUp = ({ setToken, token }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (username && email && password) {
        const { data } = await axios.post("http://127.0.0.1:3000/signup", {
          username,
          email,
          password,
        });

        Cookies.set("userToken", data.token, { secure: true });
        setToken(data.newTraveller.token);
        navigate("/");
      } else {
        setErrorMessage("Veuillez remplir tous les champs");
      }
    } catch (error) {
      console.log("Signpage error ->", error);
    }
  };

  const handleClick = () => {
    <Link to="/" />;
  };

  return (
    <main className="signupPage">
      <form onSubmit={handleSubmit} className="formSignUp">
        <input
          type="text"
          name="usesername"
          id="username"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => {
            setErrorMessage("");
            setUsername(event.target.value);
          }}
        />

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
            setPassword(event.target.value);
          }}
        />

        <button className="buttonInscrire" onClick={handleClick}>
          S'inscrire
        </button>

        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      </form>

      <Link className="link" to="/SignIn">
        Déjà inscrit ? Connectez-vous !
      </Link>
    </main>
  );
};

export default SignUp;
