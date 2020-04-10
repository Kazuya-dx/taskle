import { NextApiRequest, NextApiResponse } from "next";

// Firestore 初期化
const admin = require("firebase-admin");
let serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

let db = admin.firestore();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      const messages: any = [];
      db.collection("messages")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            messages.push({
              id: doc.id,
              text: doc.id.text,
            });
          });

          res.status(200).json({
            message: "This is test api(GET)",
            messages,
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
