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
              name: doc.data().name,
            });
          });

          res.status(200).json({
            message: "This is test api(GET)",
            tasks,
          });
        })
        .catch((err) => {
          console.log("Error getting documents", err);
        });
      break;

    case "POST":
      res.status(200).json({
        message: "This is test api(POST)",
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
