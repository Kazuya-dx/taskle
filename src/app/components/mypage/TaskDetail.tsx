import { useState } from "react";
import useDeleteTask from "../../hooks/useDeleteTask";
import styles from "./TaskDetail.module.scss";
import { Task } from "../../types/task";

interface TaskDetailProps {
  children: Task;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ children }) => {
  const task: Task = children;
  const [open, setOpen] = useState(false);
  const deleteTask = useDeleteTask();
  return (
    <div className={styles.title}>
      {!open ? (
        <span
          className={styles.detail}
          onClick={() => {
            setOpen(true);
          }}
        >
          ＝
        </span>
      ) : (
        <span className={styles.detailbox}>
          <div
            className={styles.close}
            onClick={() => {
              setOpen(false);
            }}
          >
            ×
          </div>
          <div>編集する</div>
          <div
            className={styles.delete}
            onClick={() => {
              const result = confirm("本当に削除しますか？");
              if (result) {
                deleteTask(task);
                setOpen(false);
              }
            }}
          >
            削除する
          </div>
        </span>
      )}
    </div>
  );
};

export default TaskDetail;
