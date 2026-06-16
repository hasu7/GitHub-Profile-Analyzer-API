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

export const analyzeProfile = async (req, res) => {

    try {

        const { username } = req.body;

        if (!username) {
            return res.status(400).json({
                success: false,
                message: "Username is required"
            });
        }

        const exists = await profileExists(username);

        const profile = await getGithubProfile(username);
        const repoAnalysis = await analyzeRepos(username);

        const score =
            (profile.followers * 3) +
            (repoAnalysis.totalStars * 2) +
            (profile.public_repos * 1) +
            (repoAnalysis.totalForks * 1);

        profile.totalRepos = repoAnalysis.totalRepos;
        profile.totalStars = repoAnalysis.totalStars;
        profile.totalForks = repoAnalysis.totalForks;
        profile.mostUsedLanguage = repoAnalysis.mostUsedLanguage;
        profile.mostStarredRepo = repoAnalysis.mostStarredRepo;
        profile.score = score;

        await saveProfile(profile);

        return res.status(201).json({
            success: true,
            message: exists
                ? "Profile updated successfully"
                : "Profile analyzed successfully",
            profile
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const fetchProfiles = async (req, res) => {

    try {

        const profiles = await getAllProfiles();

        return res.json({
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

        return res.json({
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