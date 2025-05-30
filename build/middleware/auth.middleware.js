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
exports.authMiddlware = void 0;
const error_helper_1 = __importDefault(require("../helper/error.helper"));
const jwt_helper_1 = require("../helper/jwt.helper");
const use_model_1 = __importDefault(require("../model/use.model"));
const authMiddlware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            throw new error_helper_1.default("unauthorize access, access denied", 406);
        }
        if (authHeader && authHeader.split(" ")[0] !== "BEARER") {
            throw new error_helper_1.default("access denied", 406);
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new error_helper_1.default("access denied", 406);
        }
        const verify = yield (0, jwt_helper_1.veriToken)(token);
        if (!verify) {
            throw new error_helper_1.default("access denied", 406);
        }
        const expiryDate = verify.exp;
        if (!expiryDate) {
            throw new error_helper_1.default("access denied", 406);
        }
        if (expiryDate / 1000 > Date.now() / 1000) {
            throw new error_helper_1.default("token expired please login again", 406);
        }
        const user = yield use_model_1.default.findOne({ _id: verify.id });
        if (!user) {
            throw new error_helper_1.default("access denied", 406);
        }
        req.user = {
            id: verify.id,
            name: verify.name,
            email: verify.email,
            password: verify.password,
        };
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.authMiddlware = authMiddlware;
