const expressT = require("express");
const { getUser, getUserById, setupConfig } = require("../controllers/user");
const { getAllSand } = require("../controllers/sand");
const { createTemplate, getUserTemplates, updateTemplate, getTemplate, previewTemplate } =  require("../controllers/Templates");

const userRouter = expressT.Router();

userRouter.route("/user").get(getUser)
userRouter.route("/user/:userId").get(getUserById);

userRouter.route("/user/config").post(setupConfig);
userRouter.route("/sands").get(getAllSand);

userRouter.route("/template").post(createTemplate);
userRouter.route("/templates").get(getUserTemplates);
userRouter.route("/template/:templateKey").put(updateTemplate);
userRouter.route("/template/:templateKey").get(getTemplate);
userRouter.route("/template/preview/:templateKey").get(previewTemplate);

module.exports = userRouter;