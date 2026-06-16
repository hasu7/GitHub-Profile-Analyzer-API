import {
    getGithubProfile
} from "../services/github.service.js";

import {
    saveProfile,
    profileExists,
    getAllProfiles,
    getProfileByUsername
} from "../models/profile.model.js";

import { analyzeRepos } from "../services/analysis.service.js";

// 1. Analyze + Save Profile
export const analyzeProfile = async (req, res) => {

    try {

        const { username } = req.body;

        if (!username) {
            return res.status(400).json({
                success: false,
                message: "Username is required"
            });
        }

        // check duplicate
        const exists = await profileExists(username);

        if (exists) {
            return res.status(409).json({
                success: false,
                message: "Profile already analyzed"
            });
        }

        // fetch from GitHub
        const profile = await getGithubProfile(username);
        const repoAnalysis = await analyzeRepos(username);

        // save to DB
        await saveProfile({
    ...profile,
    ...repoAnalysis
});

        return res.status(201).json({
            success: true,
            message: "Profile analyzed successfully",
            profile
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// 2. Get all profiles
export const fetchProfiles = async (req, res) => {

    try {

        const profiles = await getAllProfiles();

        return res.status(200).json({
            success: true,
            count: profiles.length,
            profiles
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// 3. Get single profile by username
export const fetchSingleProfile = async (req, res) => {

    try {

        const { username } = req.params;

        const profile = await getProfileByUsername(username);

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }

        return res.status(200).json({
            success: true,
            profile
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};