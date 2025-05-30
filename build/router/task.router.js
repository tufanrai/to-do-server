"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controller_1 = require("../controller/task.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post("/task", auth_middleware_1.authMiddlware, task_controller_1.createTask);
router.get("/task", auth_middleware_1.authMiddlware, task_controller_1.readTask);
router.get("/task/:id", auth_middleware_1.authMiddlware, task_controller_1.redByIdTask);
router.put("/task", auth_middleware_1.authMiddlware, task_controller_1.updTask);
router.delete("/task", auth_middleware_1.authMiddlware, task_controller_1.remTask);
exports.default = router;
