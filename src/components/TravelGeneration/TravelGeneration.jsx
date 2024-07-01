import "./travelGeneration.css";
import data from "../../data.json";
import CustomScroll from "react-customscroll";
import DropdownTreeSelect from "react-dropdown-tree-select";
import axios from "axios";
import { useState, useRef } from "react";

const TravelGeneration = ({
  categories,
  setCategories,
  place,
  setPlace,
  zipCode,
  setZipCode,
  date_start,
  setDate_start,
  date_end,
  setDate_end,
  token,
  activities,
  setActivities,
  setStep,
  setTravel,
  name,
  setName,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [locationList, setLocationList] = useState([]);
  const [locationListIsDisplayed, setLocationListisDisplayed] = useState(false);

  const searchLocation = async (event) => {
    setPlace(event.target.value);

    const { data } = await axios.get(
      `https://geo.api.gouv.fr/communes?nom=${event.target.value}`
    );
    setLocationList(data);
    setLocationListisDisplayed(true);
  };

  const onChange = (currentNode, selectedNodes) => {
    //CuurentNode is an object of the last selected item
    const currentActivity = currentNode.label;
    if (categories.indexOf(currentActivity) === -1) {
      const copy = [...categories];
      copy.push(currentActivity);
      setCategories(copy);
    } else {
      const index = categories.indexOf(currentActivity);
      const copy = [...categories];
      copy.splice(index, 1);
      setCategories(copy);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (place && zipCode && date_start && date_end && categories) {
        const { data } = await axios.post(
          "http://127.0.0.1:3000/create",
          {
            place,
            zipCode,
            date_start,
            date_end,
            categories,
          },
          { headers: { authorization: `Bearer ${token}` } }
        );
        console.log("data", data);
        setActivities(data.activities);
        setStep(2);
        setTravel(data.travel);
      } else {
        setErrorMessage("Veuillez remplir tous les champs");
      }
    } catch (error) {
      console.log("new Travel page error ->", error);
    }
  };

  return (
    <main className="newTravelPage">
      <br />
      <br />
      <br />

      <div className="tree-outer-wrap">
        <div className="tree-inner-wrap">
          <CustomScroll>
            <DropdownTreeSelect
              onChange={onChange}
              keepTreeOnSearch={true}
              inlineSearchInput={true}
              clearSearchOnChange={false}
              keepOpenOnSelect={true}
              showPartiallySelected={true}
              readOnly={false}
              disabled={false}
              data={data}
              showDropdown="initial"
              mode="multiselect"
            />
          </CustomScroll>
        </div>
      </div>

      <p>
        <br /> Récap
      </p>
      <p>Catégories : {categories}</p>

      <br />
      <br />
      <br />

      <form onSubmit={handleSubmit} className="formNewTravel">
        <div>
          <label htmlFor="end">Nom du voyage:</label>
          <input
            type="name"
            name="name"
            id="name"
            placeholder="Voyage entre amis"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>

        <div>
          <label htmlFor="end">Nom de la ville :</label>
          <input
            type="name"
            name="place"
            id="place"
            placeholder="Paris"
            value={place}
            onChange={searchLocation}
          />
        </div>
        {locationListIsDisplayed && (
          <ul>
            {place.length >= 3 &&
              locationList &&
              locationList.map((location, index) => {
                return (
                  <li
                    className="location-item"
                    onClick={() => {
                      setPlace(location.nom);
                      setZipCode(location.codeDepartement);
                      setLocationListisDisplayed(false);
                    }}
                    key={index}
                  >
                    {location.nom}({location.codeDepartement})
                  </li>
                );
              })}
          </ul>
        )}

        {/* <div>
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
        </div> */}

        <br />

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

        <br />

        <div>
          <button className="buttonConnecter" onClick={handleSubmit}>
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

export default TravelGeneration;
