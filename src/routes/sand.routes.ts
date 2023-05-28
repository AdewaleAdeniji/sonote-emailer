const expressSand = require("express");
const { sendSand } = require("../controllers/sand");

const sandRouter = expressSand.Router();

sandRouter.route("/send").post(sendSand)

module.exports = sandRouter;