/*

REST API 説明書
api/v1/user/[uid] 

GET: response json
{
    message: "hoge",
    user: {name: "hoge", point: 500, coin: 500}
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

// APIロジック
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { uid },
  } = req;

  switch (req.method) {
    case "GET":
      let user = { name: "", point: 0, coin: 0 };
      db.collection("user")
        .where("uid", "==", uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            user.name = doc.data().name;
            user.point = doc.data().point;
            user.coin = doc.data().coin;
          });
          res.status(200).json({
            message: `api/v1/user/${uid} GET Success`,
            user: user,
          });
        })
        .catch((error) => {
          console.log(`データの取得に失敗しました (${error})`);
        });
      break;

    case "DELETE":
      res.status(200).json({
        message: `api/v1/user/${uid} DELETE Success`,
      });
      break;

    default:
      res.status(405).end();
      break;
  }
};
