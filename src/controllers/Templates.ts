//create a template
//edit a template
// query a template
const utils = require("../utils");
import { Response } from "express";
const TemplateService = require("../services/Template");

exports.createTemplate = async (req: any, res: Response) => {
  const data = req.body;
  try {
    data.templateKey = utils.generateID();
    data.userID = req.userID;
    const template = await TemplateService.createTemplate(data);
    res.status(template ? 200 : 400).send({ data: template });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
exports.getUserTemplates = async (req: any, res: Response) => {
  const userID = req.userID;
  try {
    const templates = await TemplateService.getAllUserTemplates(userID);
    res.status(templates ? 200 : 400).send({ data: templates });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
exports.getTemplate = async (req: any, res: Response) => {
  const userID = req.userID;
  const templateKey = req.params.templateKey;
  try {
    var templates = await TemplateService.getTemplate(templateKey, userID);
    res.status(templates ? 200 : 400).send({ data: templates });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

exports.updateTemplate = async (req: any, res: Response) => {
  const userID = req.userID;
  const templateKey = req.params.templateKey;
  try {
    const data = req?.body;
    var template = await TemplateService.getTemplate(templateKey, userID);
    if (!template) return res.status(404).send({ message: "Not found" });
    const updateTemplate = await TemplateService.updateTemplate(
      template._id,
      data
    );
    if (updateTemplate) {
      template = await TemplateService.getTemplate(templateKey, userID);
    }
    res.status(updateTemplate ? 200 : 400).send({ data: template });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

exports.previewTemplate = async (req: any, res: Response) => {
  const userID = req.userID;
  const templateKey = req.params.templateKey;
  try {
    var templates = await TemplateService.getTemplate(templateKey, userID);
    if (!templates) return res.status(404).send({ message: "Not found" });
    const templateContent = templates.templateContent;
    const data = req.body;
    console.log(data);
    const previewedHtml = utils.replacePlaceholders(templateContent, data);
    res
      .status(templates ? 200 : 400)
      .send(
        previewedHtml.status ? previewedHtml.content : previewedHtml.message
      );
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
