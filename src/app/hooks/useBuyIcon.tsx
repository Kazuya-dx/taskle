// Redux関連のライブラリ・ファイル
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

const useBuyIcon = () => {
  const db = firebase.firestore();
  const dispatch = useDispatch();
  let id = "";

  const buyIcon = async (
    user: User,
    coin: number,
    price: number,
    iconName: string
  ) => {
    await db
      .collection("icon_map")
      .add({ entry_id: user.uid, icon_name: iconName });
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
      .update({
        coin: coin - price,
      });
    const tmpOwnedIcons = [...user.owned_icons, iconName];
    const tmpUser: User = {
      uid: user.uid,
      name: user.name,
      bio: user.bio,
      icon: user.icon,
      owned_icons: tmpOwnedIcons,
      background: user.background,
      point: user.point,
      coin: user.coin - price,
      is_guest: user.is_guest,
    };
    console.log(tmpUser);
    await dispatch(setUser(tmpUser));
  };

  return buyIcon;
};

export default useBuyIcon;
