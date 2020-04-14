import { NextApiRequest, NextApiResponse } from "next";

// Firestore 初期化
const admin = require("firebase-admin");
let serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

let db = admin.firestore();
let date = new Date();

// APIロジック
export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      db.collection("tasks")
        .add({
          name: "これはテストです",
          createdBy: date,
        })
        .then((ref) => {
          console.log("Added document with ID: ", ref.id);
          res.status(200).json({
            message: "This is task api(GET)",
          });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      break;

    case "POST":
      db.collection("tasks")
        .add({
          name: req.body.tasks.name,
          createdBy: date,
        })
        .then((ref) => {
          console.log("Added document with ID: ", ref.id);
          res.status(200).json({
            message: "This is task api(POST)",
            task: req.body.tasks.name,
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

// Cloud Function の bodyParser を無効化
export const config = {
  api: {
    bodyParser: process.env.NODE_ENV !== "production",
  },
};
