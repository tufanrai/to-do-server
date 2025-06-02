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

router.post("/", authMiddlware, createTask);
router.get("/", authMiddlware, readTask);
router.get("/:id", authMiddlware, redByIdTask);
router.put("/", authMiddlware, updTask);
router.delete("/", authMiddlware, remTask);

export default router;
