📄 GitHub Profile Analyzer API

A backend service that fetches GitHub user data using the GitHub API, analyzes repository statistics, and stores structured insights in a MySQL database.

It exposes REST APIs to analyze users, retrieve stored profiles, and fetch individual profile details.

🚀 Tech Stack
Node.js
Express.js
MySQL
Axios
GitHub REST API
📌 Features
Fetch GitHub user profile using username
Fetch and analyze repositories
Compute insights:
Total repositories
Total stars
Total forks
Most used language
Most starred repository
Custom developer score
Store analyzed data in MySQL
Prevent duplicate entries using upsert logic
Retrieve all stored profiles
Retrieve single profile by username
📂 Project Structure
src/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── github.controller.js
│
├── models/
│   └── profile.model.js
│
├── routes/
│   └── github.routes.js
│
├── services/
│   ├── github.service.js
│   └── analysis.service.js
│
└── app.js

server.js
⚙️ Installation & Setup
1. Clone repository
git clone [<your-repo-link>](https://github.com/hasu7/GitHub-Profile-Analyzer-API.git)
cd github-profile-analyzer
2. Install dependencies
npm install
3. Setup environment variables

Create a .env file:

PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=github_analyzer

GITHUB_TOKEN=your_github_personal_access_token
4. Setup MySQL Database

Create database:

CREATE DATABASE github_analyzer;

Run this table schema:

CREATE TABLE github_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    github_id INT,
    username VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    bio TEXT,
    avatar_url TEXT,
    profile_url TEXT,
    company VARCHAR(255),
    location VARCHAR(255),

    public_repos INT,
    followers INT,
    following INT,
    public_gists INT,

    account_created DATETIME,
    github_updated DATETIME,

    total_repos INT DEFAULT 0,
    total_stars INT DEFAULT 0,
    total_forks INT DEFAULT 0,
    most_used_language VARCHAR(255),
    most_starred_repo VARCHAR(255),

    score INT DEFAULT 0,
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
5. Start server
npm run dev

Server runs on:

http://localhost:3000
📡 API Endpoints
🔍 Analyze GitHub Profile
POST /api/github/analyze
Request Body:
{
  "username": "torvalds"
}
Response:
{
  "success": true,
  "message": "Profile analyzed successfully",
  "profile": { }
}
📄 Get All Profiles
GET /api/github/profiles
Response:
{
  "success": true,
  "count": 10,
  "profiles": []
}
👤 Get Single Profile
GET /api/github/profiles/:username

Example:

/api/github/profiles/torvalds
🧠 Developer Score Logic

Score is calculated using:

score =
  (followers * 3)
+ (total_stars * 2)
+ (public_repos * 1)
+ (total_forks * 1)
📊 Example Workflow
Send username to /analyze
System fetches GitHub API data
Repositories are analyzed
Insights are generated
Data is stored in MySQL
Same user updates existing record instead of duplicating
Data is available via GET endpoints
🧪 Tools Used for Testing
Postman (API testing)
MySQL Workbench (database verification)
📌 Notes
GitHub API rate limits may apply
Requires valid GitHub token for higher request limits
Username is unique in database
Duplicate entries are handled using UPSERT logic
🧠 Learning Outcomes
REST API development
External API integration
Database design and normalization
Data transformation & analytics
Backend architecture structuring
📦 Author
Pankaj Kumar Jha
Built as a Node.js backend internship assignment project.