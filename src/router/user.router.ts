import { Router } from "express";
import { createAccount, logUser } from "../controller/auth.controller";
import { AuthUser } from "../middleware/auth.middleware";
import { delUser, updateUser } from "../controller/user.controller";

const router = Router();

router.post("/register", createAccount);
router.post("/login", logUser);
router.put("/:id", AuthUser, updateUser);
router.delete("/:id", AuthUser, delUser);

export default router;
