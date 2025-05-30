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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logUser = exports.signup = void 0;
const async_helper_1 = require("../helper/async.helper");
const error_helper_1 = __importDefault(require("../helper/error.helper"));
const bcrypt_helper_1 = require("../helper/bcrypt.helper");
const use_model_1 = __importDefault(require("../model/use.model"));
const jwt_helper_1 = require("../helper/jwt.helper");
// register new user
exports.signup = (0, async_helper_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { password } = _a, data = __rest(_a, ["password"]);
    if (!password) {
        throw new error_helper_1.default("please enter the password", 406);
    }
    if (!data) {
        throw new error_helper_1.default("please enter all the required datas", 406);
    }
    const haspass = yield (0, bcrypt_helper_1.hashPassword)(password);
    const user = yield use_model_1.default.create(Object.assign({ password: haspass }, data));
    res.status(200).json({
        message: "user created successfully",
        data: user,
        status: "success",
        success: true,
    });
}));
// login user
exports.logUser = (0, async_helper_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email) {
        throw new error_helper_1.default("please enter email", 406);
    }
    if (!password) {
        throw new error_helper_1.default("please enter password", 406);
    }
    const user = yield use_model_1.default.findOne({ email });
    if (!user) {
        throw new error_helper_1.default("user doesnot exists", 404);
    }
    const authPass = yield (0, bcrypt_helper_1.veriPassword)(password, user.password);
    if (!authPass) {
        throw new error_helper_1.default("email or password is incorrect", 406);
    }
    const token = yield (0, jwt_helper_1.genToken)({
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
    });
    res.status(200).json({
        message: "successfully loged in",
        data: user,
        status: "success",
        success: true,
        acess_token: token,
    });
}));
