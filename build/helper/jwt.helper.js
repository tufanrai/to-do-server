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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.GenToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET_KEY = (_a = process.env.JWT_SECRET_KEY) !== null && _a !== void 0 ? _a : "";
const JWT_EXPIRY_DATE = process.env.JWT_EXPIRY_DATE;
// gen token
const GenToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield jsonwebtoken_1.default.sign(user, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRY_DATE,
    });
    return token;
});
exports.GenToken = GenToken;
// verify token
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, JWT_SECRET_KEY);
};
exports.verifyToken = verifyToken;
