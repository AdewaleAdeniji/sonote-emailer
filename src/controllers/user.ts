import { Request, Response } from "express";
const utils = require("../utils");
const UserService = require("../services/User");
const sendEmail = require("../services/Mail");

import { UserType } from "../types/user";
import { SONOTE_EMAIL, TEST_EMAIL_TEXT, TEST_EMAIL_TITLE } from "../variables";

exports.createUser = async (req: Request, res: Response) => {
  const data = req?.body;
  const check = await UserService.getUserByEmail(data.email);
  if (check) {
    return res.status(203).send({ message: "User email already exist" });
  }
  //use the data guy
  try {
    data.userID = utils.generateID();
    data.apiKey = utils.generateID();
    data.password = await utils.createHash(data.password);
    const user: UserType = await UserService.createUser(data);
    const userObject: any = {};
    userObject.name = user.name;
    userObject.email = user.email;
    userObject.userID = user.userID;
    userObject.token = utils.signToken(userObject);
    return res.json({ data: userObject, message: "Signup successful" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const data = body;
    const { password } = data;
    const user = await UserService.getUserByEmail(data.email);
    if (!user) {
      return res.status(203).send({ message: "Incorrect email or password" });
    }
    const validatePassword = await utils.validateHash(user.password, password);
    if (!validatePassword) {
      return res.status(203).send({ message: "Incorrect email or password" });
    }
    const userObject: any = {};
    userObject.name = user.name;
    userObject.email = user.email;
    userObject.userID = user.userID;

    userObject.token = await utils.signToken(userObject);

    return res.json({ data: userObject, message: "Signup successful" });
    // res.send(userObject);
  } catch (e) {
    const error: any = e;
    return res
      .status(422)
      .json({ message: error.errors ? error.errors[0] : "" });
  }
};
exports.getUserById = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const user = await UserService.getUserByUserId(userId);
    //create subpoll
    if (!user) return res.status(403).send({ message: "User not found" });
    user.password = "OK";
    user.appConfig = "OK";
    return res.json({ data: user, message: "success" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
exports.getUserByApiKey = async (req: any, res: Response) => {
    const userId = req.apiKey;
    try {
      const user = await UserService.getUserByApiKey(userId);

      if (!user) return res.status(403).send({ message: "User not found." });
      user.password = "OK";
      user.appConfig = "OK";
      return res.json({ data: user, message: "success" });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  };
exports.getUser = async (req: any, res: Response) => {
  try {
    const user = await UserService.getUserByUserId(req.userID);
    //create subpoll
    if (!user) return res.status(403).send({ message: "UNAUTHORIZED" });

    user.password = "OK";
    user.appConfig = "OK";
    return res.json({
      data: user,
      message: "success",
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
exports.setupConfig = async (req: any, res: Response) => {
  try {
    const user = await UserService.getUserByUserId(req.userID);
    //create subpoll
    if (!user) return res.status(403).send({ message: "UNAUTHORIZED" });
    //attempt to verify the password
    const body = req.body;
    const mail = await sendEmail(
      user.name,
      TEST_EMAIL_TITLE,
      TEST_EMAIL_TEXT,
      SONOTE_EMAIL,
      false,
      {
        user: body.email,
        pass: body.pass,
      }
    );
    if (mail.success) {
      // the email was correct
      user.appConfig = {
        appEmail: body.email,
        appPassword: utils.cryptConfig(body.pass, true),
      };
      user.configged = true;
      const updateUser = await UserService.updateUser(user._id, user);
      if (updateUser) {
        return res.status(200).send(utils.responseBody("OK"));
      } else {
        return res.status(400).send(utils.responseBody("Request failed."));
      }
    } else {
      return res
        .status(400)
        .send(
          utils.responseBody(mail?.error?.response || "Authentication failed")
        );
    }
  } catch (err: any) {
    return res.status(500).send(utils.responseBody("Request failed"));
  }
};
