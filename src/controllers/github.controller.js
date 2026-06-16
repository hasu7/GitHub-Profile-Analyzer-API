import { getGithubProfile } from "../services/github.services.js";
import { saveProfile } from "../models/profile.model.js";

export const analyzeProfile = async (req, res) => {

    try {

        const { username } = req.body;

        const profile = await getGithubProfile(username);

        await saveProfile(profile);

     res.status(201).json({
        success: true,
        message: "Profile analyzed successfully",
        profile
   });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};