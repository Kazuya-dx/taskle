import { useState } from "react";
import TaskList from "./TaskList";
import createRandomId from "../../modules/create-random-id";
import getStringFromDate from "../../modules/date_to_string";
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
  created_at: string;
  tags: any[];
}

const Task = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [tagstext, setTagstext] = useState("");
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
            <input
              type="text"
              value={tagstext}
              className={styles.text}
              placeholder="ここに学んだことに関するタグをスペース区切りで最大5つまで入力（例 プログラミング 英語)"
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
                setIsPrivate(check.checked);
              }}
            />
            <button
              className={styles.button}
              onClick={async () => {
                let tmpDate = new Date();
                let now = getStringFromDate(tmpDate);
                let id = "";
                const tmpTags: any = [];
                const tags = tagstext.split(" ");
                const db = await firebase.firestore();

                // taskをFirestoreに追加
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
                  .then((doc) => {
                    id = doc.id;
                  })
                  .catch((error) => {
                    console.log(`データの取得に失敗しました (${error})`);
                  });

                // tagとtag_mapをFirestoreに追加
                for (let item in tags) {
                  await db
                    .collection("tag")
                    .where("name", "==", tags[item])
                    .get()
                    .then(async (snapshot) => {
                      // 重複なし
                      if (snapshot.empty) {
                        let tmp;
                        await db
                          .collection("tag")
                          .add({ name: tags[item] })
                          .then((doc) => {
                            tmp = doc.id;
                          });
                        await db
                          .collection("tag_map")
                          .add({ entry_id: id, tag_id: tmp });
                        tmpTags.push({ id: tmp, name: tags[item] });

                        // 重複あり
                      } else {
                        let tmp;
                        await snapshot.forEach((doc) => {
                          tmp = doc.id;
                        });
                        await db
                          .collection("tag_map")
                          .add({
                            entry_id: id,
                            tag_id: tmp,
                          })
                          .then(() => {
                            tmpTags.push({ id: tmp, name: tags[item] });
                          });
                      }
                    });
                }

                // Redux State 更新
                const tmpTask: TaskType = {
                  id: createRandomId(),
                  title: title,
                  text: text,
                  created_at: now,
                  tags: tmpTags,
                };
                dispatch(addUsersTasks(tmpTask));

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
          <button className={styles.button} onClick={() => setToggle(true)}>
            学びをアウトプットする
          </button>
        )}
      </div>
      <TaskList />
    </div>
  );
};

export default Task;
