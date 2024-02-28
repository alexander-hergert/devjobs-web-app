import express from "express";
const publicRouter = express.Router();
import pool from "../config/configDB.js";

//ping for keep server awake
publicRouter.get("/ping", () => {
  console.log(`ping at ${new Date()}`);
});

//logout
publicRouter.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.clearCookie("connect.sid");
    res.status(200).send("logged out");
  });
});

// fetch filtered jobs for Homepage
publicRouter.get("/jobs", async (req, res) => {
  const page = req.query.page || 1;
  const pageSize = 12;
  const limit = pageSize * page;
  try {
    const { searchTerm, location, contract } = req.query;
    const client = await pool.connect();

    //two queries one does fetch the limited amount depending on page and one all hits
    let query = "SELECT * FROM jobs WHERE 1 = 1";
    let queryAll = "SELECT * FROM jobs WHERE 1 = 1";
    const queryParams = [];
    const queryParamsAll = [];

    query +=
      " AND (position ILIKE '%' || $1 || '%' OR company ILIKE '%' || $1 || '%' OR description ILIKE '%' || $1 || '%' OR requirements ILIKE '%' || $1 || '%' OR job_role ILIKE '%' || $1 || '%' OR requirements_list ILIKE '%' || $1 || '%' OR job_role_list ILIKE '%' || $1 || '%')";
    queryParams.push(searchTerm || "");

    queryAll +=
      " AND (position ILIKE '%' || $1 || '%' OR company ILIKE '%' || $1 || '%' OR description ILIKE '%' || $1 || '%' OR requirements ILIKE '%' || $1 || '%' OR job_role ILIKE '%' || $1 || '%' OR requirements_list ILIKE '%' || $1 || '%' OR job_role_list ILIKE '%' || $1 || '%')";
    queryParamsAll.push(searchTerm || "");

    query += " AND location ILIKE '%' || $2 || '%'";
    queryParams.push(location || "");

    queryAll += " AND location ILIKE '%' || $2 || '%'";
    queryParamsAll.push(location || "");

    if (contract === "true") {
      query += " AND contract = $3";
      queryParams.push("Full Time");

      queryAll += " AND contract = $3";
      queryParamsAll.push("Full Time");
    }

    if (contract === "true") {
      query += " ORDER BY job_id LIMIT $4";
      queryParams.push(limit);
    } else {
      query += " ORDER BY job_id LIMIT $3";
      queryParams.push(limit);
    }

    const result = await client.query(query, queryParams);
    const resultAll = await client.query(queryAll, queryParamsAll);
    const jobs = [result.rows, resultAll.rows.length];
    res.status(200).json(jobs);
    client.release();
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// fetch single job for InnerJobPage
publicRouter.get("/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM jobs WHERE job_id = $1", [
      jobId,
    ]);
    res.status(200).json(result.rows);
    client.release();
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default publicRouter;
