import { useState } from "react";
import CreateRandomId from "../../modules/create-random-id";
import styles from "./Task.module.scss";

const Task = ({ children }) => {
  const [tasks, setTasks] = useState(children);
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
            setTasks([{ id: CreateRandomId(), title: text }, ...tasks]);

            // POST APIよりDBにタスク内容を更新
            fetch(
              "http://localhost:3000/api/task",
              /* https://us-central1-taskleapp.cloudfunctions.net/nextApp */
              {
                method: "POST",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  tasks: { title: text },
                }),
              }
            )
              .then((res) => res.json())
              .then((json) => console.log(json));
          }}
        >
          学びをアウトプットする
        </button>
      </div>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => {
            return <li key={task.id}>{task.title}</li>;
          })}
        </ul>
      ) : (
        <div>まだ積み上げがありません</div>
      )}
    </div>
  );
};

export default Task;
