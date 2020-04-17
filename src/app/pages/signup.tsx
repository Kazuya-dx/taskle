import { useState } from "react";
import { useRouter } from "next/router";

// Firebase 初期化(初期化は一度だけ)
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  return (
    <div>
      <p>新規会員登録</p>
      <div>
        <p>ユーザー名</p>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <p>メールアドレス</p>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <p>パスワード</p>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={() => {
            firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then((result: any) => {
                result.user.updateProfile({
                  displayName: name,
                });
                db.collection("user")
                  .add({
                    name: name,
                    uid: result.user.uid,
                    coin: 500,
                    point: 0,
                  })
                  .then((ref) => {
                    console.log("Added document with ID: ", ref.id);
                  })
                  .catch((error) => {
                    console.error("Error adding database: ", error);
                  });
              })
              .then(() => {
                // トップページへリダイレクト
                router.push("/");
              })
              .catch((error) => {
                console.error("Error creating user: ", error);
              });
          }}
        >
          新規登録
        </button>
      </div>
    </div>
  );
};

export default SignUp;
