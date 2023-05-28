import { NextFunction, Request, Response } from "express";
const utils = require("../utils/index");



const validateUser = async (req: any, res: Response, next: NextFunction) => {
  const headers = req.headers;
  const authorization = headers.authorization;
  if (!authorization) {
    return res.status(403).send({ message: "Forbidden access, login first" });
  }
  //validate the token itself
  const val = await utils.verifyToken(authorization.split(" ")[1]);
  if (!val) {
    return res.status(403).send({ message: "Access expired, login first" });
  }
  req.userID = val.payload.userID;
  next();
};
const validateApiKey = async (req: any, res: Response, next: NextFunction) => {
  const headers = req.headers;
  const authorization = headers.authorization;
  if (!authorization) {
    return res.status(403).send({ message: "Forbidden access, login first" });
  }
  //validate the token itself
  const val = authorization.split(" ")[1];
  req.apiKey = val;
  next();
};

type Middlewares = {
    validateUser: Function,
    validateApiKey: Function,
}

export const middlewares : Middlewares = {
    validateUser, validateApiKey
}