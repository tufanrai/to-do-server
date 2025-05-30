import express from "express";
import {
  createTask,
  readTask,
  redByIdTask,
  remTask,
  updTask,
} from "../controller/task.controller";
import { authMiddlware } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/task", authMiddlware, createTask);
router.get("/task", authMiddlware, readTask);
router.get("/task/:id", authMiddlware, redByIdTask);
router.put("/task", authMiddlware, updTask);
router.delete("/task", authMiddlware, remTask);

export default router;
