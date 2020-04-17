/*

REST API 説明書
api/v1/user/[uid]/tasks 

GET: response json
{
    message: "hoge",
    tasks: [
        {
            id: "hoge",
            title: "hoge",
            text: "hoge",
            created_at: TIMESTAMP,
        } ,
        {
            id: "hoge",
            title: "hoge",
            text: "hoge",
            created_at: TIMESTAMP,
        }
    ]
}

*/

import { NextApiRequest, NextApiResponse } from "next";

// Firestore 初期化(初期化は一度だけ)
const admin = require("firebase-admin");
let serviceAccount = require("../../../../../serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

let db = admin.firestore();

// Cloud Function の bodyParser を無効化
export const config = {
  api: {
    bodyParser: process.env.NODE_ENV !== "production",
  },
};

// interface
interface Task {
  id: string;
  title: string;
  text: string;
  good: number;
  is_private: boolean;
  created_at: any;
}

// APIロジック
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { uid },
  } = req;

  switch (req.method) {
    case "GET":
      const tasks: Task[] = [];
      let task = {
        id: "",
        title: "",
        text: "",
        good: 0,
        is_private: false,
        created_at: Date.now(),
      };
      db.collection("task")
        .where("uid", "==", uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            task.id = doc.id;
            task.title = doc.data().title;
            task.text = doc.data().text;
            task.good = doc.data().good;
            task.is_private = doc.data().is_private;
            task.created_at = doc.data().created_at;
            tasks.push(task);
            // task 初期化
            task = {
              id: "",
              title: "",
              text: "",
              good: 0,
              is_private: false,
              created_at: Date.now(),
            };
          });
          res.status(200).json({
            message: `api/v1/user/${uid} GET Success`,
            tasks: tasks,
          });
        })
        .catch((error) => {
          console.log(`データの取得に失敗しました (${error})`);
        });

      break;

    case "POST":
      res.status(200).json({
        message: `api/v1/user/${uid} POST Success`,
      });
      break;

    default:
      res.status(405).end();
      break;
  }
};
