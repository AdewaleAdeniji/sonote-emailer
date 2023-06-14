import mongoose from "mongoose";
const Schema = mongoose.Schema;

const templateSchema = new Schema(
  {
    userID: {
      type: String,
      default: "",
      immutable: true,
    },
    templateKey: {
      type: String,
      default: "",
      immutable: true,
    },
    templateName: String,
    templateVars: Array,
    templateContent: String,
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);
exports.templates = templateSchema;
module.exports = mongoose.model("templates", templateSchema);
