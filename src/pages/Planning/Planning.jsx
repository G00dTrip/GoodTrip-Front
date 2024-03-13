import "./planning.css";
import { useState, useEffect } from "react";
import { eachDayOfInterval, getDay, getDate, getMonth } from "date-fns";
import ActivityItem from "../../components/ActivityItem/ActivityItem";
import TimeSlot from "../../components/TimeSlot/TimeSlot";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Planning = () => {
  const [tripStart, setTripStart] = useState(null);
  const [tripEnd, setTripEnd] = useState(null);
  const [days, setDays] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [planning, setPlanning] = useState([]);

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

  useEffect(() => {
    if (tripStart && tripEnd) {
      const daysArray = eachDayOfInterval({ start: tripStart, end: tripEnd });
      setDays(daysArray);

      const planningArray = [];

      daysArray.map((day) =>
        planningArray.push({
          date: day,
          slot1: "",
          slot2: "",
          slot3: "",
          slot4: "",
          slot5: "",
          slot6: "",
        })
      );

      setPlanning(planningArray);

      console.log("planningArray==", planningArray);

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
            {days.map((day, index) => {
              return (
                <div className="day" key={index}>
                  <div className="dayName">
                    <p>
                      {whatTheDay(getDay(day))} {getDate(day)}{" "}
                      {whatTheMonth(getMonth(day))}
                    </p>
                  </div>
                  <TimeSlot
                    index={index}
                    slotNumber="1"
                    planning={planning}
                    setPlanning={setPlanning}
                  />
                  <TimeSlot
                    index={index}
                    slotNumber="2"
                    planning={planning}
                    setPlanning={setPlanning}
                  />
                  <TimeSlot
                    index={index}
                    slotNumber="3"
                    planning={planning}
                    setPlanning={setPlanning}
                  />
                  <TimeSlot
                    index={index}
                    slotNumber="4"
                    planning={planning}
                    setPlanning={setPlanning}
                  />
                  <TimeSlot
                    index={index}
                    slotNumber="5"
                    planning={planning}
                    setPlanning={setPlanning}
                  />
                  <TimeSlot
                    index={index}
                    slotNumber="6"
                    planning={planning}
                    setPlanning={setPlanning}
                  />
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
