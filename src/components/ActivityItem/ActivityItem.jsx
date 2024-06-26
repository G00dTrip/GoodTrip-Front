import { useState, useEffect, useRef, Children } from "react";
import "./activityItem.css";
import { useDrag } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const ActivityItem = ({
  id,
  token,
  isScheduled,
  duration,
  activities,
  setActivities,
}) => {
  const heightRef = useRef(`${duration * 50}px`);
  const [height, setHeight] = useState(`${duration * 50}px`);
  const [title, setTitle] = useState("");
  let startY = 0;

  //Chargement des données
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`http://127.0.0.1:3000/activity/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setTitle(data.title);
    };
    fetchData();
  }, []);

  // Useeffect pour mettre à jour l'activityItem dés que le planning est modifié
  useEffect(() => {
    setHeight(`${duration * 50}px`);
  }, [activities]);

  const startResizing = (e) => {
    e.preventDefault();
    console.log(("activities=", activities));
    startY = e.pageY;
    console.log("startY=", e.pageY);
    document.addEventListener("mousemove", resizeActivity);
    document.addEventListener("mouseup", endResizing);
  };

  //Fonction gérant le redimensionnement de l'activity
  const resizeActivity = (e) => {
    const newY = e.pageY;
    const diffY = newY - startY;
    const newHeight = parseInt(heightRef.current) + diffY + "px";
    heightRef.current = newHeight;

    setHeight(newHeight);
    startY = newY;
  };

  const endResizing = (e) => {
    e.preventDefault();

    document.removeEventListener("mousemove", resizeActivity);
    document.removeEventListener("mouseup", endResizing);

    //On met à jour activities avec la nouvelle duration de l'activity en question
    setActivities((currentActivities) => {
      const activitiesCopy = structuredClone(currentActivities);
      activitiesCopy.map((activity, index) => {
        if (activity.activity === id) {
          activity.schedule_duration =
            Math.floor(parseInt(heightRef.current) / 50) + 1;
        }
      });
      return activitiesCopy;
    });
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "activity",
    item: { id: id, title: title },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  //Fonction pour supprimer l'activity
  const removeActivity = (id) => {
    const activitiesCopy = [...activities];
    activitiesCopy.map((activity, index) => {
      if (activity.activity === id) {
        activity.status = "selected";
        activity.schedule_day = "";
        activity.schedule_duration = 0;
      }
    });
    setActivities(activitiesCopy);
  };

  return (
    <div ref={drag} className="activity" style={{ height: height }}>
      <p>{title}</p>
      {isScheduled && (
        <div className="activity-actions">
          <p onClick={() => removeActivity(id)}>Supprimer</p>
          <p onMouseDown={startResizing} className="resizing">
            Modifier durée
            <FontAwesomeIcon icon="up-down" />
          </p>
        </div>
      )}
    </div>
  );
};

export default ActivityItem;
