// Redux関連のライブラリ・ファイル
import { useSelector, useDispatch } from "react-redux";
import { addUsersTasks } from "../redux/slices/usersTasksSlice";
import { RootState } from "../redux/rootReducer";
import getStringFromDate from "modules/date_to_string";

// Firebase 初期化(初期化は一度だけ)
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

interface TaskType {
  id: string;
  title: string;
  text: string;
  created_at: string;
  tags: Tag[];
}

interface Tag {
  id: string;
  name: string;
}

const useAddTask = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const addTask = async (text, title, tagstext, isPrivate) => {
    let tmpDate = new Date();
    let now = getStringFromDate(tmpDate);
    let id = "";
    const tmpTags: Tag[] = [];
    const tags = tagstext.split(" ");
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
        user_name: user.name,
      })
      .then((doc) => {
        id = doc.id;
      })
      .catch((error) => {
        console.log(`データの取得に失敗しました (${error})`);
      });

    if (tags[0] != "") {
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
              await db.collection("tag_map").add({ entry_id: id, tag_id: tmp });
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
    }

    // Redux State 更新
    const tmpTask: TaskType = {
      id: id,
      title: title,
      text: text,
      created_at: now,
      tags: tmpTags,
    };
    dispatch(addUsersTasks(tmpTask));
  };

  return addTask;
};

export default useAddTask;
