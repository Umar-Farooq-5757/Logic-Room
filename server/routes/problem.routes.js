import { Router } from "express";
const router = Router();
import protect from "../middlewares/auth.js";
import problemController from "../controllers/problem.controller.js";

router.post("/createproblem", protect, problemController.createProblem);
router.get("/getallproblems", protect, problemController.getAllProblems);

export default router;
