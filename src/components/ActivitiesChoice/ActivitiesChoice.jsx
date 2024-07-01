import "./activitiesChoice.css";
import ActivityCard from "../ActivityCard/ActivityCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ActivitiesChoice = ({ activities, token, travel }) => {
  const navigate = useNavigate();
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [sortedActivities, setSortedActivities] = useState([]);

  // Fonction pour trier les activités pour mettre en avant celles qui ont un site internet
  useEffect(() => {
    const newSortedActivities = activities.sort((a, b) => {
      if (a.websiteUri && !b.websiteUri) {
        return -1; // a avant b
      } else if (!a.websiteUri && b.websiteUri) {
        return 1; // b avant a
      } else {
        return 0; // pas de changement
      }
    });
    setSortedActivities(newSortedActivities);
  }, []);

  //Fonction à faire pour envoyer les activities sélectionnées en BDD
  const submit = async () => {
    console.log("ACTIVITIES", selectedActivities);
    try {
      if (selectedActivities.length > 0) {
        const { data } = await axios.post(
          "http://127.0.0.1:3000/select",
          {
            tab: selectedActivities,
            travel: travel._id,
          },
          { headers: { authorization: `Bearer ${token}` } }
        );
        // navigate(`/travel/update/${travel._id}`);
      } else {
        setErrorMessage("Veuillez remplir tous les champs");
      }
    } catch (error) {
      console.log("new Travel page error ->", error);
    }
  };

  return (
    <div className="activities-choice">
      <p>ACTIVITIES CHOICE</p>
      <div className="activities-choice-main">
        <div className="activies-list">
          {sortedActivities.map((activity) => (
            <ActivityCard
              activity={activity}
              selectedActivities={selectedActivities}
              setSelectedActivities={setSelectedActivities}
              key={activity.id}
            />
          ))}
        </div>
        <button onClick={() => submit()}>Valider</button>
      </div>
    </div>
  );
};

export default ActivitiesChoice;
