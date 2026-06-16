import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  uri: process.env.DATABASE_UR,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ MySQL Connected!");
    conn.release();
  } catch (err) {
    console.error("❌ Database connection failed");
    console.error(err);
  }
})();

export default pool;