import { useState } from "react";
import CreateRandomId from "../../modules/create-random-id";
import styles from "./Task.module.scss";

const Task = ({ children }) => {
  const [tasks, setTasks] = useState(children.tasks);
  const [text, setText] = useState("");
  return (
    <div>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button
          className={styles.button}
          onClick={() => {
            setTasks([...tasks, { id: CreateRandomId(), name: text }]);

            // POST APIよりDBにタスク内容を更新
            /*
            const body = { tasks };
            const options = {
              method: "POST",
              body: JSON.stringify(body),
            };
            fetch(
              "https://us-central1-taskleapp.cloudfunctions.net/nextApp/api/task",
              options
            )
              .then((res) => res.json())
              .then((json) => console.log(json));
            */
          }}
        >
          タスクを積み上げる
        </button>
      </div>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => {
            return <li key={task.id}>{task.name}</li>;
          })}
        </ul>
      ) : (
        <div>まだ積み上げがありません</div>
      )}
    </div>
  );
};

export default Task;
