import express from 'express'
import { Router } from "express";
import helmet from 'helmet'
import rateLimit from 'express-rate-limit';
import submissionController from "../controllers/submission.controller.js";
import protect from '../middlewares/auth.js'
const router = Router();

router.use(express.json({ limit: "500kb" }));
router.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200, // requests per IP per window
});
router.use(limiter);

router.post('/submit', protect, submissionController.submit);
router.get('/check-result/:token', protect, submissionController.checkResult);
router.get('/poll/:token', protect, submissionController.poll);
// Alternative method (run)
router.post('/run', protect, submissionController.runCode);
router.get("/health", protect, submissionController.checkHealth);
router.post('/create-submission',protect,submissionController.createSubmission)

export default router;
