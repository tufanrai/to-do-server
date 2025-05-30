import express from "express";
import { logUser, signup } from "../controller/auth.controller";
import { remUser, updateUser } from "../controller/user.controller";

const router = express.Router();

router.post("/register", signup);
router.post("/login", logUser);
router.put("/user", updateUser);
router.delete("/user", remUser);

export default router;
