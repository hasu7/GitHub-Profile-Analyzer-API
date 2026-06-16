import github from "../config/github.js";

export const getGithubProfile = async (username) => {

    const response = await github.get(`/users/${username}`);

    return response.data;
};

export const getGithubRepos = async (username) => {

    const response = await github.get(`/users/${username}/repos?per_page=100`);

    return response.data;
};