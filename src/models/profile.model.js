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
            github_updated
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        profile.created_at,
        profile.updated_at
    ];

    const [result] = await pool.execute(query, values);

    return result;
};