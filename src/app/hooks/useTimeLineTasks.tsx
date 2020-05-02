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

interface Task {
  id: string;
  title: string;
  text: string;
  created_at: string;
  good: number;
  is_private: boolean;
  tags: { id: string; name: string }[];
}

const useTimeLineTasks = () => {
  const dispatch = useDispatch();
  const tasks: Task[] = [];
  useEffect(() => {
    const db = firebase.firestore();
    db.collection("task")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const task: Task = {
            id: doc.id,
            title: doc.data().title,
            text: doc.data().text,
            created_at: doc.data().created_at,
            good: doc.data().good,
            is_private: doc.data().is_private,
            tags: [],
          };
          tasks.push(task);
        });
      })
      .then(() => {
        dispatch(setTimelineTasks(tasks));
      });
  });
};

export default useTimeLineTasks;
