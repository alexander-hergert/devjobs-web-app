import express from "express";
const privateRouter = express.Router();
import pool from "../config/configDB.js";
import { authorize } from "../auth/oauth.js";
import checkBanStatus from "../auth/banCheck.js";

//create user
privateRouter.post("/createuser", async (req, res) => {
  let { email, role, fullname, address, location, skills, user_website } =
    req.body;
  //protect admin route
  if (role === "admin") {
    res.status(401).json({ error: "Unauthorized" });
    return;
  } else {
    const user = await authorize(req);
    const user_id = user?.sub;
    const session_id = req.sessionID;
    if (user_id) {
      const picture = user?.picture;
      //check if user_website has http:// or https://
      if (
        user_website &&
        !user_website?.startsWith("http://") &&
        !user_website?.startsWith("https://")
      ) {
        user_website = "https://" + user_website;
      } else if (!user_website) {
        user_website = "";
      }
      try {
        const client = await pool.connect();
        const isBanned = await checkBanStatus(client, user_id, res);
        if (isBanned) return;
        //check if user already exists
        const userExist = await client.query(
          "SELECT * FROM users WHERE user_id = $1",
          [user_id]
        );
        if (userExist.rows.length > 0) {
          res.status(400).json({ error: "User exists" });
          return;
        } else {
          //create user
          await client.query(
            "INSERT INTO users (user_id, role, email, fullname, picture, address, location, skills, user_website, is_banned, session_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
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
              false,
              session_id,
            ]
          );
        }
        //select user
        const result = await client.query(
          "SELECT * FROM users WHERE user_id = $1",
          [user_id]
        );
        const user = result.rows[0];
        res.status(200).json(user);
        client.release();
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  }
});

//fetch user data
privateRouter.get("/user", async (req, res) => {
  const user = await authorize(req);
  const user_id = user?.user_id;
  if (user) {
    try {
      const client = await pool.connect();
      //fetch user and check for banned status
      const isBanned = await checkBanStatus(client, user_id, res);
      if (isBanned) return;
      //select user
      const result = await client.query(
        "SELECT * FROM users WHERE user_id = $1",
        [user_id]
      );
      const user = result.rows[0];
      res.status(200).json(user);
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
  let { email, fullname, address, location, skills, user_website } = req.body;
  const user = await authorize(req);
  const user_id = user?.user_id;
  if (user) {
    try {
      const client = await pool.connect();
      //fetch user and check for banned status
      const isBanned = await checkBanStatus(client, user_id, res);
      if (isBanned) return;
      //check if user_website has http:// or https://
      if (
        user_website &&
        !user_website?.startsWith("http://") &&
        !user_website?.startsWith("https://")
      ) {
        user_website = "https://" + user_website;
      } else if (!user_website) {
        user_website = "";
      }
      //update user
      await client.query(
        "UPDATE users SET email = $2, fullname = $3, address = $4, location = $5, skills = $6, user_website = $7 WHERE user_id = $1",
        [user_id, email, fullname, address, location, skills, user_website]
      );
      //select user
      const result = await client.query(
        "SELECT * FROM users WHERE user_id = $1",
        [user_id]
      );
      const user = result.rows[0];
      res.status(200).json(user);
      client.release();
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

//update user url picture
privateRouter.put("/userprofile", async (req, res) => {
  const { url } = req.body;
  const user = await authorize(req);
  const user_id = user?.user_id;
  if (user) {
    try {
      const client = await pool.connect();
      //fetch user and check for banned status
      const isBanned = await checkBanStatus(client, user_id, res);
      if (isBanned) return;
      //update user picture
      await client.query("UPDATE users SET picture = $2 WHERE user_id = $1", [
        user_id,
        url,
      ]);

      //only for company users, select and update all jobs logo
      if (user.role === "company") {
        //select all jobs from user
        const resultJobs = await client.query(
          "SELECT * FROM jobs WHERE user_id = $1",
          [user_id]
        );
        //update all jobs logo
        const jobIds = resultJobs.rows.map((job) => job.job_id);
        await client.query("UPDATE jobs SET logo = $2 WHERE job_id = ANY($1)", [
          jobIds,
          url,
        ]);
      }
      //end of jobs updates

      //select user
      const result = await client.query(
        "SELECT * FROM users WHERE user_id = $1",
        [user_id]
      );
      res.status(200).json(result.rows);
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
  const user = await authorize(req);
  const user_id = user?.user_id;
  if (user) {
    try {
      const client = await pool.connect();
      //fetch user and check for banned status
      const isBanned = await checkBanStatus(client, user_id, res);
      if (isBanned) return;
      //delete applications
      await client.query("DELETE FROM applications WHERE user_id = $1", [
        user_id,
      ]);
      //delete user
      await client.query("DELETE FROM users WHERE user_id = $1", [user_id]);
      res.status(200).json({ message: "User deleted" });
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
  const user = await authorize(req);
  const user_id = user?.user_id;
  if (user) {
    try {
      const client = await pool.connect();
      //fetch user and check for banned status
      const isBanned = await checkBanStatus(client, user_id, res);
      if (isBanned) return;
      //select all applications from user
      const resultApps = await client.query(
        "SELECT * FROM applications WHERE user_id = $1 ORDER BY job_id ASC",
        [user_id]
      );
      const jobsIds = resultApps.rows.map((row) => row.job_id);
      const resultJobs =
        jobsIds.length > 0
          ? //find jobs with all jobsIds
            await client.query("SELECT * FROM jobs WHERE job_id = ANY($1)", [
              jobsIds,
            ])
          : { rows: [] };

      res
        .status(200)
        .json({ appliedJobs: resultJobs.rows, applications: resultApps.rows });
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
  const { job_id, content } = req.body;
  const user = await authorize(req);
  const user_id = user?.user_id;
  if (user) {
    try {
      const client = await pool.connect();
      //fetch user and check for banned status
      const IsBanned = await checkBanStatus(client, user_id, res);
      if (IsBanned) return;
      //test if user already applied
      const result = await client.query(
        "SELECT * FROM applications WHERE user_id = $1 AND job_id = $2",
        [user_id, Number(job_id)]
      );
      if (result.rows.length > 0) {
        res.status(400).json({ error: "Already applied" });
        return;
      }
      //test if job is open
      const resultJob = await client.query(
        "SELECT * FROM jobs WHERE job_id = $1",
        [Number(job_id)]
      );
      if (!resultJob.rows[0].status) {
        res.status(400).json({ error: "Job is closed" });
        return;
      }
      //insert application
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
      const resultJobs = await client.query(
        //find jobs with all jobsIds
        "SELECT * FROM jobs WHERE job_id = ANY($1)",
        [jobsIds]
      );
      res
        .status(200)
        .json({ appliedJobs: resultJobs.rows, applications: resultApps.rows });
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
  const { app_id } = req.body;
  const user = await authorize(req);
  const user_id = user?.user_id;
  if (user) {
    try {
      const client = await pool.connect();
      //fetch user and check for banned status
      const isBanned = await checkBanStatus(client, user_id, res);
      if (isBanned) return;
      //delete application
      await client.query(
        "DELETE FROM applications WHERE user_id = $1 AND app_id = $2",
        [user_id, app_id]
      );
      //select all applications from user
      const resultApps = await client.query(
        "SELECT * FROM applications WHERE user_id = $1",
        [user_id]
      );
      const jobsIds = resultApps.rows.map((row) => row.job_id);
      //find jobs with all jobsIds
      const resultJobs =
        jobsIds.length > 0
          ? //find jobs with all jobsIds
            await client.query("SELECT * FROM jobs WHERE job_id = ANY($1)", [
              jobsIds,
            ])
          : { rows: [] };
      res
        .status(200)
        .json({ appliedJobs: resultJobs.rows, applications: resultApps.rows });
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
  const user = await authorize(req);
  const user_id = user?.user_id;
  if (user) {
    try {
      const client = await pool.connect();
      //fetch user and check for banned status
      const isBanned = await checkBanStatus(client, user_id, res);
      if (isBanned) return;
      //select from table messages, get related app_ids from user id
      const resultApps = await client.query(
        "SELECT * FROM applications WHERE user_id = $1",
        [user_id]
      );
      //select all messages from table where app_id is in resultApps
      const app_ids = resultApps.rows.map((row) => row.app_id);
      const messages = await client.query(
        "SELECT * FROM messages WHERE app_id = ANY($1)",
        [app_ids]
      );
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
      //send messages and user
      res.status(200).json({
        messages: messages.rows,
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

//delete message
privateRouter.delete("/messages", async (req, res) => {
  const { message_id } = req.body;
  const user = await authorize(req);
  const user_id = user?.user_id;
  if (user) {
    try {
      const client = await pool.connect();
      //fetch user and check for banned status
      const isBanned = await checkBanStatus(client, user_id, res);
      if (isBanned) return;
      //check if the id is part of users applications
      const resultApps = await client.query(
        "SELECT * FROM applications WHERE user_id = $1",
        [user_id]
      );
      const app_ids = resultApps.rows.map((row) => row.app_id);
      //get all message ids with app_ids
      const resultMessages = await client.query(
        "SELECT * FROM messages WHERE app_id = ANY($1)",
        [app_ids]
      );
      const message_ids = resultMessages.rows.map((row) => row.message_id);
      //check if messages_ids contains message_id
      if (!message_ids.includes(message_id)) {
        //if not, unauthorized
        res.status(401).json({ error: "Unauthorized" });
        return;
      } else {
        //if yes, delete message
        await client.query("DELETE FROM messages WHERE message_id = $1", [
          message_id,
        ]);
      }
      //select all messages from table where app_id is in resultApps
      const messages = await client.query(
        "SELECT * FROM messages WHERE app_id = ANY($1)",
        [app_ids]
      );
      res.status(200).json(messages.rows);
      client.release();
    } catch (error) {
      console.error("Error deleting message:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

//create reply
privateRouter.post("/createReply", async (req, res) => {
  const { message_id, content } = req.body;
  const user = await authorize(req);
  const user_id = user?.user_id;
  if (user) {
    try {
      const client = await pool.connect();
      //fetch user and check for banned status
      const isBanned = await checkBanStatus(client, user_id, res);
      if (isBanned) return;
      //select app by message_id
      const app_id_result = await client.query(
        "SELECT app_id FROM messages WHERE message_id = $1",
        [message_id]
      );
      const app_id = app_id_result.rows[0].app_id;
      //check if message_id is related to the user by using app_id
      const resultApps = await client.query(
        "SELECT * FROM applications WHERE user_id = $1",
        [user_id]
      );
      const app_ids = resultApps.rows.map((row) => row.app_id);
      //fetch all messages with app_ids from related user
      const resultMessages = await client.query(
        "SELECT * FROM messages WHERE app_id = ANY($1)",
        [app_ids]
      );
      const message_ids = resultMessages.rows.map((row) => row.message_id);
      //check if message_ids contains message_id
      if (!message_ids.includes(message_id)) {
        //if not, unauthorized
        res.status(401).json({ error: "Unauthorized" });
        return;
      } else {
        //if yes, create reply
        //select jobid from applications to get subject
        const job = await client.query(
          "SELECT * FROM jobs WHERE job_id = (SELECT job_id FROM applications WHERE app_id = $1)",
          [app_id]
        );
        //get username
        const username = await client.query(
          "SELECT fullname FROM users WHERE user_id = $1",
          [user_id]
        );
        const subject = `Application for ${job.rows[0].position} at ${job.rows[0].company} in ${job.rows[0].location} from ${username.rows[0].fullname}`;
        await client.query(
          "INSERT INTO replies (app_id, subject, content) VALUES ($1, $2, $3)",
          [app_id, subject, content]
        );
      }
      //update the recipient has_new_message status to true
      //find the related user_id (recipient) use job_id
      const resultJobs = await client.query(
        "SELECT * FROM jobs WHERE job_id = (SELECT job_id FROM applications WHERE app_id = $1)",
        [app_id]
      );
      const job_id = resultJobs.rows[0].job_id;
      //find the related user_id (recipient) use job_id
      const resultUsers = await client.query(
        "SELECT * FROM users WHERE user_id = (SELECT user_id FROM jobs WHERE job_id = $1)",
        [job_id]
      );
      const id = resultUsers.rows[0].user_id;
      //update the user
      await client.query(
        "UPDATE users SET has_new_message = true WHERE user_id = $1",
        [id]
      );
      res.status(200).json({ message: "Reply created" });
    } catch (error) {
      console.error("Error creating reply:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

export default privateRouter;
