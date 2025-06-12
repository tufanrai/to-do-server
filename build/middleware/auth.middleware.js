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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
const error_helper_1 = require("../helper/error.helper");
const jwt_helper_1 = require("../helper/jwt.helper");
const AuthUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new error_helper_1.errorHelper("no authorization", 401);
        }
        if (authHeader.length != 2 && !authHeader.startsWith("BEARER")) {
            throw new error_helper_1.errorHelper("no bearer", 401);
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new error_helper_1.errorHelper("no token", 401);
        }
        const verifiedToken = yield (0, jwt_helper_1.verifyToken)(token);
        if (!verifiedToken) {
            throw new error_helper_1.errorHelper("no verified", 401);
        }
        if (verifiedToken.exp && verifiedToken.exp * 1000 < Date.now()) {
            throw new error_helper_1.errorHelper("token expired please login again", 406);
        }
        req.user = {
            id: verifiedToken.id,
            full_name: verifiedToken.full_name,
            email: verifiedToken.email,
            password: verifiedToken.password,
        };
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.AuthUser = AuthUser;
