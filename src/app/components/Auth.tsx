import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Firebase 初期化(初期化は一度だけ)
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Auth = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLogined, setIsLogined] = useState(false);
  const router = useRouter();
  useEffect(() => {
    // マウント後
    setIsMounted(true);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLogined(true);
      }
    });
  });

  if (!isMounted) {
    return <div>Now Loading...</div>;
  }
  if (isLogined) {
    return <div>{children}</div>;
  } else {
    router.push("/login");
    return <div></div>;
  }
};

export default Auth;
