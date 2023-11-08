import express from "express";
import cors from "cors";
import pkg from "pg";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

// Generate a salt
const salt = bcrypt.genSaltSync(10);
const password = "Typemaster";
// Hash the password
const hashedPassword = bcrypt.hashSync(password, salt);
// Compare the stored hashed password with the input password
const isMatch = bcrypt.compareSync(password, hashedPassword);
if (isMatch) {
  //console.log("Login successful");
} else {
  console.log("Invalid password");
}

const { Pool } = pkg;
const app = express();
const port = 3000;

//middlewares
app.use(cors());
app.use(bodyParser.json());

// Configure the PostgreSQL connection
const pool = new Pool({
  user: "alexanderhergert",
  host: "localhost",
  database: "webdevjobs",
  password: "1234",
  port: 5432, // or your PostgreSQL port
});

// fetch all jobs for Homepage
app.get("/", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM jobs");
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// fetch filtered jobs for Homepage
app.get("/jobs", async (req, res) => {
  console.log(req.query);
  try {
    const { searchTerm, location, contract } = req.query;
    const client = await pool.connect();

    let query = "SELECT * FROM jobs WHERE 1 = 1";
    const queryParams = [];

    query +=
      " AND (position ILIKE '%' || $1 || '%' OR company ILIKE '%' || $1 || '%' OR description ILIKE '%' || $1 || '%' OR requirements ILIKE '%' || $1 || '%' OR job_role ILIKE '%' || $1 || '%' OR requirements_list ILIKE '%' || $1 || '%' OR job_role_list ILIKE '%' || $1 || '%')";
    queryParams.push(searchTerm || "");

    query += " AND location ILIKE '%' || $2 || '%'";
    queryParams.push(location || "");

    if (contract === "true") {
      query += " AND contract = $3";
      queryParams.push("Full Time");
    }

    const result = await client.query(query, queryParams);
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// fetch single job for InnerJobPage
app.get("/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM jobs WHERE job_id = $1", [
      jobId,
    ]);
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.post("/users", async (req, res) => {
//   console.log(req.body);
//   const { user_id, nickname, name } = req.body;
//   try {
//     // Logic for writing user data to the database
//     const client = await pool.connect();
//     await client.query(
//       "INSERT INTO users (user_id, nickname, name) VALUES ($1, $2, $3)",
//       [user_id, nickname, name]
//     );
//     client.release();
//     res.status(200).json({ message: "User created successfully!" });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
