import "./timeSlot.css";
import { useState, useEffect, useRef } from "react";
import ActivityItem from "../ActivityItem/ActivityItem";
import { useDrop } from "react-dnd";

const TimeSlot = ({ indexDay, startHour, endHour, setPlanning }) => {
  const [timeSlot, setTimeSlot] = useState(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "activity",
    drop: (item) => {
      setTimeSlot(<ActivityItem id={item.id} />);

      setPlanning((currentPlanning) => {
        const planningCopy = structuredClone(currentPlanning);

        if (!planningCopy[indexDay][item.id]) {
          // If this activity doesn't exist we add it donc the planning array
          planningCopy[indexDay][item.id] = {
            id: item.id,
            startHourActivity: startHour,
            endHourActivity: endHour,
          };
        } else {
          //If already exist we modifiy the start and the end
          if (startHour < planningCopy[indexDay][item.id].startHourActivity) {
            planningCopy[indexDay][item.id].startHourActivity = startHour;
          } else {
            planningCopy[indexDay][item.id].endHourActivity = endHour;
          }
        }

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
