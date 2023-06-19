const SandModel = require("../models/Sand");

exports.getAllSand = async () => {
  return await SandModel.find();
};

exports.createSand = async (sand: any) => {
  return await SandModel.create(sand);
};
