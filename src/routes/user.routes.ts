const expressT = require("express");
const { getUser, getUserById, setupConfig } = require("../controllers/user");
const { getAllSand } = require("../controllers/sand");

const userRouter = expressT.Router();

userRouter.route("/user").get(getUser)
userRouter.route("/user/:userId").get(getUserById);

userRouter.route("/user/config").post(setupConfig);
userRouter.route("/sands").get(getAllSand);

module.exports = userRouter;