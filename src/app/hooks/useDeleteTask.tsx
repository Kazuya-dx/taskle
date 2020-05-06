import { useDispatch } from "react-redux";
import { deleteUsersTasks } from "../redux/slices/usersTasksSlice";
import { Task } from "types/task";

// Firebase 初期化(初期化は一度だけ)
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const useDeleteTask = () => {
  const dispatch = useDispatch();
  const deleteTask = async (task: Task) => {
    console.log(task);
    const db = await firebase.firestore();
    // tagMaps削除
    await db
      .collection("tag_map")
      .where("entry_id", "==", task.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });
    // task削除
    await db
      .collection("task")
      .doc(task.id)
      .delete()
      .catch((error) => {
        console.log("error:" + error);
      });
    // reduxからtaskを削除
    await dispatch(deleteUsersTasks(task));
  };

  return deleteTask;
};

export default useDeleteTask;
