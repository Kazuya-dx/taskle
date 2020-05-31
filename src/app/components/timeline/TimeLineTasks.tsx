import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import Icon from "../Icon";
import useTimeLineTasks from "../../hooks/useTimeLineTasks";
import styles from "./TimeLineTasks.module.scss";

const TimeLineTasks: React.FC = () => {
  const timeLineTasks = useSelector((state: RootState) => state.timelineTasks);
  useTimeLineTasks();
  return (
    <div>
      {timeLineTasks.length > 0 ? (
        timeLineTasks.map((task) => {
          if (!task.is_private) {
            return (
              <div key={task.id} className={styles.task}>
                <div className={styles.image}>
                  <Icon
                    icon={task.icon}
                    background={task.background}
                    decoration="0"
                    size="50px"
                  />
                </div>
                <div className={styles.right}>
                  <div className={styles.title}>{task.title}</div>
                  <div className={styles.sub}>
                    <div className={styles.user}>{task.user_name}</div>
                    <div className={styles.date}>{task.created_at}</div>
                  </div>
                </div>
              </div>
            );
          }
        })
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default TimeLineTasks;
