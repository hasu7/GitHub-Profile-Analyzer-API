import express from "express";

import {
    analyzeProfile,
    fetchProfiles,
    fetchSingleProfile
} from "../controllers/github.controller.js";

const router = express.Router();

// Analyze and store a GitHub profile
router.post("/analyze", analyzeProfile);

// Get all analyzed profiles
router.get("/profiles", fetchProfiles);

// Get a single analyzed profile
router.get("/profiles/:username", fetchSingleProfile);

export default router;