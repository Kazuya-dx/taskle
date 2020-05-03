import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./LoginForm.module.scss";

// Firebase Auth 初期化(初期化は一度だけ)
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.taskle}>Taskle</div>
      <div className={styles.box}>
        <div>
          <p className={styles.text}>メールアドレス</p>
          <input
            type="email"
            value={email}
            className={styles.input}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <p className={styles.text}>パスワード</p>
          <input
            type="password"
            value={password}
            className={styles.input}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className={styles.wrap}>
            <button
              className={styles.button}
              onClick={async () => {
                await firebase
                  .auth()
                  .signInWithEmailAndPassword(email, password)
                  .then(() => {
                    // トップページへリダイレクト
                    router.push("/");
                  })
                  .catch((error) => {
                    console.error("Error creating user: ", error);
                    setMessage(
                      "メールアドレス または パスワード が間違っています。"
                    );
                  });
              }}
            >
              ログイン
            </button>
          </div>
          <p>{message}</p>
        </div>
      </div>
      <div className={styles.box2}>
        <div
          className={styles.text}
          onClick={() => {
            firebase
              .auth()
              .signInAnonymously()
              .then(() => {
                router.push("/");
              })
              .catch((error) => {
                console.error("Error creating user: ", error);
              });
          }}
        >
          ゲストとしてログインする場合はこちら
        </div>
      </div>
      <br />
    </div>
  );
};

export default LoginForm;
