import { Router } from "express";
const router = Router();
import protect from "../middlewares/auth.js";
import problemController from "../controllers/problem.controller.js";

router.post("/createproblem", protect, problemController.createProblem);
router.get("/getallproblems", protect, problemController.getAllProblems);
router.get("/getproblem/:slug", protect, problemController.getProblem);

export default router;
