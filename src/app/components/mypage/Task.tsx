import { useState } from "react";
import styles from "./Task.module.scss";
import useAddTask from "hooks/useAddTask";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const Task: React.FC = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [tagstext, setTagstext] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [toggle, setToggle] = useState(false);
  const { width } = useWindowDimensions();
  const addTask = useAddTask();

  return (
    <div>
      <div className={styles.buttonwrap}>
        <button className={styles.addbutton} onClick={() => setToggle(true)}>
          {width > 480 ? "学びを積み上げる" : "+"}
        </button>
      </div>

      {toggle ? (
        <div>
          <div
            className={styles.editwrap}
            onClick={() => {
              setToggle(false);
            }}
          ></div>
          <div className={styles.formwrap}>
            <div className={styles.top}>
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
            </div>
            <input
              type="text"
              value={title}
              className={styles.text}
              placeholder="タイトル"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <input
              type="text"
              value={tagstext}
              className={styles.text}
              placeholder="タグ（スペース区切りで最大5つまで入力可能）"
              onChange={(e) => {
                setTagstext(e.target.value);
              }}
            />
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
            <div className={styles.bottom}>
              <label>
                非公開にする
                <input
                  id="isPrivate"
                  type="checkbox"
                  onChange={() => {
                    let check: any = document.getElementById("isPrivate");
                    setIsPrivate(check?.checked);
                  }}
                />
              </label>

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
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Task;
