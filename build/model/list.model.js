"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const listSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "please enter the task to do"],
    },
    user: {
        type: mongoose_1.default.Types.ObjectId,
        required: [true, "user id is required to identify the task of the user"],
        ref: "users",
    },
});
const ToDoList = mongoose_1.default.model("todo", listSchema);
exports.default = ToDoList;
