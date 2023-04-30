"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors({ origin: "*" }));
app.get("*", function (_, res) {
    return res.status(404).send("Not found");
});
// app.post("*", (_, res) => {
//   return res.status(404).send("Not found");
// });
// app.use((err, _, res) => {
//   console.error(err.stack);
//   return res.status(500).send("Something went wrong!");
// });
app.listen(process.env.PORT || 3001, function () {
    console.log("Server is running on port ${process.env.PORT}`);
});
