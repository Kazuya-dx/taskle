import TaskDetail from "./TaskDetail";

// Redux関連のライブラリ・ファイル
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import styles from "./TaskList.module.scss";

const TaskList: React.FC = () => {
  const usersTasks = useSelector((state: RootState) => state.usersTasks);
  return (
    <div className={styles.title}>
      {usersTasks.length > 0 ? (
        usersTasks.map((task) => {
          return (
            <div key={task.id} className={styles.task}>
              <div className={styles.title}>
                <span>{task.title}</span>
                <TaskDetail>{task}</TaskDetail>
              </div>
              <div className={styles.text}>
                <div className={styles.tagarea}>
                  {task.tags.length !== 0 ? (
                    task.tags.map((tag) => {
                      return (
                        <span className={styles.tag} key={tag.id}>
                          {tag.name}
                        </span>
                      );
                    })
                  ) : (
                    <span className={styles.notag}> タグなし </span>
                  )}
                </div>
                {task.text}
              </div>
            </div>
          );
        })
      ) : (
        <div className={styles.notasks}>まだ積み上げがありません</div>
      )}
    </div>
  );
};

export default TaskList;
