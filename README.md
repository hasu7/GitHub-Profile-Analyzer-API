# 🚀 GitHub Profile Analyzer API

A Node.js + Express backend system that fetches GitHub user data using the GitHub API, analyzes repository statistics, and stores structured insights in a MySQL database.

---

## 🧠 Features

- Fetch GitHub user profile using username
- Analyze repositories (stars, forks, languages)
- Compute developer score
- Store results in MySQL
- Prevent duplicate entries (UPSERT logic)
- Get all analyzed profiles
- Get single profile by username

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MySQL
- Axios
- GitHub REST API

---

## 📁 Project Structure


src/
├── config/
├── controllers/
├── models/
├── routes/
├── services/
└── app.js

server.js


---

## ⚙️ Setup Instructions

### 1. Clone repo
```bash
git clone <your-repo-url>
cd github-profile-analyzer
2. Install dependencies
npm install
3. Setup environment variables

Create .env file:

PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=github_analyzer

GITHUB_TOKEN=your_github_token
4. Create database
CREATE DATABASE github_analyzer;
5. Run server
npm run dev
📡 API Endpoints
🔍 Analyze GitHub Profile
POST /api/github/analyze

Body:

{
  "username": "torvalds"
}
📄 Get all profiles
GET /api/github/profiles
👤 Get single profile
GET /api/github/profiles/:username

Example:

/api/github/profiles/torvalds
🧮 Developer Score Formula
score =
  (followers * 3) +
  (total_stars * 2) +
  (public_repos * 1) +
  (total_forks * 1)
🧪 Testing

Use Postman to test all endpoints.

Recommended flow:

POST /analyze
GET /profiles
GET /profiles/:username
🗄️ Database Schema

Stored fields include:

GitHub ID
Username
Followers / Repos / Gists
Total Stars / Forks
Most used language
Most starred repo
Score
🚀 Notes
Requires GitHub Personal Access Token for stable API usage
Handles duplicate users using UPSERT logic
Designed for learning backend + API integration

📦 Author-Pankaj Kumar Jha

Backend assignment project – GitHub Profile Analyzer API


---

# 🚀 NOW: DEPLOY IT (REAL SIMPLE GUIDE)

We’ll do **Render + MySQL** because it’s easiest for Node apps.

---

# 🌍 STEP 1: Push to GitHub

```bash
git init
git add .
git commit -m "final backend"
git branch -M main
git remote add origin https://github.com/hasu7/GitHub-Profile-Analyzer-API.git
git push -u origin main