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
exports.remUser = exports.updateUser = void 0;
const async_helper_1 = require("../helper/async.helper");
const use_model_1 = __importDefault(require("../model/use.model"));
const error_helper_1 = __importDefault(require("../helper/error.helper"));
// update user
exports.updateUser = (0, async_helper_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const { name, email, password } = req.body;
    const user = yield use_model_1.default.findOne({ _id: id });
    if (!user)
        throw new error_helper_1.default("user doesnot exists", 404);
    if (name)
        user.name = name;
    if (email)
        user.email = email;
    if (password)
        user.password = password;
    user.save();
    res.status(200).json({
        message: "user successfully updated",
        data: user,
        status: "success",
        success: true,
    });
}));
// remove user
exports.remUser = (0, async_helper_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const user = yield use_model_1.default.findOneAndDelete({ _id: id });
    res.status(200).json({
        message: "user successfully removed",
        data: user,
        status: "success",
        success: true,
    });
}));
