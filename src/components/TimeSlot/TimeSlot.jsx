import "./timeSlot.css";
import { useState } from "react";
import ActivityItem from "../ActivityItem/ActivityItem";
import { useDrop } from "react-dnd";

const TimeSlot = ({ index, slotNumber, planning, setPlanning }) => {
  const [timeSlot, setTimeSlot] = useState(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "activity",
    // drop: (item) => setTimeSlot(<ActivityItem id={item.id} />),
    drop: (item) => {
      setTimeSlot(<ActivityItem id={item.id} />);
      const planningCopy = structuredClone(planning);
      planningCopy[index]["slot" + slotNumber] = item.id;
      setPlanning(planningCopy);
    },
  }));

  return (
    <div ref={drop} className="timeSlot">
      {timeSlot ? timeSlot : <p>VIDE</p>}
    </div>
  );
};

export default TimeSlot;
