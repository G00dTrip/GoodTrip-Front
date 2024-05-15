import { useState, useEffect, useRef, Children } from "react";
import "./activityItem.css";
import { useDrag } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const ActivityItem = ({
  id,
  duration,
  indexDay,
  planning,
  setPlanning,
  token,
}) => {
  const heightRef = useRef(`${duration * 50}px`);
  const [height, setHeight] = useState(`${duration * 50}px`);
  const [title, setTitle] = useState("");
  let startY = 0;

  //Chargement des données
  useEffect(() => {
    const fetchData = async () => {
      console.log("FETCHDATA ACTIVITY RUNNING");
      const { data } = await axios.get(`http://127.0.0.1:3000/activity/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      console.log("data=", data);
      setTitle(data.title);
    };
    fetchData();
  }, []);

  // Useeffect pour mettre à jour l'activityItem dés que le planning est modifié
  useEffect(() => {
    setHeight(`${duration * 50}px`);
  }, [planning]);

  const startResizing = (e) => {
    e.preventDefault();
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
    console.log("planning=", planning);
  };

  const endResizing = (e) => {
    e.preventDefault();

    document.removeEventListener("mousemove", resizeActivity);
    document.removeEventListener("mouseup", endResizing);

    // //On modifie duration dans le planning au MouseUp
    setPlanning((currentPlanning) => {
      const planningCopy = structuredClone(currentPlanning);
      planningCopy[indexDay][`activity ${id}`].duration =
        Math.floor(parseInt(heightRef.current) / 50) + 1;
      return planningCopy;
    });
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "activity",
    item: { title: title },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  //Fonction pour supprimer l'activity
  const removeActivity = (indexDay, id) => {
    const planningCopy = structuredClone(planning);
    delete planningCopy[indexDay][`activity ${id}`];
    setPlanning(planningCopy);
  };

  return (
    <div ref={drag} className="activity" style={{ height: height }}>
      <p>{title}</p>
      {planning && (
        <div className="activity-actions">
          <p onClick={() => removeActivity(indexDay, id)}>Supprimer</p>
          <p
            onMouseDown={startResizing}
            // style={{ fontSize: `${resizing ? 38 : 14}px` }}
            className="resizing"
          >
            Modifier durée
            <FontAwesomeIcon icon="up-down" />
          </p>
        </div>
      )}
    </div>
  );
};

export default ActivityItem;
