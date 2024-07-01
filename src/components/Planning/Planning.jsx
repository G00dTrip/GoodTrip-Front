import "./planning.css";
import { useState, useEffect } from "react";
import { eachDayOfInterval, getDay, getDate, getMonth } from "date-fns";
import ActivityItem from "../ActivityItem/ActivityItem";
import TimeSlot from "../TimeSlot/TimeSlot";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import { useParams } from "react-router-dom";

const Planning = ({ token }) => {
  const { travelId } = useParams();

  const [tripStart, setTripStart] = useState(null);
  const [tripEnd, setTripEnd] = useState(null);
  const [days, setDays] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hours, setHours] = useState([
    7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  ]);
  const [activities, setActivities] = useState([]);

  //Fonction pour écrire le jour en lettre à partir de son numéro
  const whatTheDay = (numberOfTheDay) => {
    switch (numberOfTheDay) {
      case 0:
        return "Dimanche";
        break;
      case 1:
        return "Lundi";
        break;
      case 2:
        return "Mardi";
        break;
      case 3:
        return "Mercredi";
        break;
      case 4:
        return "Jeudi";
        break;
      case 5:
        return "Vendredi";
        break;
      case 6:
        return "Samedi";
        break;
    }
  };
  //Fonction pour écrire le mois en lettre à partir de son numéro
  const whatTheMonth = (numberOfTheMonth) => {
    switch (numberOfTheMonth) {
      case 0:
        return "Janvier";
        break;
      case 1:
        return "Février";
        break;
      case 2:
        return "Mars";
        break;
      case 3:
        return "Avril";
        break;
      case 4:
        return "Mai";
        break;
      case 5:
        return "Juin";
        break;
      case 6:
        return "Juillet";
        break;
      case 7:
        return "Août";
        break;
      case 8:
        return "Septembre";
        break;
      case 9:
        return "Octobre";
        break;
      case 10:
        return "Novembre";
        break;
      case 11:
        return "Décembre";
        break;
    }
  };

  const submitPlanning = () => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post(
          "http://127.0.0.1:3000/schedule",
          { activities, travelId },
          { headers: { authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.log("error ->", error);
      }
    };
    fetchData();
  };

  //On récupère toutes les activities du travel grâce à son ID récupéré en params
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://127.0.0.1:3000/travel/${travelId}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setTripStart(data.date_start);
      setTripEnd(data.date_end);
      setActivities(data.activities);

      if (tripStart && tripEnd) {
        //FAIRE VERIFICATION DE LA COHERENCE DES DATES

        const daysArray = eachDayOfInterval({ start: tripStart, end: tripEnd });
        //On stocke tous les jours compris entre tripStart et tripEnd dans le state Days
        setDays(daysArray);

        setIsLoading(false);
      }
    };
    fetchData();
  }, [tripStart, tripEnd]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h2>Mon planning de vacances</h2>
        <button onClick={submitPlanning}>VALIDER</button>
        {isLoading ? (
          <p>Chargement en cours</p>
        ) : (
          <div className="main-planning">
            <div className="planning">
              <div className="hours">
                <div className="dayName">
                  <p>Horaires</p>
                </div>
                {/* Pour toutes les heures dans le tableau hours on crée un timeslot avec le nom de l'heure */}
                {/* Cela va créer la colonne des heures à gauche du planning */}
                {hours.map((hour, index) => {
                  return (
                    <div className="timeSlot" key={index}>
                      {hour}h
                    </div>
                  );
                })}
              </div>
              {/* Pour tous les jours du séjour stocké dans days :
          - On écrit la date en lettre dans la première ligne du planning
          - On crée un timeslot pour chaque hours => Soit vide si pas d'activités à cette heure, soit avec l'activité déjà schedule à cette heure-là
           */}
              {days.map((day, indexDay) => {
                return (
                  <div className="day" key={indexDay}>
                    {/* On écrit la date en lettre dans la première ligne du planning */}
                    <div className="dayName">
                      <p>
                        {whatTheDay(getDay(day))} {getDate(day)}{" "}
                        {whatTheMonth(getMonth(day))}
                      </p>
                    </div>

                    {/* On crée un timeslot pour chaque hours => Soit vide si pas d'activités à cette heure, soit avec l'activité déjà schedule à cette heure-là */}
                    {hours.map((hour, indexHour) => {
                      return (
                        <TimeSlot
                          day={day}
                          startHour={hour}
                          endHour={hour + 1}
                          key={indexHour}
                          travelId={travelId}
                          activities={activities}
                          setActivities={setActivities}
                          token={token}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className="activities">
              {/* On affiche la liste de toutes les activités sélectionnées */}
              {activities.map((activity, index) => {
                return (
                  <ActivityItem
                    id={activity.activity}
                    token={token}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default Planning;
