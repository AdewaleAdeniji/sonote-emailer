const UserModel = require("../models/User");
 
exports.getAllUsers = async () => {
  return await UserModel.find();
};
 
exports.createUser = async (user: string) => {
  return await UserModel.create(user);
};
exports.getUserById = async (id: string) => {
  return await UserModel.findById(id);
};
exports.getUserByApiKey = async (id: string) => {
    return await UserModel.findOne({
        apiKey: id
    });
  };
exports.getUserByUserId = async (id: string) => {
  return await UserModel.findOne({
      userID: id
  });
};
exports.getUserByEmail = async (email: string) => {
  return await UserModel.findOne({
    "email": email
  });
};
 
exports.updateUser = async (id: string, user: string) => {
  return await UserModel.findByIdAndUpdate(id, user);
};
 
exports.deleteUser = async (id: string) => {
  return await UserModel.findByIdAndDelete(id);
};