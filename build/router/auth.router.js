"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controller/auth.controller");
const user_controller_1 = require("../controller/user.controller");
const router = express_1.default.Router();
router.post("/register", auth_controller_1.signup);
router.post("/login", auth_controller_1.logUser);
router.put("/user", user_controller_1.updateUser);
router.delete("/user", user_controller_1.remUser);
exports.default = router;
