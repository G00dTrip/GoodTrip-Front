import { useState, useEffect } from "react";
import "./activityItem.css";
import { useDrag } from "react-dnd";

const ActivityItem = ({ id, duration, indexDay, planning, setPlanning }) => {
  const [resizing, setResizing] = useState(false);
  const [height, setHeight] = useState(`${duration * 50}px`);
  const [startY, setStartY] = useState(0);

  //Useeffect pour mettre à jour l'activityItem dés que le planning est modifié
  useEffect(() => {
    setHeight(`${duration * 50}px`);
  }, [planning]);

  const startResizing = (e) => {
    e.preventDefault();
    setResizing(true);
    setStartY(e.clientY); //On définit la position initiale de la souris
    document.addEventListener("mousemove", resizeActivity);
    document.addEventListener("mouseup", endResizing);
  };

  const resizeActivity = (e) => {
    console.log("resize en cours");
    const newY = e.clientY;
    const diffY = newY - startY;
    setHeight((prevHeight) => {
      let newHeight = parseInt(prevHeight) + diffY;
      return `${newHeight}px`;
    });
    setStartY(newY); // Mettre à jour startY pour le prochain calcul
  };

  const endResizing = (e) => {
    e.preventDefault();
    setResizing(false);
    document.removeEventListener("mousemove", resizeActivity);
    document.removeEventListener("mouseup", endResizing);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "activity",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const removeActivity = (indexDay, id) => {
    const planningCopy = structuredClone(planning);
    delete planningCopy[indexDay][`activity ${id}`];
    setPlanning(planningCopy);
  };

  return (
    <div ref={drag} className="activity" style={{ height: height }}>
      <p>ACTIVITE {id}</p>
      {planning ? (
        <p onClick={() => removeActivity(indexDay, id)}>Supprimer</p>
      ) : null}
      <p
        onMouseDown={startResizing}
        // style={{ fontSize: `${resizing ? 38 : 14}px` }}
      >
        Modifier durée
      </p>
    </div>
  );
};

export default ActivityItem;
