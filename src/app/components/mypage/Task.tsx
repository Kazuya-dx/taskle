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
            setTasks([{ id: CreateRandomId(), name: text }, ...tasks]);

            // POST APIよりDBにタスク内容を更新
            fetch(
              "https://us-central1-taskleapp.cloudfunctions.net/nextApp/api/task",
              {
                method: "POST",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  tasks: { name: text },
                }),
              }
            )
              .then((res) => res.json())
              .then((json) => console.log(json));
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
