import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import useTimeLineTasks from "../../hooks/useTimeLineTasks";

const TimeLineTasks: React.FC = () => {
  const timeLineTasks = useSelector((state: RootState) => state.timelineTasks);
  useTimeLineTasks();
  console.log(timeLineTasks);
  return (
    <div>
      {timeLineTasks.length > 0 ? (
        timeLineTasks.map((task) => {
          return <div key={task.id}>{task.title}</div>;
        })
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default TimeLineTasks;
