import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  user: "alexanderhergert",
  host: "localhost",
  database: "webdevjobs",
  password: "1234",
  port: 5432, // or your PostgreSQL port
});

export default pool;
