const expressSand = require("express");
const { sendSand, sendTemplatedSand } = require("../controllers/sand");

const sandRouter = expressSand.Router();

sandRouter.route("/send").post(sendSand)
sandRouter.route("/template/:templateKey").post(sendTemplatedSand);

module.exports = sandRouter;