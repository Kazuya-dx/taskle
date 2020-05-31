import { useEffect } from "react";

// Redux関連のライブラリ・ファイル
import { useDispatch } from "react-redux";
import { setTimelineTasks } from "../redux/slices/timelineTasksSlice";

// Firebase 初期化(初期化は一度だけ)
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

interface TimelineTask {
  id: string;
  uid: string;
  user_name: string;
  icon: string;
  background: string;
  title: string;
  text: string;
  created_at: string;
  good: number;
  is_private: boolean;
  tags: { id: string; name: string }[];
}

const useTimeLineTasks = () => {
  const dispatch = useDispatch();
  const tmpTasks: TimelineTask[] = [];
  const tasks: TimelineTask[] = [];
  const setTasks = async () => {
    const db = firebase.firestore();
    await db
      .collection("task")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const task: TimelineTask = {
            id: doc.id,
            uid: doc.data().uid,
            user_name: "ゲスト",
            icon: "0",
            background: "#dddddd",
            title: doc.data().title,
            text: doc.data().text,
            created_at: doc.data().created_at,
            good: doc.data().good,
            is_private: doc.data().is_private,
            tags: [],
          };
          tmpTasks.push(task);
        });
      });
    await Promise.all(
      tmpTasks.map(async (task) => {
        let isGuest = true;
        await db
          .collection("user")
          .where("uid", "==", task.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const tmp: TimelineTask = {
                id: task.id,
                uid: task.uid,
                user_name: doc.data().name,
                icon: doc.data().icon,
                background: doc.data().background,
                title: task.title,
                text: task.text,
                created_at: task.created_at,
                good: task.good,
                is_private: task.is_private,
                tags: task.tags,
              };
              tasks.push(tmp);
              isGuest = false;
            });
          });
        if (isGuest) {
          tasks.push(task);
        }
      })
    );
    await dispatch(setTimelineTasks(tasks));
  };
  useEffect(() => {
    setTasks();
  }, []);
};

export default useTimeLineTasks;
