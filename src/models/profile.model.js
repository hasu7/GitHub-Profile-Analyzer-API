import pool from "../config/db.js";

export const saveProfile = async (profile) => {

    const query = `
        INSERT INTO github_profiles
        (
            github_id,
            username,
            name,
            bio,
            avatar_url,
            profile_url,
            company,
            location,

            public_repos,
            followers,
            following,
            public_gists,

            account_created,
            github_updated,

            total_repos,
            total_stars,
            total_forks,
            most_used_language,
            most_starred_repo
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        profile.id,
        profile.login,
        profile.name,
        profile.bio,
        profile.avatar_url,
        profile.html_url,
        profile.company,
        profile.location,

        profile.public_repos,
        profile.followers,
        profile.following,
        profile.public_gists,

        // date fix already handled earlier
        profile.created_at.replace("T", " ").replace("Z", ""),
        profile.updated_at.replace("T", " ").replace("Z", ""),

        profile.totalRepos || 0,
        profile.totalStars || 0,
        profile.totalForks || 0,
        profile.mostUsedLanguage || null,
        profile.mostStarredRepo || null
    ];

    const [result] = await pool.execute(query, values);

    return result;
};

export const getAllProfiles = async () => {

    const [rows] = await pool.query(
        "SELECT * FROM github_profiles ORDER BY analyzed_at DESC"
    );

    return rows;
};

export const getProfileByUsername = async (username) => {

    const [rows] = await pool.execute(
        "SELECT * FROM github_profiles WHERE username = ?",
        [username]
    );

    return rows[0];
};

export const profileExists = async (username) => {

    const [rows] = await pool.execute(
        "SELECT id FROM github_profiles WHERE username = ?",
        [username]
    );

    return rows.length > 0;
};