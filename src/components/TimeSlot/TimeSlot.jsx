import "./timeSlot.css";
import { useState, useEffect, useRef } from "react";
import ActivityItem from "../ActivityItem/ActivityItem";
import { useDrop } from "react-dnd";
import { addHours, isSameHour } from "date-fns";

const TimeSlot = ({
  day,
  startHour,
  endHour,
  activities,
  setActivities,
  travelId,
  token,
}) => {
  const [timeSlot, setTimeSlot] = useState();

  useEffect(() => {
    setTimeSlot(null);
    activities.map((activity) => {
      if (isSameHour(activity.schedule_day, addHours(day, startHour))) {
        setTimeSlot(
          <ActivityItem
            id={activity.activity}
            token={token}
            isScheduled="true"
            duration={activity.schedule_duration}
            activities={activities}
            setActivities={setActivities}
          />
        );
      }
    });
  }, [activities]);

  //Fonction pour gérer le drag'n'drop
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "activity",
    drop: (item) => {
      //Fonction réalisée lors du drag'n'drop
      const activitiesCopy = [...activities];

      activitiesCopy.map((activity, index) => {
        if (activity.activity === item.id) {
          activity.status = "scheduled";
          activity.schedule_day = addHours(day, startHour);
          activity.schedule_duration = endHour - startHour;
          console.log("activities=", activities);
        }
      });

      setActivities(activitiesCopy);

      setTimeSlot(
        <ActivityItem
          id={item.id}
          token={token}
          duration={1} //On donne de base une duration de 1h lors du drag'n'drop
          isScheduled="true"
          activities={activities}
          setActivities={setActivities}
        />
      );
    },
  }));

  return (
    <div ref={drop} className="timeSlot">
      {timeSlot && timeSlot}
    </div>
  );
};

export default TimeSlot;
