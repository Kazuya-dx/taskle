import { NextApiRequest, NextApiResponse } from "next";

// Firestore 初期化(初期化は一度だけ)
const admin = require("firebase-admin");
let serviceAccount = require("../../serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

let db = admin.firestore();
let date = new Date();

// Cloud Function の bodyParser を無効化
export const config = {
  api: {
    bodyParser: process.env.NODE_ENV !== "production",
  },
};

// APIロジック
export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      const tasks: any = [];
      db.collection("tasks")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            tasks.push({
              id: doc.id,
              title: doc.data().title,
            });
          });

          res.status(200).json({
            message: "This is task api(GET)",
            tasks,
          });
        })
        .catch((err) => {
          console.log("Error getting documents", err);
        });
      break;

    case "POST":
      db.collection("tasks")
        .add({
          title: req.body.tasks.title,
          createdBy: date,
        })
        .then((ref) => {
          console.log("Added document with ID: ", ref.id);

          res.status(200).json({
            message: "This is task api(POST)",
            tasks: req.body.tasks.title,
          });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      break;

    case "PUT":
      res.status(200).json({
        message: "This is test api(PUT)",
      });
      break;

    case "DELETE":
      res.status(200).json({
        message: "This is test api(DELETE)",
      });
      break;

    default:
      res.status(405).end();
      break;
  }
};
