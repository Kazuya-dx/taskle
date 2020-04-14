import * as functions from "firebase-functions";
import next from "next";
import express from "express";

const cors = require("cors");
const routes = require("next-routes");

// Origins
const ALLOWED_ORIGINS = [
  "https://taskleapp.web.app",
  "http://localhost:3000",
  "http://localhost:5000",
];

const corsOptions = {
  origin: ALLOWED_ORIGINS,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, conf: { distDir: "next" } });
const handle = routes().getRequestHandler(app);

const server = express();
server.use(cors(corsOptions));
server.get("*", (req, res) => {
  return handle(req, res);
});
server.post("*", (req, res) => {
  return handle(req, res);
});

export const nextApp = functions.https.onRequest(server);
