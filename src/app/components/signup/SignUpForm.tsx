import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./SignUpForm.module.scss";

// Firebase Auth 初期化(初期化は一度だけ)
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const SignUpForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div>
          <div className={styles.title}>新規アカウント作成</div>
          <p className={styles.text}>ユーザー名</p>
          <input
            type="text"
            value={name}
            className={styles.input}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
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
                if (name !== "" && email !== "" && password !== "") {
                  const db = await firebase.firestore();
                  await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then((result: firebase.auth.UserCredential) => {
                      result.user?.updateProfile({
                        displayName: name,
                      });
                      db.collection("user")
                        .add({
                          name: name,
                          bio: "こんにちは、" + name + " です",
                          uid: result.user?.uid,
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
                      setMessage("このメールアドレスは既に登録されています");
                    });
                } else {
                  setMessage("未記入の欄があります");
                }
              }}
            >
              新規登録
            </button>
          </div>
          <p className={styles.message}>{message}</p>
        </div>
      </div>
      <br />
    </div>
  );
};

export default SignUpForm;
