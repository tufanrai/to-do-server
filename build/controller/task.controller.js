"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remTask = exports.updTask = exports.redByIdTask = exports.readTask = exports.createTask = void 0;
const async_helper_1 = require("../helper/async.helper");
const error_helper_1 = __importDefault(require("../helper/error.helper"));
const task_model_1 = __importDefault(require("../model/task.model"));
// create task
exports.createTask = (0, async_helper_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const { title, discription } = req.body;
    if (!title) {
        throw new error_helper_1.default("please enter the title of your task", 406);
    }
    const task = yield task_model_1.default.create({
        user: id,
        title,
        discription,
    });
    res.status(200).json({
        message: "task successfully created",
        data: task,
        status: "success",
        success: true,
    });
}));
// read task
exports.readTask = (0, async_helper_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const task = yield task_model_1.default.find({ user: id });
    if (!task) {
        throw new error_helper_1.default("no any task to display", 404);
    }
    res.status(200).json({
        message: "task found successfully",
        status: "success",
        data: task,
        success: true,
    });
}));
// get task by id
exports.redByIdTask = (0, async_helper_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const { _id } = req.body;
    if (!_id) {
        throw new error_helper_1.default("please enter the task id", 406);
    }
    const task = yield task_model_1.default.findOne({ _id, user: id });
    if (!task) {
        throw new error_helper_1.default("task doen not exist", 404);
    }
}));
// update task
exports.updTask = (0, async_helper_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const { _id, title, discription } = req.body;
    const task = yield task_model_1.default.findOne({ _id, user: id });
    if (!task)
        throw new error_helper_1.default("task not founc", 406);
    if (title)
        task.title = title;
    if (discription)
        task.discription = discription;
    task.save();
    res.status(200).json({
        message: "task updated successfully",
        data: task,
        status: "success",
        success: true,
    });
}));
// remove task
exports.remTask = (0, async_helper_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const { _id } = req.body;
    const task = yield task_model_1.default.findOneAndDelete({ _id, user: id });
    res.status(200).json({
        message: "task removed successfully",
        data: task,
        status: "success",
        success: true,
    });
}));
