import { useState } from "react";
import CreateRandomId from "../../modules/create-random-id";
import styles from "./Task.module.scss";

const Task = ({ children }) => {
  const [tasks, setTasks]: any = useState([]);
  console.log(tasks);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <div>
        {toggle ? (
          <div className={styles.formwrap}>
            <p>
              学び
              <button
                className={styles.close}
                onClick={() => {
                  setToggle(false);
                  setTitle("");
                  setText("");
                }}
              >
                ×
              </button>
            </p>
            <input
              type="text"
              value={title}
              className={styles.text}
              placeholder="タイトル"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <br />
            <textarea
              value={text}
              rows={7}
              className={styles.textarea}
              placeholder="ここに学んだことをアウトプットしよう"
              onChange={(e) => {
                setText(e.target.value);
              }}
            ></textarea>
            <br />
            <label>非公開にする</label>
            <input
              id="isPrivate"
              type="checkbox"
              onChange={() => {
                let check: any = document.getElementById("isPrivate");
                setIsPrivate(check.checked);
              }}
            />
            <button
              className={styles.button}
              onClick={() => {
                setTasks([
                  { id: CreateRandomId(), title: title, text: text },
                  ...tasks,
                ]);

                // POST APIよりDBにタスク内容を更新
                fetch(
                  `http://localhost:3000/api/v1/user/${children.uid}/tasks`,
                  /* https://us-central1-taskleapp.cloudfunctions.net/nextApp */
                  {
                    method: "POST",
                    mode: "cors",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      tasks: {
                        title: title,
                        text: text,
                        is_private: isPrivate,
                        good: 0,
                        created_at: Date.now(),
                        uid: children.uid,
                      },
                    }),
                  }
                )
                  .then((res) => res.json())
                  .then((json) => console.log(json));

                setToggle(false);
                setTitle("");
                setText("");
              }}
            >
              アウトプットする
            </button>
          </div>
        ) : (
          <button className={styles.button} onClick={() => setToggle(true)}>
            学びをアウトプットする
          </button>
        )}
      </div>
      {children.tasks.length > 0 ? (
        <ul>
          {children.tasks.map((task) => {
            return (
              <li key={task.id}>
                {task.title}: {task.text}
              </li>
            );
          })}
        </ul>
      ) : (
        <div>まだ積み上げがありません</div>
      )}
    </div>
  );
};

export default Task;
