"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    full_name: {
        type: String,
        required: [true, "please enter your full name"],
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
    },
    password: {
        type: String,
        required: [true, "please enter your password"],
        min: [6, "your password must have at least 6 characters"],
    },
});
const User = mongoose_1.default.model("user", userSchema);
exports.default = User;
