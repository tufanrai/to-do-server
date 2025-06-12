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
exports.logUser = exports.createAccount = void 0;
const asyncFn_helper_1 = require("../helper/asyncFn.helper");
const error_helper_1 = require("../helper/error.helper");
const hash_helper_1 = require("../helper/hash.helper");
const user_model_1 = __importDefault(require("../model/user.model"));
const jwt_helper_1 = require("../helper/jwt.helper");
// create user account
exports.createAccount = (0, asyncFn_helper_1.asyncHelper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { password } = _a, data = __rest(_a, ["password"]);
    if (!password || !data) {
        throw new error_helper_1.errorHelper("please enter all the required data", 406);
    }
    const pass = yield (0, hash_helper_1.hashPass)(password);
    const user = yield user_model_1.default.create(Object.assign({ password: pass }, data));
    if (!user) {
        throw new error_helper_1.errorHelper("user with this email already exists", 406);
    }
    res.status(200).json({
        message: "account successfully created",
        data: user,
    });
}));
// log user
exports.logUser = (0, asyncFn_helper_1.asyncHelper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email)
        throw new error_helper_1.errorHelper("please enter the email", 406);
    if (!password)
        throw new error_helper_1.errorHelper("please enter your password", 406);
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new error_helper_1.errorHelper("user with this email does not exists", 406);
    }
    const pass = (0, hash_helper_1.verifyPass)(password, user.password);
    if (!pass) {
        throw new error_helper_1.errorHelper("either your password or email is incorrect", 406);
    }
    const token = yield (0, jwt_helper_1.GenToken)({
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        password: user.password,
    });
    res.status(200).json({
        message: "user successfully loged in",
        data: user,
        access_token: token,
    });
}));
