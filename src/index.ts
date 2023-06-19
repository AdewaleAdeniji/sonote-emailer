const express = require("express");
const app = express();
const cors = require("cors");
import { Request, Response } from "express";
const Utils  = require("./utils/index");
const sendEmail = require("./services/Mail");
require("dotenv").config();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
import { middlewares } from "./middlewares/user";
import { APP_DEFAULT_USER } from "./variables";

app.use(express.static("public"));
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const sandRoutes = require('./routes/sand.routes');

app.use("/auth", authRoutes);
app.use("/profile", middlewares.validateUser, userRoutes);
app.use("/email", middlewares.validateApiKey, sandRoutes);

app.get("/health", (_: any, res: Response) => {
  res.send(Utils.responseBody("ok"));
});

app.post("/api/email/test", async (_: any, res: Response) => {
  const send = await sendEmail(
    "feranmi",
    "Welcome to sonote, your helpful email service",
    "Welcome to Sonote",
    "devferanmi@gmail.com",
    APP_DEFAULT_USER,
  );
  console.log(send);
  res.send(Utils.responseBody(send));
});
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/CRUD", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.APP_DB, // specify the database name here
  })
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("error occured connecting to mongodb"));

// app.use((err: Error, _: Request, res: Response) => {
//   console.error(err.stack);
//   return res.status(500).send("Something went wrong!");
// });
app.listen(process.env.PORT || 3002, (p: any) => {
  console.log("Server is running on port 3002");
});
