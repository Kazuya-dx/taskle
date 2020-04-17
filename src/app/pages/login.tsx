import { useState } from "react";
import { useRouter } from "next/router";

// Firebase Auth 初期化(初期化は一度だけ)
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  return (
    <div>
      <p>ログイン</p>
      <div>
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
              .signInWithEmailAndPassword(email, password)
              .then(() => {
                // トップページへリダイレクト
                router.push("/");
              })
              .catch((error) => {
                console.error("Error creating user: ", error);
              });
          }}
        >
          ログイン
        </button>
      </div>
    </div>
  );
};

export default Login;
