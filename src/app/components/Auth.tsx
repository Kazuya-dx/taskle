import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Firebase 初期化(初期化は一度だけ)
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Auth = ({ children }): any => {
  const router = useRouter();
  const [currentUser, setCurrentUser]: any = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  // Mounting、currentUser変更時に実行（初回レンダリングとcurrentUserステート変更時)
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        router.push("/login");
      }
    });
    setIsMounted(true);
  }, [currentUser]);

  // Mounting後
  if (isMounted) {
    // User情報が更新するまでLoading
    if (currentUser === null) {
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
