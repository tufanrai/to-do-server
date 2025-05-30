"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    discription: {
        type: String,
    },
    user: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
    },
}, { timestamps: true });
const Task = mongoose_1.default.model("task", taskSchema);
exports.default = Task;
