import "./activityCard.css";
import { useState, useEffect } from "react";
import img0 from "../../../public/1.png";
import img1 from "../../../public/2.png";
import img2 from "../../../public/3.png";
import img3 from "../../../public/4.png";
import img4 from "../../../public/5.png";
import img5 from "../../../public/6.png";
import img6 from "../../../public/7.png";
import img7 from "../../../public/8.png";

const ActivityCard = ({
  activity,
  selectedActivities,
  setSelectedActivities,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [picture, setPicture] = useState();

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

  // lister les primaryType de google (categories) pour attribuer une image en fonction...

  const restaurants = [
    "restaurant",
    "bar",
    "cafe",
    "food",
    "meal",
    "hotel",
    "bed_and_breakfast",
  ];
  const enfants = ["aquarium", "zoo", "park", "playground", "park"];
  const arts = ["art_gallery", "museum"];
  const divertissements = [
    "movie_theater",
    "bowling",
    "paintball",
    "entertainment",
    "arcade",
    "escape_room",
  ];
  const sports = [
    "swimming",
    "golf_course",
    "hiking_trail",
    "bicycle_store",
    "gym",
    "stadium",
  ];
  const vie_nocturne = ["night_club", "pub", "bar", "casino"];
  const bien_etre = [
    "spa",
    "beauty_salon",
    "hair_care",
    "gym",
    "health",
    "physiotherapist",
  ];
  const patrimoine = [
    "church",
    "cemetery",
    "national_park",
    "tourist_attraction",
    "historical_place",
    "landmark",
  ];
  const categoriesList = [
    restaurants,
    enfants,
    arts,
    sports,
    divertissements,
    vie_nocturne,
    bien_etre,
    patrimoine,
  ];

  //FONCTIONNE MAIS PEUT ETRE OPTIMISE JE PENSE
  useEffect(() => {
    const images = [img0, img1, img2, img3, img4, img5, img6, img7];
    function containsSubstring(categoryList, category) {
      return categoryList.some((item) => category.includes(item));
    }
    for (let c = 0; c < categoriesList.length; c++) {
      if (containsSubstring(categoriesList[c], category)) {
        setPicture(images[c]);
      }
    }
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
      <img className="activity-img" src={picture} alt={category} />
      <div className="activity-info">
        <div className="info-left">
          <h3>{title}</h3>
          <p>{address}</p>
          <p>Note : {rate}</p>
          {website && (
            <a href={website} target="_blank">
              Visitez site internet
            </a>
          )}
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
