import "./activityCard.css";
import { useState, useEffect } from "react";

const ActivityCard = ({
  activity,
  selectedActivities,
  setSelectedActivities,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const title = activity.displayName.text;
  const address = activity.formattedAddress;
  const rate = activity.rating;
  const website = activity.websiteUri;
  const id = activity.id;
  const category = activity.primaryType;
  const price = activity.priceLevel;
  const opening_hours = activity.regularOpeningHours;

  const handleSelect = () => {
    setIsSelected(!isSelected);
  };

  //FONCTIONNE MAIS PEUT ETRE OPTIMISE JE PENSE
  useEffect(() => {
    if (isSelected) {
      const newSelectedActivity = {
        title: title,
        category: category,
        city: address,
        price: price,
        website: website,
        opening_hours: opening_hours,
        rate: rate,
        address: address,
        google_id: id,
      };
      setSelectedActivities([...selectedActivities, newSelectedActivity]);
    } else {
      const activityIndex = selectedActivities.findIndex(
        (activity) => activity.google_id === id
      );
      console.log("activityIndex=", activityIndex);
      if (activityIndex !== -1) {
        const copySelectedActivities = selectedActivities;
        copySelectedActivities.splice(activityIndex, 1);
        setSelectedActivities(copySelectedActivities);
      } else {
        console.log("Activité non trouvée!");
      }
    }
  }, [isSelected]);

  return (
    <div
      className="activity-card"
      style={{ backgroundColor: isSelected && "grey" }}
    >
      <div className="activity-img"></div>
      <div className="activity-info">
        <div className="info-left">
          <h3>{title}</h3>
          <p>{address}</p>
          <p>Note : {rate}</p>
          {website && <a href={website}>Visitez site internet</a>}
        </div>
        <div className="info-right">
          {isSelected ? (
            <button onClick={() => handleSelect()}>
              Enlever de ma sélection
            </button>
          ) : (
            <button onClick={() => handleSelect()}>Sélectionner</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
