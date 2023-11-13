import express from "express";
import cors from "cors";
import pkg from "pg";
import bodyParser from "body-parser";
import { authorize } from "./auth/oauth.js";

const { Pool } = pkg;
const app = express();
const port = 3000;

//middlewares
app.use(cors());
app.use(bodyParser.json());

app.get("/test", async (req, res) => {
  const userInfo = await authorize(req);
  res.json(userInfo);
});

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

//fetch user data
app.get("/user", async (req, res) => {
  const userInfo = await authorize(req);
  if (userInfo) {
    const user_id = userInfo.sub;
    try {
      const client = await pool.connect();
      const result = await client.query(
        "SELECT * FROM users WHERE user_id = $1",
        [user_id]
      );
      res.json(result.rows);
      client.release();
    } catch (err) {
      console.error("Error executing query", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// fetch users applied jobs
app.get("/appliedJobs", async (req, res) => {
  const userInfo = await authorize(req);
  if (userInfo) {
    const user_id = userInfo.sub;
    try {
      const client = await pool.connect();
      const resultApps = await client.query(
        "SELECT * FROM applications WHERE user_id = $1",
        [user_id]
      );
      const jobsIds = resultApps.rows.map((row) => row.job_id);
      const resultJobs = await client.query(
        //find jobs with all jobsIds
        `SELECT * FROM jobs WHERE job_id IN (${jobsIds.join(",")})`
      );
      res.json({ appliedJobs: resultJobs.rows, applications: resultApps.rows });
      client.release();
    } catch (err) {
      console.error("Error executing query", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
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

app.post("/createuser", async (req, res) => {
  console.log(req.body);
  const { email, role, fullname, address, location, skills, user_website } =
    req.body;
  const userInfo = await authorize(req);
  if (userInfo) {
    const user_id = userInfo.sub;
    const picture = userInfo.picture;
    try {
      const client = await pool.connect();
      await client.query(
        "INSERT INTO users (user_id, role, email, fullname, picture, address, location, skills, user_website) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [
          user_id,
          role,
          email,
          fullname,
          picture,
          address,
          location,
          skills,
          user_website,
        ]
      );
      const result = await client.query(
        "SELECT * FROM users WHERE user_id = $1",
        [user_id]
      );
      res.json(result.rows);
      client.release();
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

//send application
app.post("/apply", async (req, res) => {
  console.log(req.body);
  const { job_id, content } = req.body;
  const userInfo = await authorize(req);
  if (userInfo) {
    const user_id = userInfo.sub;
    try {
      const client = await pool.connect();
      //test if use ralready applied
      const result = await client.query(
        "SELECT * FROM applications WHERE user_id = $1 AND job_id = $2",
        [user_id, Number(job_id)]
      );
      if (result.rows.length > 0) {
        res.status(400).json({ error: "Already applied" });
        return;
      }
      await client.query(
        "INSERT INTO applications (user_id, job_id, content) VALUES ($1, $2, $3)",
        [user_id, Number(job_id), content]
      );
      client.release();
    } catch (error) {
      console.error("Error sending application:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.put("/user", async (req, res) => {
  console.log(req.body);
  const { email, fullname, address, location, skills, user_website } = req.body;
  const userInfo = await authorize(req);
  if (userInfo) {
    const user_id = userInfo.sub;
    try {
      const client = await pool.connect();
      await client.query(
        "UPDATE users SET email = $2, fullname = $3, address = $4, location = $5, skills = $6, user_website = $7 WHERE user_id = $1",
        [user_id, email, fullname, address, location, skills, user_website]
      );
      const result = await client.query(
        "SELECT * FROM users WHERE user_id = $1",
        [user_id]
      );
      res.json(result.rows);
      client.release();
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.delete("/application", async (req, res) => {

});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
