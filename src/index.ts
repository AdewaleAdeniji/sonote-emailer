const express = require("express");
const app = express();
const cors = require("cors");
import { Request, Response } from "express";

app.use(cors({ origin: "*" }));

app.get("*", (_: Express.Request, res: Response) => {
  return res.status(404).send("Not found");
});
// app.post("*", (_, res) => {
//   return res.status(404).send("Not found");
// });
// app.use((err, _, res) => {
//   console.error(err.stack);
//   return res.status(500).send("Something went wrong!");
// });
app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running on port 3001");
});
module.exports = app;
