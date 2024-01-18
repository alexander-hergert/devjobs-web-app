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
    if (!user.role == "admin") {
      res.status(401).send("Unauthorized");
    }
    client.release();
    try {
      const client = await pool.connect();
      const result = await client.query(
        "SELECT * FROM users WHERE role != 'admin'"
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

export default adminRouter;
