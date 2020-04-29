// Redux関連のライブラリ・ファイル
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import styles from "./TaskList.module.scss";

const TaskList: React.FC = () => {
  const usersTasks = useSelector((state: RootState) => state.usersTasks);
  return (
    <div>
      {usersTasks.length > 0 ? (
        usersTasks.map((task) => {
          return (
            <div key={task.id} className={styles.task}>
              <div className={styles.title}>{task.title}</div>
              <div className={styles.text}>
                <div>
                  タグ:
                  {task.tags.length !== 0 ? (
                    task.tags.map((tag) => {
                      return <span key={tag.id}> {tag.name} </span>;
                    })
                  ) : (
                    <span> タグなし </span>
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
