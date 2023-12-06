import express from "express";
const companyRouter = express.Router();
import pool from "../config/configDB.js";
import { authorize } from "../auth/oauth.js";

export default companyRouter;

//create job
companyRouter.post("/createjob", async (req, res) => {
  console.log(req.body);
  const {
    position,
    color,
    location,
    contract,
    website,
    description,
    requirementsContent,
    requirementsItems,
    roleContent,
    roleItems,
  } = req.body;

  // Format requirements list to string with line breaks
  const requirements_list = requirementsItems.join("\n");
  // Format role list to string with line breaks
  const job_role_list = roleItems.join("\n");

  const userInfo = await authorize(req);
  if (userInfo) {
    const user_id = userInfo.sub;
    const logo = userInfo.picture;
    const status = true;
    const posted_at = new Date();
    try {
      const client = await pool.connect();
      //fetch company name
      const company = await client.query(
        "SELECT fullname FROM users WHERE user_id = $1",
        [user_id]
      );
      const companyName = company.rows[0].fullname;
      //insert job
      await client.query(
        "INSERT INTO jobs (user_id, logo, logo_background, status, company, position, posted_at, contract, location, description, requirements, requirements_list, job_role, job_role_list, company_website) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)",
        [
          user_id,
          logo,
          color,
          status,
          companyName,
          position,
          posted_at,
          contract,
          location,
          description,
          requirementsContent,
          requirements_list,
          roleContent,
          job_role_list,
          website,
        ]
      );
      const result = await client.query(
        "SELECT * FROM jobs WHERE user_id = $1",
        [user_id]
      );
      res.json(result.rows);
      client.release();
    } catch (error) {
      console.error("Error creating job:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

//fetch company jobs
companyRouter.get("/getCompanyJobs", async (req, res) => {
  const userInfo = await authorize(req);
  if (userInfo) {
    const user_id = userInfo.sub;
    try {
      const client = await pool.connect();
      const result = await client.query(
        "SELECT * FROM jobs WHERE user_id = $1",
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

//edit job
companyRouter.put("/editjob", async (req, res) => {
  console.log(req.body);
  const {
    job_id,
    position,
    color,
    location,
    contract,
    website,
    description,
    requirementsContent,
    requirementsItems,
    roleContent,
    roleItems,
    posted_at,
  } = req.body;

  // Format requirements list to string with line breaks
  const requirements_list = requirementsItems.join("");
  // Format role list to string with line breaks
  const job_role_list = roleItems.join("");

  const userInfo = await authorize(req);
  if (userInfo) {
    const user_id = userInfo.sub;
    const logo = userInfo.picture;
    const status = true;
    try {
      const client = await pool.connect();
      //fetch company name
      const company = await client.query(
        "SELECT fullname FROM users WHERE user_id = $1",
        [user_id]
      );
      const companyName = company.rows[0].fullname;
      //insert job
      await client.query(
        "UPDATE jobs SET logo = $2, logo_background = $3, status = $4, company = $5, position = $6, posted_at = $7, contract = $8, location = $9, description = $10, requirements = $11, requirements_list = $12, job_role = $13, job_role_list = $14, company_website = $15 WHERE job_id = $1",
        [
          job_id,
          logo,
          color,
          status,
          companyName,
          position,
          posted_at,
          contract,
          location,
          description,
          requirementsContent,
          requirements_list,
          roleContent,
          job_role_list,
          website,
        ]
      );
      const result = await client.query(
        "SELECT * FROM jobs WHERE user_id = $1 ORDER BY job_id",
        [user_id]
      );
      res.json(result.rows);
      client.release();
    } catch (error) {
      console.error("Error updating job:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

//cancel job
companyRouter.put("/canceljob", async (req, res) => {
  const { job_id } = req.body;
  const userInfo = await authorize(req);
  if (userInfo) {
    const user_id = userInfo.sub;
    try {
      const client = await pool.connect();
      await client.query("UPDATE jobs SET status = false WHERE job_id = $1", [
        job_id,
      ]);
      const result = await client.query(
        "SELECT * FROM jobs WHERE user_id = $1 ORDER BY job_id",
        [user_id]
      );
      res.json(result.rows);
      client.release();
    } catch (error) {
      console.error("Error cancelling job:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

//deletejobs
companyRouter.delete("/deletejob", async (req, res) => {
  const { job_id } = req.body;
  const userInfo = await authorize(req);
  if (userInfo) {
    const user_id = userInfo.sub;
    try {
      const client = await pool.connect();
      //delete application related to job first
      await client.query("DELETE FROM applications WHERE job_id = $1", [
        job_id,
      ]);
      //delete job
      await client.query("DELETE FROM jobs WHERE job_id = $1", [job_id]);
      const result = await client.query(
        "SELECT * FROM jobs WHERE user_id = $1 ORDER BY job_id",
        [user_id]
      );
      res.json(result.rows);
      client.release();
    } catch (error) {
      console.error("Error deleting job:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});
