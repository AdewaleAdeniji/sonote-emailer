import mongoose from "mongoose";
const Schema = mongoose.Schema;

const templateSchema = new Schema({
    userID: {
        type: String,
        default: ''
    },
    templateKey: String,
    templateName: String,
    templateVars: Array,
    templateContent: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})
exports.templates = templateSchema;
module.exports = mongoose.model("templates", templateSchema);
