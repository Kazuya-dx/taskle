import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { User } from "../types/user";

// Firebase 初期化(初期化は一度だけ)
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const useEditProfile = () => {
  const db = firebase.firestore();
  const dispatch = useDispatch();
  let id = "";

  const editProfile = async (
    user: User,
    name: string,
    bio: string,
    icon: string,
    background: string
  ) => {
    await db
      .collection("user")
      .where("uid", "==", user.uid)
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          id = doc.id;
        });
      });
    await db
      .collection("user")
      .doc(id)
      .update({ name: name, bio: bio, icon: icon, background: background });
    const tmpUser: User = {
      uid: user.uid,
      name: name,
      bio: bio,
      icon: icon,
      owned_icons: user.owned_icons,
      background: background,
      point: user.point,
      coin: user.coin,
      is_guest: false,
    };
    dispatch(setUser(tmpUser));
  };

  return editProfile;
};

export default useEditProfile;
