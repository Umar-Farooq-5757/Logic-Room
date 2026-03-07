import { Router } from "express";
const router = Router();
import userController from "../controllers/user.controller.js";
import protect from "../middlewares/auth.js";

router.post("/register", userController.registration);
router.post("/login", userController.login);
router.get("/me",protect, userController.getUserData);

export default router;
