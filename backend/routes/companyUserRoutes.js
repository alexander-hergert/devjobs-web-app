import express from "express";
const companyRouter = express.Router();
import pool from "../config/configDB.js";
import { authorize } from "../auth/oauth.js";
import checkBanStatus from "../auth/banCheck.js";

//create job
companyRouter.post("/createjob", async (req, res) => {
  let {
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
  const requirements_list = requirementsItems.join("");
  // Format role list to string with line breaks
  const job_role_list = roleItems.join("");

  const user = await authorize(req);
  const user_id = user?.user_id;
  if (user) {
    const logo = user?.picture;
    const status = true;
    const posted_at = new Date();
    try {
      const client = await pool.connect();
      //fetch user and check for banned status
      const isBanned = await checkBanStatus(client, user_id, res);
      if (isBanned) return;
      //check if user_website has http:// or https://
      if (
        website &&
        !website?.startsWith("http://") &&
        !website?.startsWith("https://")
      ) {
        website = "https://" + website;
      } else if (!website) {
        website = "";
      }
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
  const user = await authorize(req);
  const user_id = user?.user_id;
  if (user) {
    try {
      const client = await pool.connect();
      //fetch user and check for banned status
      const isBanned = await checkBanStatus(client, user_id, res);
      if (isBanned) return;
      const result = await client.query(
        "SELECT * FROM jobs WHERE user_id = $1 ORDER BY job_id ASC",
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
  let {
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

  const user = await authorize(req);
  const user_id = user?.user_id;
  if (user) {
    const logo = user?.picture;
    const status = true;
    try {
      const client = await pool.connect();
      //fetch user and check for banned status
      const isBanned = await checkBanStatus(client, user_id, res);
      if (isBanned) return;
      //check if user_website has http:// or https://
      if (
        website &&
        !website?.startsWith("http://") &&
        !website?.startsWith("https://")
      ) {
        website = "https://" + website;
      } else if (!website) {
        website = "";
      }
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
  const user = await authorize(req);
  const user_id = user?.user_id;
  if (user) {
    try {
      const client = await pool.connect();
      //fetch user and check for banned status
      const isBanned = await checkBanStatus(client, user_id, res);
      if (isBanned) return;
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
  const user = await authorize(req);
  const user_id = user?.user_id;
  if (user) {
    try {
      const client = await pool.connect();
      //fetch user and check for banned status
      const isBanned = await checkBanStatus(client, user_id, res);
      if (isBanned) return;
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

//fetch job applications
companyRouter.get("/getJobApplications", async (req, res) => {
  const { job_id } = req.query;
  const user = await authorize(req);
  const user_id = user?.user_id;
  if (user) {
    try {
      const client = await pool.connect();
      //fetch user and check for banned status
      const isBanned = await checkBanStatus(client, user_id, res);
      if (isBanned) return;
      const result = await client.query(
        "SELECT * FROM applications WHERE job_id = $1 ORDER BY user_id",
        [job_id]
      );
      // Get user ids from applications
      const user_ids = result.rows.map((row) => row.user_id);
      // Get users from user ids
      const users = await client.query(
        "SELECT * FROM users WHERE user_id = ANY($1) ORDER BY user_id",
        [user_ids]
      );
      //create a new array with apps and users
      const usersAndApps = [];
      for (let i = 0; i < result.rows.length; i++) {
        usersAndApps.push({
          app: result.rows[i],
          user: users.rows[i],
        });
      }
      res.status(200).json(usersAndApps);
      client.release();
    } catch (err) {
      console.error("Error executing query", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

//update jobapplication
companyRouter.put("/updateJobApplication", async (req, res) => {
  const { job_id, user_id, status } = req.body;
  const user = await authorize(req);
  const u_id = user?.user_id;
  if (user) {
    try {
      const client = await pool.connect();
      //fetch user and check for banned status
      const isBanned = await checkBanStatus(client, u_id, res);
      if (isBanned) return;
      await client.query(
        "UPDATE applications SET app_status = $1 WHERE job_id = $2 AND user_id = $3",
        [status, job_id, user_id]
      );
      const result = await client.query(
        "SELECT * FROM applications WHERE job_id = $1 ORDER BY user_id",
        [job_id]
      );
      // Get user ids from applications
      const user_ids = result.rows.map((row) => row.user_id);
      // Get users from user ids
      const users = await client.query(
        "SELECT * FROM users WHERE user_id = ANY($1) ORDER BY user_id",
        [user_ids]
      );
      //create a new array with apps and users
      const usersAndApps = [];
      for (let i = 0; i < result.rows.length; i++) {
        usersAndApps.push({
          app: result.rows[i],
          user: users.rows[i],
        });
      }
      res.status(200).json(usersAndApps);
      client.release();
    } catch (err) {
      console.error("Error executing query", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

//create message

companyRouter.post("/createMessage", async (req, res) => {
  const { app_id, content } = req.body;
  const user = await authorize(req);
  const user_id = user?.user_id;
  if (user) {
    try {
      const client = await pool.connect();
      //fetch user and check for banned status
      const isBanned = await checkBanStatus(client, user_id, res);
      if (isBanned) return;
      //select jobid from applications
      const job = await client.query(
        "SELECT * FROM jobs WHERE job_id = (SELECT job_id FROM applications WHERE app_id = $1)",
        [app_id]
      );
      const subject = `Application for ${job.rows[0].position} at ${job.rows[0].company} in ${job.rows[0].location}`;
      //insert message
      await client.query(
        "INSERT INTO messages (app_id, subject, content) VALUES ($1, $2, $3)",
        [app_id, subject, content]
      );
      //update the recipient has_new_message status to true
      //find the related user_id (recipient) use app_ids
      const resultUsers = await client.query(
        "SELECT * FROM applications WHERE app_id = $1",
        [app_id]
      );
      const id = resultUsers.rows[0].user_id;
      //update the user
      await client.query(
        "UPDATE users SET has_new_message = true WHERE user_id = $1",
        [id]
      );
      //select all messages (does it make sense?)
      const result = await client.query(
        "SELECT * FROM messages WHERE app_id = $1",
        [app_id]
      );
      res.status(200).json(result.rows);
      client.release();
    } catch (err) {
      console.error("Error executing query", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

//fetch replies
companyRouter.get("/getReplies", async (req, res) => {
  const user = await authorize(req);
  const user_id = user?.user_id;
  if (user) {
    try {
      const client = await pool.connect();
      //fetch user and check for banned status
      const isBanned = await checkBanStatus(client, user_id, res);
      if (isBanned) return;
      //get all jobs_ids from company user
      const resultJobs = await client.query(
        "SELECT * FROM jobs WHERE user_id = $1",
        [user_id]
      );
      const job_ids = resultJobs.rows.map((row) => row.job_id);
      //get all app_ids from jobs
      const resultApps = await client.query(
        "SELECT * FROM applications WHERE job_id = ANY($1)",
        [job_ids]
      );
      const app_ids = resultApps.rows.map((row) => row.app_id);
      //get all messages from apps
      const resultMessages = await client.query(
        "SELECT * FROM messages WHERE app_id = ANY($1)",
        [app_ids]
      );
      const messages = resultMessages.rows;
      //get all replies from messages
      const resultReplies = await client.query(
        "SELECT * FROM replies WHERE app_id = ANY($1)",
        [app_ids]
      );
      const replies = resultReplies.rows;
      //add subject to replies
      replies.forEach((reply, i) => {
        const message = messages.find(
          (message) => message.app_id === reply.app_id
        );
        if (message) {
          reply.subject = resultReplies.rows[i].subject;
        }
      });
      //update user has_new_message to false
      await client.query(
        "UPDATE users SET has_new_message = false WHERE user_id = $1",
        [user_id]
      );
      //select the user again
      const resultUser = await client.query(
        "SELECT * FROM users WHERE user_id = $1",
        [user_id]
      );
      //send replies and user
      res.json({
        replies: replies,
        user: resultUser.rows[0],
      });
      client.release();
    } catch (err) {
      console.error("Error executing query", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

//delete reply
companyRouter.delete("/deleteReply", async (req, res) => {
  const { reply_id } = req.body;
  const user = await authorize(req);
  const user_id = user?.user_id;
  if (user) {
    try {
      const client = await pool.connect();
      //fetch user and check for banned status
      const isBanned = await checkBanStatus(client, user_id, res);
      if (isBanned) return;
      //check if the id is part of users jobs
      //get all jobs_ids from company user
      const resultJobs = await client.query(
        "SELECT * FROM jobs WHERE user_id = $1",
        [user_id]
      );
      const job_ids = resultJobs.rows.map((row) => row.job_id);
      //get all app_ids from jobs
      const resultApps = await client.query(
        "SELECT * FROM applications WHERE job_id = ANY($1)",
        [job_ids]
      );
      const app_ids = resultApps.rows.map((row) => row.app_id);
      //get all replies with app_ids
      const resultReplies = await client.query(
        "SELECT * FROM replies WHERE app_id = ANY($1)",
        [app_ids]
      );
      const reply_ids = resultReplies.rows.map((row) => row.reply_id);
      //check if reply_ids contains reply_id
      if (!reply_ids.includes(reply_id)) {
        //if not, unauthorized
        res.status(401).json({ error: "Unauthorized" });
        return;
      } else {
        //if yes, delete message
        await client.query("DELETE FROM replies WHERE reply_id = $1", [
          reply_id,
        ]);
      }
      //select all replies
      const replies = await client.query(
        "SELECT * FROM replies WHERE reply_id = ANY($1)",
        [reply_ids]
      );
      res.json(replies.rows);
      client.release();
    } catch (error) {
      console.error("Error deleting message:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

export default companyRouter;
