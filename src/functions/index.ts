import * as functions from "firebase-functions";
import next from "next";
import express from "express";

const cors = require("cors");
const routes = require("next-routes");

/* Origins
const ALLOWED_ORIGINS = [
  "https://taskleapp.web.app",
  "https://taskleapp.firebaseapp.com",
  "https://us-central1-taskleapp.cloudfunctions.net/nextApp",
  "http://localhost:3000",
  "http://localhost:5000",
];

const corsOptions = {
  origin: ALLOWED_ORIGINS,
};
*/

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, conf: { distDir: "next" } });
const handle = routes().getRequestHandler(app);

const server = express();
server.use(cors({ origin: true }));
server.get("*", (req, res) => {
  return handle(req, res);
});
server.post("*", (req, res) => {
  return handle(req, res);
});

export const nextApp = functions.https.onRequest(server);
