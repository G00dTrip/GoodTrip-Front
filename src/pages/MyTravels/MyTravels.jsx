import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./myTravels.css";

const MyTravels = ({ token, setToken }) => {
  const [travels, setTravels] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getTravels = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/myTravels", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        console.log(data);
        setTravels(data.travels);
      } catch (error) {
        alert("Un problème est survenu");
        console.log("error.response->", error);
      }
    };
    if (token) {
      getTravels();
    }
  }, [token, reload]);

  const deleteTravel = async (travelId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/travel/${travelId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setReload(!reload);
      alert("Le voyage a bien été supprimé.");
    } catch (error) {
      alert("Un problème est survenu");
      console.log("error.response->", error);
    }
  };

  return (
    <main>
      <h2>Mes voyages</h2>
      <div className="myTravelsList">
        {travels.length > 0 &&
          travels.map((travel, index) => (
            <div key={index} className="travel">
              <h3>{travel.name}</h3>
              <p>
                du {travel.date_start.slice(0, 10)} au{" "}
                {travel.date_end.slice(0, 10)}
              </p>
              <div className="flexSpace">
                <p>Lieu : {travel.place}</p>
                <p>Type : {travel.type}</p>
                <p>Statut : {travel.status}</p>
              </div>
              <div className="flexSpace">
                <Link>Modifier</Link>
                <button
                  onClick={() => {
                    deleteTravel(travel._id);
                  }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};

export default MyTravels;
