const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userID: {
        type: String,
        default: ''
    },
    status: {
        type: Boolean,
        default: true,
    },
    interests: {
        type:  Array,
        default: [],
    },
    about: {
        type: Object,
        default: {}
    },
    paired: {
        type: Boolean,
        default: false,
    },
    lastLogin: {
        type: String,
        default: Date.now,
    },
    email: String,
    password: String,
    number: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})
module.exports = mongoose.model("users", userSchema);
