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
exports.deleteToDo = exports.updateToDo = exports.readToDo = exports.addToDo = void 0;
const error_helper_1 = require("../helper/error.helper");
const list_model_1 = __importDefault(require("../model/list.model"));
const asyncFn_helper_1 = require("../helper/asyncFn.helper");
// create new to do task
exports.addToDo = (0, asyncFn_helper_1.asyncHelper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { id } = req.user;
    if (!data) {
        throw new error_helper_1.errorHelper("please enter all  the required inputs", 406);
    }
    const toDo = yield list_model_1.default.create(Object.assign({ user: id }, data));
    res.status(200).json({
        message: "task added successfully",
        data: toDo,
    });
}));
// read all to do task
exports.readToDo = (0, asyncFn_helper_1.asyncHelper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const toDos = yield list_model_1.default.find({ user: id }).sort({ createdAt: -1 });
    if (!toDos) {
        throw new error_helper_1.errorHelper("no any task to be displayed", 404);
    }
    res.status(200).json({
        message: "data fatched",
        data: toDos,
    });
}));
// update todo task
exports.updateToDo = (0, asyncFn_helper_1.asyncHelper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params;
    const { title, description } = req.body;
    if (!id) {
        throw new error_helper_1.errorHelper("please enter the todo id", 406);
    }
    const todo = yield list_model_1.default.findOne({ _id: id });
    if (!todo) {
        throw new error_helper_1.errorHelper("todo not found", 404);
    }
    if (title)
        todo.title = title;
    todo.save();
    res.status(200).json({
        message: "todo successfully updated",
        data: todo,
    });
}));
// delete todo task
exports.deleteToDo = (0, asyncFn_helper_1.asyncHelper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        throw new error_helper_1.errorHelper("todo not found", 404);
    const todo = yield list_model_1.default.findOneAndDelete({ _id: id });
    res.status(200).json({
        message: "todo task successfully deleted",
        data: todo,
    });
}));
