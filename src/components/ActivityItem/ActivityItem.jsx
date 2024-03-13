import "./activityItem.css";
import { useDrag } from "react-dnd";

const ActivityItem = ({ id }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "activity",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="activity">
      <p>ACTIVITE {id}</p>
    </div>
  );
};

export default ActivityItem;
