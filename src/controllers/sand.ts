//save a mail
// send an email
// get all emails by userID

import { Request, Response } from "express";
import { APP_DEFAULT_USER } from "../variables";
const utils = require("../utils");
const UserService = require("../services/User");
const SandService = require("../services/Sand");
const sendEmail = require("../services/Mail");
const TemplateService = require("../services/Template");

exports.sendSand = async (req: any, res: Response) => {
  const data = req?.body;
  const userId = req.apiKey;
  // content, to, customUser
  const { customUser } = data;
  const user = await UserService.getUserByApiKey(userId);
  if (!user) return res.status(403).send({ message: "Forbidden" });
  if (customUser && !user.configged) {
    return res
      .status(400)
      .send(utils.responseBody("You have not set up for custom email user"));
  }
  const emailCred = customUser
    ? {
        ...user.appConfig,
        appPassword: utils.cryptConfig(user.appConfig.appPassword, false),
      }
    : APP_DEFAULT_USER;
  const send = await sendEmail(
    data.from,
    data.content,
    data.title,
    data.to,
    emailCred
  );
  SandService.createSand({
    userID: user.userID,
    from: data.from,
    to: data.to,
    content: data.content,
    title: data.title,
  });
  return res.status(200).send(utils.responseBody("OK", send));
};
exports.sendTemplatedSand = async (req: any, res: Response) => {
  const data = req?.body;
  const userId = req.apiKey;
  const templateKey = req.params.templateKey;
  // content, to, customUser
  const { customUser } = data;
  const user = await UserService.getUserByApiKey(userId);
  if (!user) return res.status(403).send({ message: "Forbidden" });
  if (customUser && !user.configged) {
    return res
      .status(400)
      .send(utils.responseBody("You have not set up for custom email user"));
  }
  const emailCred = customUser
    ? {
        ...user.appConfig,
        appPassword: utils.cryptConfig(user.appConfig.appPassword, false),
      }
    : APP_DEFAULT_USER;
  var templates = await TemplateService.getTemplate(templateKey, user.userID);
  if (!templates) return res.status(404).send({ message: "Not found" });
  const templateContent = templates.templateContent;
  const previewedHtml = utils.replacePlaceholders(templateContent, data);
  if (!previewedHtml.status)
    return res.send(400).send({ message: previewedHtml.message });
  const send = await sendEmail(
    data.from,
    data.title,
    previewedHtml.content,
    data.to,
    emailCred
  );
  SandService.createSand({
    userID: user.userID,
    from: data.from,
    to: data.to,
    content: previewedHtml.content,
    title: data.title,
  });
  return res.status(200).send(utils.responseBody("OK", send));
};

exports.getAllSand = async (req: Request, res: Response) => {
  const sand = await SandService.getAllSand();
  res.send(sand);
};
