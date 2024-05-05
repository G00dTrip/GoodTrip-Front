import "./activitiesChoice.css";
import ActivityCard from "../ActivityCard/ActivityCard";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ActivitiesChoice = ({ activities, token, travel }) => {
  const navigate = useNavigate();
  const [selectedActivities, setSelectedActivities] = useState([]);

  //Fonction à faire pour envoyer les activities sélectionnées en BDD
  const submit = async () => {
    console.log("ACTIVITIES", selectedActivities);
    try {
      if (selectedActivities.length > 0) {
        const selectedActivitiesPromises = selectedActivities.map(
          async (activity) => {
            const { data } = await axios.post(
              "http://127.0.0.1:3000/select",
              {
                title: activity.title,
                category: activity.category,
                city: activity.city,
                price: activity.price,
                website: activity.website,
                opening_hours: activity.opening_hours,
                rate: activity.rate,
                google_id: activity.google_id,
                travel: travel._id,
              },
              { headers: { authorization: `Bearer ${token}` } }
            );
          }
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
          {activities.map((activity) => (
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
