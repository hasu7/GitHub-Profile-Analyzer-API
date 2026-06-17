import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const github = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json"
    }
});

export default github;