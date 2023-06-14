const TemplateModel = require("../models/Templates");

exports.getAllTemplates = async () => {
  return await TemplateModel.find();
};

exports.createTemplate = async (template: any) => {
  return await TemplateModel.create(template);
};
exports.getTemplate = async (templateKey: string, userId: string) => {
  return await TemplateModel.findOne({
    templateKey: templateKey,
    userID: userId,
  });
};
exports.getAllUserTemplates = async (userId: string) => {
  return await TemplateModel.find({
    userID: userId,
  });
};
exports.updateTemplate = async (id: string, template: any) => {
  return await TemplateModel.findByIdAndUpdate(id, template);
};
