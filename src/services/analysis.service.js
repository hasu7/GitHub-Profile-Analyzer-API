import { getGithubRepos } from "./github.service.js";

export const analyzeRepos = async (username) => {

    const repos = await getGithubRepos(username);

    let totalStars = 0;
    let totalForks = 0;
    let languageMap = {};

    let mostStarredRepo = null;

    for (let repo of repos) {

        totalStars += repo.stargazers_count;
        totalForks += repo.forks_count;

        // language tracking
        if (repo.language) {
            languageMap[repo.language] =
                (languageMap[repo.language] || 0) + 1;
        }

        // most starred repo
        if (!mostStarredRepo ||
            repo.stargazers_count > mostStarredRepo.stargazers_count) {
            mostStarredRepo = repo;
        }
    }

    const mostUsedLanguage = Object.keys(languageMap).reduce((a, b) =>
        languageMap[a] > languageMap[b] ? a : b,
        null
    );

    return {
        totalRepos: repos.length,
        totalStars,
        totalForks,
        mostUsedLanguage,
        mostStarredRepo: mostStarredRepo?.name || null
    };
};