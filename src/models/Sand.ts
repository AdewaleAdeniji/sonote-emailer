import mongoose from "mongoose";
const Schema = mongoose.Schema;

const sandSchema = new Schema({
  userID: {
    type: String,
    default: "",
  },
  to: String,
  from: String,
  content: String,
  title: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
exports.sands = sandSchema;
module.exports = mongoose.model("sands", sandSchema);
