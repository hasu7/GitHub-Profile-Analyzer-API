import express from "express";
import {
    analyzeProfile,
    fetchProfiles,
    fetchSingleProfile
} from "../controllers/github.controller.js";

const router = express.Router();

router.post("/analyze", analyzeProfile);
router.get("/profiles", fetchProfiles);
router.get("/profiles/:username", fetchSingleProfile);

export default router;