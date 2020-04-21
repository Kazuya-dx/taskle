import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Redux関連
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { setUsersTasks } from "../redux/slices/usersTasksSlice";
import { User } from "../types/user";
import { Task } from "../types/task";

// Firebase 初期化(初期化は一度だけ)
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Auth = ({ children }): any => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userComplete, setUserComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  // Mounting、currentUser変更時に実行（初回レンダリングとcurrentUserステート変更時)
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // User情報をReduxのUser Stateに追加
        const tmpUser: User | null = { uid: "", name: "", point: 0, coin: 0 };
        const db = await firebase.firestore();
        await db
          .collection("user")
          .where("uid", "==", user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.id, "=>", doc.data());
              tmpUser.uid = user.uid;
              tmpUser.name = doc.data().name;
              tmpUser.point = doc.data().point;
              tmpUser.coin = doc.data().coin;
            });
          })
          .catch((error) => {
            console.log(`データの取得に失敗しました (${error})`);
          });
        await dispatch(setUser(tmpUser));

        // UserのTask情報をReduxのUsersTasksに追加
        const tmpTasks: Task[] = [];
        let task: Task = { id: "", title: "", text: "", created_at: "" };
        await db
          .collection("task")
          .where("uid", "==", user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.id, "=>", doc.data());
              task.id = doc.id;
              task.title = doc.data().title;
              task.text = doc.data().text;
              task.created_at = doc.data().created_at;
              tmpTasks.push(task);
              // task初期化
              task = { id: "", title: "", text: "", created_at: "" };
            });
          });
        await dispatch(setUsersTasks(tmpTasks));
        await setUserComplete(true);
      } else {
        router.push("/login");
      }
    });
    setIsMounted(true);
  }, [firebase.auth().currentUser]);

  // Mounting後
  if (isMounted) {
    // User情報が更新するまでLoading
    if (!userComplete) {
      return <div>Now Loading... (Checking User Infomation)</div>;
    } else {
      return <>{children}</>;
    }
    // Mounting中
  } else {
    return <div>Now Loading...</div>;
  }
};

export default Auth;
