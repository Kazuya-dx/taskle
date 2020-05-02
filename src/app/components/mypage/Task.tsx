import { useState } from "react";
import TaskList from "./TaskList";
import styles from "./Task.module.scss";
import useAddTask from "hooks/useAddTask";

const Task: React.FC = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [tagstext, setTagstext] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [toggle, setToggle] = useState(false);
  const addTask = useAddTask();

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
            <input
              type="text"
              value={tagstext}
              className={styles.text}
              placeholder="タグ（スペース区切りで最大5つまで入力可能）"
              onChange={(e) => {
                setTagstext(e.target.value);
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
                setIsPrivate(check?.checked);
              }}
            />
            <button
              className={styles.button}
              onClick={async () => {
                await addTask(text, title, tagstext, isPrivate);
                await setTitle("");
                await setTagstext("");
                await setText("");
                setToggle(false);
              }}
            >
              アウトプットする
            </button>
          </div>
        ) : (
          <div className={styles.buttonwrap}>
            <button className={styles.button} onClick={() => setToggle(true)}>
              学びをアウトプットする
            </button>
          </div>
        )}
      </div>
      <TaskList />
    </div>
  );
};

export default Task;
