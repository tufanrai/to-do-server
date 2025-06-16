import express from "express";
import {
  addToDo,
  deleteToDo,
  readToDo,
  updateToDo,
} from "../controller/list.controller";
import { AuthUser } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", AuthUser, addToDo);
router.get("/", AuthUser, readToDo);
router.put("/update/:id", AuthUser, updateToDo);
router.delete("/:id", AuthUser, deleteToDo);

export default router;
