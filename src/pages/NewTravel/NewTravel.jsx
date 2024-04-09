import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { SelectButton } from "primereact/selectbutton";

import "./newTravel.css";

const NewTravel = () => {
  const [name, setName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [date_start, setDate_start] = useState("");
  const [date_end, setDate_end] = useState("");
  const [type, setType] = useState("");
  const [isShared, setIsShared] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = () => {
    <Link to="/" />;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (name && date_start && date_end && type && isShared) {
        const { data } = await axios.post("http://127.0.0.1:3000/create", {
          name,
          zipCode,
          date_start,
          date_end,
          type,
          isShared,
        });
      } else {
        setErrorMessage("Veuillez remplir tous les champs");
      }
    } catch (error) {
      console.log("new Travel page error ->", error);
    }
  };

  return (
    <main className="newTravelPage">
      <form onSubmit={handleSubmit} className="formNewTravel">
        <div>
          <label htmlFor="end">Nom de la ville :</label>
          <input
            type="name"
            name="name"
            id="name"
            placeholder="Paris"
            value={name}
            onChange={(event) => {
              setErrorMessage("");
              setName(event.target.value);
            }}
          />
        </div>

        <p>{name}</p>

        <div>
          <label htmlFor="end">Code postal :</label>
          <input
            type="zipCode"
            name="zipCode"
            id="zipCode"
            placeholder="75000"
            value={zipCode}
            onChange={(event) => {
              setErrorMessage("");
              setZipCode(event.target.value);
            }}
          />
        </div>

        <p>{zipCode}</p>

        <div>
          <label htmlFor="start">Premier jour du voyage : </label>
          <input
            type="date"
            id="start"
            name="trip-start"
            onChange={(event) => {
              setDate_start(event.target.value);
            }}
          />
        </div>

        <p>{date_start}</p>

        <div>
          <label htmlFor="end">Dernier jour du voyage : </label>
          <input
            type="date"
            id="end"
            name="trip-end"
            onChange={(event) => {
              setDate_end(event.target.value);
            }}
          />
        </div>

        <p>{date_end}</p>

        <div>
          <button className="buttonConnecter" onClick={handleClick}>
            Valider le voyage
          </button>
        </div>
        <div className="errorMessage">
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </form>
    </main>
  );
};

export default NewTravel;
