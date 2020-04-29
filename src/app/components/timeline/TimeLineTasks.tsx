import useTimeLineTasks from "../../hooks/useTimeLineTasks";

const TimeLineTasks: React.FC = () => {
  const tasks = useTimeLineTasks();
  console.log(tasks);
  return (
    <div>
      {tasks !== undefined ? (
        tasks.map((task) => {
          return <div key={task.id}>{task.title}</div>;
        })
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default TimeLineTasks;
