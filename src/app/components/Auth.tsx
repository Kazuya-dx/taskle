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

interface AuthProps {
  children: JSX.Element;
}

const Auth: React.FC<AuthProps> = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userComplete, setUserComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  // Mounting、currentUser変更時に実行（初回レンダリングとcurrentUserステート変更時)
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // User情報をReduxのUser Stateに追加
        const tmpUser: User | null = {
          uid: "",
          name: "",
          bio: "",
          icon: "0",
          background: "#dddddd",
          point: 0,
          coin: 0,
          is_guest: true,
        };
        const db = await firebase.firestore();
        await db
          .collection("user")
          .where("uid", "==", user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              tmpUser.uid = user.uid;
              tmpUser.name = doc.data().name;
              tmpUser.bio = doc.data().bio;
              tmpUser.icon = doc.data().icon;
              tmpUser.background = doc.data().background;
              tmpUser.point = doc.data().point;
              tmpUser.coin = doc.data().coin;
              tmpUser.is_guest = false;
            });
          })
          .catch((error) => {
            console.log(`データの取得に失敗しました (${error})`);
          });
        // ゲストユーザー
        if (user.displayName === null) {
          tmpUser.uid = user.uid;
          tmpUser.name = "ゲスト";
          tmpUser.bio = "こんにちは、私はゲストユーザーです。";
          tmpUser.point = 0;
          tmpUser.coin = 0;
        }
        await dispatch(setUser(tmpUser));

        // UserのTask情報をReduxのUsersTasksに追加
        const tmpTasks: Task[] = [];
        let task: Task = {
          id: "",
          title: "",
          text: "",
          created_at: "",
          tags: [],
        };
        // taskをfetchしてtmpTasksにtask(tags以外)を格納
        await db
          .collection("task")
          .where("uid", "==", user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              task.id = doc.id;
              task.title = doc.data().title;
              task.text = doc.data().text;
              task.created_at = doc.data().created_at;
              tmpTasks.push(task);
              task = { id: "", title: "", text: "", created_at: "", tags: [] };
            });
          });
        // tmpTasksをmapで回し、tagsにtag_idを代入
        await Promise.all(
          tmpTasks.map(
            async (task) =>
              await db
                .collection("tag_map")
                .where("entry_id", "==", task.id)
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((tagmapDoc) => {
                    task.tags.push({
                      id: tagmapDoc.data().tag_id,
                      name: "",
                    });
                  });
                })
          )
        );
        // tmpTasksをmapで回す。tagsが空でなければmapで回し、tag_nameを代入
        await Promise.all(
          tmpTasks.map(async (task) => {
            if (task.tags.length != 0) {
              await Promise.all(
                task.tags.map(async (tag) => {
                  await db
                    .collection("tag")
                    .doc(tag.id)
                    .get()
                    .then((tagDoc) => {
                      let tmp = tagDoc.data();
                      if (tmp !== undefined) {
                        tag.name = tmp.name;
                      }
                    });
                })
              );
            }
          })
        );
        await dispatch(setUsersTasks(tmpTasks));
        await setUserComplete(true);
      } else {
        const user = firebase.auth().currentUser;
        if (user === null) {
          await setUserComplete(true);
          router.push("/login");
        }
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
