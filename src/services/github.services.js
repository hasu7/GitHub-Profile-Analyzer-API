import github from "../config/github.js";

export const getGithubProfile = async (username) => {

    const response = await github.get(`/users/${username}`);

    return response.data;
};