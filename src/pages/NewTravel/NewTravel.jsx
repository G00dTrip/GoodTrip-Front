import { useState } from "react";
import TravelGeneration from "../../components/TravelGeneration/TravelGeneration";
import ActivitiesChoice from "../../components/ActivitiesChoice/ActivitiesChoice";

import "./newTravel.css";

const NewTravel = ({ token }) => {
  const [step, setStep] = useState(1);
  const [place, setPlace] = useState("");
  const [name, setName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [date_start, setDate_start] = useState("");
  const [date_end, setDate_end] = useState("");
  const [isShared, setIsShared] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activities, setActivities] = useState([]);

  return (
    (step === 1 && (
      <TravelGeneration
        categories={categories}
        setCategories={setCategories}
        place={place}
        setPlace={setPlace}
        zipCode={zipCode}
        setZipCode={setZipCode}
        date_start={date_start}
        setDate_start={setDate_start}
        date_end={date_end}
        setDate_end={setDate_end}
        token={token}
        activities={activities}
        setActivities={setActivities}
        setStep={setStep}
      />
    )) ||
    (step === 2 && <ActivitiesChoice activities={activities} />)
  );
};

export default NewTravel;
