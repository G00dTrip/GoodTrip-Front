import "./timeSlot.css";
import { useState, useEffect, useRef } from "react";
import ActivityItem from "../ActivityItem/ActivityItem";
import { useDrop } from "react-dnd";

const TimeSlot = ({
  indexDay,
  startHour,
  endHour,
  planning,
  setPlanning,
  activities,
}) => {
  const [timeSlot, setTimeSlot] = useState([]);

  useEffect(() => {
    if (activities) {
      const activitiesArray = [];
      activities.map((activity, index) => {
        activitiesArray.push(
          <ActivityItem
            indexDay={indexDay}
            planning={planning}
            setPlanning={setPlanning}
            id={activity.id}
            startHourActivity={activity.startHourActivity}
            endHourActivity={activity.endHourActivity}
            duration={activity.duration}
            key={index}
          />
        );
      });
      setTimeSlot(activitiesArray);
    } else {
      setTimeSlot([]);
    }
  }, [planning]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "activity",
    drop: (item) => {
      // setTimeSlot(<ActivityItem id={item.id} />);

      setPlanning((currentPlanning) => {
        const planningCopy = structuredClone(currentPlanning);

        if (!planningCopy[indexDay][`activity ${item.id}`]) {
          // If this activity doesn't exist we add it donc the planning array
          planningCopy[indexDay][`activity ${item.id}`] = {
            id: item.id,
            startHourActivity: startHour,
            endHourActivity: endHour,
            duration: endHour - startHour,
          };
        } else {
          //If already exist we modifiy start,end and duration
          if (
            startHour <
            planningCopy[indexDay][`activity ${item.id}`].startHourActivity
          ) {
            planningCopy[indexDay][`activity ${item.id}`].startHourActivity =
              startHour;
            planningCopy[indexDay][`activity ${item.id}`].duration =
              planningCopy[indexDay][`activity ${item.id}`].endHourActivity -
              startHour;
          } else if (
            endHour >
            planningCopy[indexDay][`activity ${item.id}`].endHourActivity
          ) {
            planningCopy[indexDay][`activity ${item.id}`].endHourActivity =
              endHour;
            planningCopy[indexDay][`activity ${item.id}`].duration =
              endHour -
              planningCopy[indexDay][`activity ${item.id}`].startHourActivity;
          }
          //Modification of duration
        }

        console.log("planningCopy=", planningCopy);
        return planningCopy;
      });
    },
  }));

  return (
    <div ref={drop} className="timeSlot">
      {timeSlot ? timeSlot : <p>VIDE</p>}
    </div>
  );
};

export default TimeSlot;
