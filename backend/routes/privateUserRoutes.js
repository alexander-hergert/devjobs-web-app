import express from "express";
const privateRouter = express.Router();
import pool from "../config/configDB.js";
import { authorize } from "../auth/oauth.js";

//create user
privateRouter.post("/createuser", async (req, res) => {
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

//fetch user data
privateRouter.get("/user", async (req, res) => {
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

//update user
privateRouter.put("/user", async (req, res) => {
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

//delete user
privateRouter.delete("/user", async (req, res) => {
  const userInfo = await authorize(req);
  if (userInfo) {
    const user_id = userInfo.sub;
    try {
      const client = await pool.connect();
      await client.query("DELETE FROM applications WHERE user_id = $1", [
        user_id,
      ]);
      await client.query("DELETE FROM users WHERE user_id = $1", [user_id]);
      res.json({ message: "User deleted" });
      client.release();
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// fetch users applied jobs
privateRouter.get("/appliedJobs", async (req, res) => {
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
      const resultJobs =
        jobsIds.length > 0
          ? await client.query(
              `SELECT * FROM jobs WHERE job_id IN (${jobsIds.join(",")})`
            )
          : { rows: [] };

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

//send application
privateRouter.post("/apply", async (req, res) => {
  console.log(req.body);
  const { job_id, content } = req.body;
  const userInfo = await authorize(req);
  if (userInfo) {
    const user_id = userInfo.sub;
    try {
      const client = await pool.connect();
      //test if user already applied
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
      //Take the data and send back to client
      const resultApps = await client.query(
        "SELECT * FROM applications WHERE user_id = $1",
        [user_id]
      );
      const jobsIds = resultApps.rows.map((row) => row.job_id);
      console.log(jobsIds);
      const resultJobs = await client.query(
        //find jobs with all jobsIds
        `SELECT * FROM jobs WHERE job_id IN (${jobsIds.join(",")})`
      );
      res.json({ appliedJobs: resultJobs.rows, applications: resultApps.rows });
      client.release();
    } catch (error) {
      console.error("Error sending application:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

//delete application
privateRouter.delete("/application", async (req, res) => {
  console.log(req.body);
  const { app_id } = req.body;
  const userInfo = await authorize(req);
  if (userInfo) {
    const user_id = userInfo.sub;
    try {
      const client = await pool.connect();
      await client.query(
        "DELETE FROM applications WHERE user_id = $1 AND app_id = $2",
        [user_id, app_id]
      );
      const resultApps = await client.query(
        "SELECT * FROM applications WHERE user_id = $1",
        [user_id]
      );
      const jobsIds = resultApps.rows.map((row) => row.job_id);
      //find jobs with all jobsIds
      const resultJobs =
        jobsIds.length > 0
          ? await client.query(
              `SELECT * FROM jobs WHERE job_id IN (${jobsIds.join(",")})`
            )
          : { rows: [] };
      res.json({ appliedJobs: resultJobs.rows, applications: resultApps.rows });
      client.release();
    } catch (error) {
      console.error("Error deleting application:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

//fetch messages
privateRouter.get("/messages", async (req, res) => {
  const userInfo = await authorize(req);
  if (userInfo) {
    const user_id = userInfo.sub;
    try {
      const client = await pool.connect();
      //select from table messages, get related ap_ids fro muser id
      const resultApps = await client.query(
        "SELECT * FROM applications WHERE user_id = $1",
        [user_id]
      );
      //select all messages from table where ap_id is in resultApps
      const app_ids = resultApps.rows.map((row) => row.app_id);
      const messages = await client.query(
        `SELECT * FROM messages WHERE app_id IN (${app_ids.join(",")})`
      );
      res.json(messages.rows);
      client.release();
    } catch (err) {
      console.error("Error executing query", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

export default privateRouter;
