import express from "express";
import { analyzeProfile } from "../controllers/github.controller.js";

const router = express.Router();

router.post("/analyze", analyzeProfile);

export default router;