import "./activityItem.css";
import { useDrag } from "react-dnd";

const ActivityItem = ({ id, duration, indexDay, planning, setPlanning }) => {
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
    <div
      ref={drag}
      className="activity"
      style={{ height: `${duration * 50}px` }}
    >
      <p>ACTIVITE {id}</p>
      {planning ? (
        <p onClick={() => removeActivity(indexDay, id)}>Supprimer</p>
      ) : null}
    </div>
  );
};

export default ActivityItem;
