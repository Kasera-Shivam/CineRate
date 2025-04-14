import express from "express";
import path from "path";
import { __dirname, __filename } from "../dirname.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";

const app = express();

app.use(express.static(path.join(__dirname, "frontend", "dist")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", routes);
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

const port = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGODB_URL)
  .then((conn) => {
    console.log(`Database is connected to : ${conn.connection.host}`);
    server.listen(port, () => {
      console.log(`Server is running on : http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });
