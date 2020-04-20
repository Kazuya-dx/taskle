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
import firebaseConfig from "../firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Auth = ({ children }): any => {
  const tmpUser: User | null = { uid: "", name: "", point: 0, coin: 0 };
  const tmpTasks: Task[] = [];
  const router = useRouter();
  const dispatch = useDispatch();
  const [userComplete, setUserComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  // Mounting、currentUser変更時に実行（初回レンダリングとcurrentUserステート変更時)
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        tmpUser.uid = user.uid;
        await fetch(`http://localhost:3000/api/v1/user/${user.uid}`)
          .then((res) => res.json())
          .then((data) => {
            tmpUser.name = data.user.name;
            tmpUser.coin = data.user.coin;
            tmpUser.point = data.user.point;
          });
        await dispatch(setUser(tmpUser));
        await fetch(`http://localhost:3000/api/v1/user/${user.uid}/tasks`)
          .then((res) => res.json())
          .then((data) => {
            data.tasks.forEach((task) => tmpTasks.push(task));
          });
        await dispatch(setUsersTasks(tmpTasks));
        setUserComplete(true);
      } else {
        router.push("/login");
      }
    });
    setIsMounted(true);
  }, [userComplete]);

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
