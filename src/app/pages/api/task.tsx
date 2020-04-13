import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

// Origins
const ALLOWED_ORIGINS = [
  "https://taskleapp.web.app/",
  "http://127.0.0.1:3000/",
  "http://127.0.0.1:5000/",
];

// Cors Middleware 初期化
const cors = Cors({
  origin: ALLOWED_ORIGINS,
  methods: ["GET", "POST", "HEAD"],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

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
  // Run the middleware
  await runMiddleware(req, res, cors);

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
      res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGINS);
      res.setHeader("Access-Control-Allow-Methods", "POST");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-type,Accept,X-Custom-Header"
      );
      res.status(200).json({
        message: "This is task api(POST)",
        name: req.body.name,
      });
      console.log(req.body.name);
      /*
      db.collection("tasks")
        .add({
          name: req.body.name,
          createdBy: date,
        })
        .then((ref) => {
          console.log("Added document with ID: ", ref.id);
          res.status(200).json({
            message: "This is task api(POST)",
          });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
        */
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
