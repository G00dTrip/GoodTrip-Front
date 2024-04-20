import "./activitiesChoice.css";
import ActivityCard from "../ActivityCard/ActivityCard";
import { useState } from "react";
import axios from "axios";

const ActivitiesChoice = ({ activities }) => {
  const [selectedActivities, setSelectedActivities] = useState([]);

  //Fonction à faire pour envoyer les activities sélectionnées en BDD
  const submit = () => {};

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
