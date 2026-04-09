import pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;

const isProduction = process.env.ENVIRONMENT === "production";

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: isProduction ? { rejectUnauthorized: false } : false,
      }
    : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME || "webdevjobs",
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT) || 5432,
        ssl: isProduction ? { rejectUnauthorized: false } : false,
      },
);

export default pool;
