import { useState } from "react";
import CreateRandomId from "../../modules/create-random-id";
import styles from "./Task.module.scss";

// Redux関連のライブラリ・ファイル
import { useSelector, useDispatch } from "react-redux";
import { addUsersTasks } from "../../redux/slices/usersTasksSlice";
import { RootState } from "../../redux/rootReducer";

// Firebase 初期化(初期化は一度だけ)
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../../firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

interface TaskType {
  id: string;
  title: string;
  text: string;
  created_at: Date;
}

const Task = () => {
  const usersTasks = useSelector((state: RootState) => state.usersTasks);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
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
              onClick={async () => {
                let now = new Date();
                // Redux State 更新
                const tmpTask: TaskType = {
                  id: CreateRandomId(),
                  title: title,
                  text: text,
                  created_at: now,
                };
                dispatch(addUsersTasks(tmpTask));

                // Firestore に追加
                const db = await firebase.firestore();
                await db
                  .collection("task")
                  .add({
                    title: title,
                    text: text,
                    is_private: isPrivate,
                    good: 0,
                    created_at: now,
                    uid: user.uid,
                  })
                  .catch((error) => {
                    console.log(`データの取得に失敗しました (${error})`);
                  });

                await setTitle("");
                await setText("");
                setToggle(false);
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
      {usersTasks.length > 0 ? (
        <ul>
          {usersTasks.map((task) => {
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
