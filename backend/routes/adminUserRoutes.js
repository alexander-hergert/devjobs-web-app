import express from "express";
const adminRouter = express.Router();
import pool from "../config/configDB.js";
import { authorize } from "../auth/oauth.js";

// GET all users
adminRouter.get("/getUsers", async (req, res) => {
  const userInfo = await authorize(req);
  if (userInfo) {
    const user_id = userInfo.sub;
    //test if user is admin
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM users WHERE user_id = $1",
      [user_id]
    );
    const user = result.rows[0];
    if (!user?.role == "admin") {
      res.status(401).send("Unauthorized");
    }
    client.release();
    try {
      const client = await pool.connect();
      const result = await client.query(
        "SELECT * FROM users WHERE role != 'admin' ORDER BY user_id ASC"
      );
      const users = result.rows;
      res.json(users);
      client.release();
    } catch (err) {
      console.error(err.message);
    }
  } else {
    res.status(401).send("Unauthorized");
  }
});

//get user stats
adminRouter.get("/getUserStats", async (req, res) => {
  const { id } = req.query;
  const userInfo = await authorize(req);
  if (userInfo) {
    const user_id = userInfo.sub;
    //test if user is admin
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM users WHERE user_id = $1",
      [user_id]
    );
    const user = result.rows[0];
    if (!user?.role == "admin") {
      res.status(401).send("Unauthorized");
    }
    client.release();
    try {
      const client = await pool.connect();
      //fetch user and find role
      const resultUser = await client.query(
        "SELECT * FROM users WHERE user_id = $1",
        [id]
      );
      const userRole = resultUser.rows[0].role;
      //if user is private then get applications and messages
      if (userRole === "private") {
        const resultApps = await client.query(
          "SELECT * FROM applications WHERE user_id = $1 ORDER BY user_id ASC",
          [id]
        );
        const applications = resultApps.rows;
        //fetch messages by applications
        const appIds = applications.map((app) => app.app_id);
        const resultMessages = await client.query(
          "SELECT * FROM messages WHERE app_id = ANY($1)",
          [appIds]
        );
        const messages = resultMessages.rows;
        res.json({ applications, messages });
      } else if (userRole === "company") {
        //if user is company then get jobs and replies
        const resultJobs = await client.query(
          "SELECT * FROM jobs WHERE user_id = $1 ORDER BY user_id ASC",
          [id]
        );
        //find app_ids with jobs
        const jobIds = resultJobs.rows.map((job) => job.job_id);
        //fetch applications by jobs
        const resultApps = await client.query(
          "SELECT * FROM applications WHERE job_id = ANY($1)",
          [jobIds]
        );
        const applications = resultApps.rows;
        const appIds = applications.map((app) => app.app_id);
        //fetch replies by applications
        const resultReplies = await client.query(
          "SELECT * FROM replies WHERE app_id = ANY($1)",
          [appIds]
        );
        const jobs = resultJobs.rows;
        const replies = resultReplies.rows;
        res.json({ jobs, replies });
      }
      client.release();
    } catch (err) {
      console.error(err.message);
    }
  } else {
    res.status(401).send("Unauthorized");
  }
});

//ban and unban user
adminRouter.put("/banUser", async (req, res) => {
  const { id } = req.body;
  const userInfo = await authorize(req);
  if (userInfo) {
    const user_id = userInfo.sub;
    //test if user is admin
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM users WHERE user_id = $1",
      [user_id]
    );
    const user = result.rows[0];
    if (!user?.role == "admin") {
      res.status(401).send("Unauthorized");
    }
    client.release();
    try {
      const client = await pool.connect();
      //fetch user to see if banned
      const resultUser = await client.query(
        "SELECT * FROM users WHERE user_id = $1",
        [id]
      );
      const is_user_banned = resultUser.rows[0].is_banned;
      await client.query("UPDATE users SET is_banned = $1 WHERE user_id = $2", [
        !is_user_banned,
        id,
      ]);
      const resultUsers = await client.query(
        "SELECT * FROM users WHERE role != 'admin' ORDER BY user_id ASC"
      );
      const users = resultUsers.rows;
      res.json(users);
      client.release();
    } catch (err) {
      console.error(err.message);
    }
  } else {
    res.status(401).send("Unauthorized");
  }
});

export default adminRouter;
