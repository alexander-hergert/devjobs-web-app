import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import pool from "../config/configDB.js";

export const authorize = async (req) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const session_id = req.cookies.session_id;

  if (session_id !== "undefined" && session_id !== "null" && session_id) {
    try {
      const client = await pool.connect();
      const result = await client.query(
        "SELECT * FROM users WHERE session_id = $1",
        [session_id]
      );
      const user = result.rows[0];
      client.release();
      return user;
    } catch (err) {
      console.error(err.message);
    }
  } else if (token) {
    try {
      const response = await axios.get(process.env.AUTH0_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //store session_id in database
      try {
        const client = await pool.connect();
        //check if user exists
        const result = await client.query(
          "SELECT * FROM users WHERE user_id = $1",
          [response.data.sub]
        );
        let user;
        if (result.rows.length === 0) {
          //when no user use auth0 info
          user = response.data;
          user.session_id = req.sessionID;
        } else {
          //when user exists send user info from database
          user = result.rows[0];
        }
        const user_id = response.data.sub;
        const session_id = req.sessionID;
        //store session_id in database if user exists
        if (user?.user_id) {
          await client.query(
            "UPDATE users SET session_id = $1 WHERE user_id = $2",
            [session_id, user_id]
          );
        }
        client.release();
        //return session_id and user_id
        return user;
      } catch (err) {
        console.error(err.message);
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw new Error("Error fetching user info");
    }
  } else {
    throw new Error("Unauthorized");
  }
};
