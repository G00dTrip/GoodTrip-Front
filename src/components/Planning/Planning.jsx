import "./planning.css";
import { useState, useEffect } from "react";
import { eachDayOfInterval, getDay, getDate, getMonth } from "date-fns";
import ActivityItem from "../ActivityItem/ActivityItem";
import TimeSlot from "../TimeSlot/TimeSlot";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";

const Planning = () => {
  const [tripStart, setTripStart] = useState(null);
  const [tripEnd, setTripEnd] = useState(null);
  const [days, setDays] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [planning, setPlanning] = useState([]);
  const [hours, setHours] = useState([
    7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  ]);

  //Fonction pour écrire le jour en lettre
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
  //Fonction pour écrire le mois en lettre
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

  //Cette fonction renvoie l'/les activité(s) qui démarre à cette heure là
  const activyAtThisHour = (planning, indexDay, hourToCheck) => {
    const result = [];
    const dayToCheck = planning[indexDay];
    for (const element in dayToCheck) {
      if (element !== "date") {
        if (dayToCheck[element].startHourActivity === hourToCheck) {
          result.push(dayToCheck[element]);
        }
      }
    }
    return result;
  };

  useEffect(() => {
    if (tripStart && tripEnd) {
      //FAIRE VERIFICATION DE LA COHERENCE DES DATES

      const daysArray = eachDayOfInterval({ start: tripStart, end: tripEnd });
      setDays(daysArray);

      const planningArray = [];

      daysArray.map((day) =>
        planningArray.push({
          date: day,
        })
      );

      //PREVOIR IMPORT DEPUIS BDD

      setPlanning(planningArray);

      setIsLoading(false);
    }
  }, [tripStart, tripEnd]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <p>page planning</p>
        <label htmlFor="start">Start date:</label>
        <input
          type="date"
          id="start"
          name="trip-start"
          // value={tripStart}
          // min="2018-01-01"
          // max="2018-12-31"
          onChange={(event) => {
            const startDate = new Date(event.target.value);
            setTripStart(startDate);
          }}
        />
        <label htmlFor="end">End date:</label>
        <input
          type="date"
          id="end"
          name="trip-end"
          // value={tripEnd}
          // min="2018-01-01"
          // max="2018-12-31"
          onChange={(event) => {
            const endDate = new Date(event.target.value);
            setTripEnd(endDate);
          }}
        />
        {isLoading ? (
          <p>Choisissez vos dates</p>
        ) : (
          <div className="planning">
            <div className="hours">
              <div className="dayName">
                <p>Horaires</p>
              </div>
              {hours.map((hour, index) => {
                return (
                  <div className="timeSlot" key={index}>
                    {hour}h
                  </div>
                );
              })}
            </div>

            {days.map((day, indexDay) => {
              return (
                <div className="day" key={indexDay}>
                  <div className="dayName">
                    <p>
                      {whatTheDay(getDay(day))} {getDate(day)}{" "}
                      {whatTheMonth(getMonth(day))}
                    </p>
                  </div>

                  {hours.map((hour, indexHour) => {
                    return activyAtThisHour(planning, indexDay, hour).length >
                      0 ? (
                      <TimeSlot
                        indexDay={indexDay}
                        startHour={hour}
                        endHour={hour + 1}
                        planning={planning}
                        setPlanning={setPlanning}
                        key={indexHour}
                        activities={activyAtThisHour(planning, indexDay, hour)}
                      />
                    ) : (
                      <TimeSlot
                        indexDay={indexDay}
                        startHour={hour}
                        endHour={hour + 1}
                        planning={planning}
                        setPlanning={setPlanning}
                        key={indexHour}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
        <div className="activities">
          <ActivityItem id="1" />
          <ActivityItem id="2" />
          <ActivityItem id="3" />
          <ActivityItem id="4" />
        </div>
      </div>
    </DndProvider>
  );
};

export default Planning;
