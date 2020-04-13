import * as functions from "firebase-functions";
import next from "next";
import express from "express";

const cors = require("cors");
const routes = require("next-routes");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, conf: { distDir: "next" } });
const handle = routes().getRequestHandler(app);

const server = express();
server.use(cors({ origin: true }));
server.get("*", (req, res) => {
  return handle(req, res);
});

export const nextApp = functions.https.onRequest(server);
