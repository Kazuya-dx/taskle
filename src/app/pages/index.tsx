import { useState, useEffect } from "react";
import fetch from "node-fetch";
import App from "../components/App";
import Profile from "../components/mypage/Profile";
import Pet from "../components/mypage/Pet";
import Task from "../components/mypage/Task";

// Firebase Auth 初期化(初期化は一度だけ)
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Index = () => {
  const [user, setUser] = useState({ name: "", point: 0, coin: 0 });
  const [tasks, setTasks]: any = useState([]);
  useEffect(() => {
    let uid = "";
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        uid = user.uid;
        await fetch(`http://localhost:3000/api/v1/user/${uid}`)
          .then((res) => res.json())
          .then((data) => setUser(data.user));
        await fetch(`http://localhost:3000/api/v1/user/${uid}/tasks`)
          .then((res) => res.json())
          .then((data) => {
            setTasks((tasks) => {
              tasks.length = 0;
              data.tasks.forEach((task) => {
                tasks.push(task);
              });
            });
            console.log(data);
          });
      }
    });
  }, []);
  return (
    <App>
      {user.name !== "" ? (
        <Profile>{user}</Profile>
      ) : (
        <div>
          <h3>ログインしていません</h3>
        </div>
      )}
      <Pet />
      <Task>{tasks}</Task>
    </App>
  );
};

export default Index;
