import { Router } from "express";
const router = Router();
import userController from "../controllers/user.controller.js";

router.post("/register", userController.registration);

export default router;
