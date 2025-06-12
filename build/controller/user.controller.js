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
exports.delUser = exports.updateUser = void 0;
const asyncFn_helper_1 = require("../helper/asyncFn.helper");
const user_model_1 = __importDefault(require("../model/user.model"));
const error_helper_1 = require("../helper/error.helper");
// update user
exports.updateUser = (0, asyncFn_helper_1.asyncHelper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { id } = req.user;
    const user = yield user_model_1.default.findOne({ _id: id });
    if (!user)
        throw new error_helper_1.errorHelper("user does not exists", 406);
    if (data.full_name)
        user.full_name = data.full_name;
    if (data.email)
        user.email = data.email;
    if (data.password)
        user.password = data.password;
    user.save();
    res.status(200).json({
        message: "user successfully updated",
        data: user,
    });
}));
// remove user
exports.delUser = (0, asyncFn_helper_1.asyncHelper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const user = yield user_model_1.default.findOneAndDelete({ _id: id });
    if (!user) {
        throw new error_helper_1.errorHelper("user does not exists", 406);
    }
    res.status(200).json({
        message: "user successfully deleted",
        data: user,
    });
}));
