import express from "express";
const adminRouter = express.Router();
import pool from "../config/configDB.js";
import { authorize } from "../auth/oauth.js";

// GET all users
adminRouter.get("/admin/users", authorize, async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM users");
    const results = { results: result ? result.rows : null };
    res.send(results);
    client.release();
  } catch (err) {
    console.error(err.message);
  }
});

export default adminRouter;
