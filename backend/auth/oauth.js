import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import pool from "../config/configDB.js";

export const authorize = async (req) => {
  //check if browser is supported
  console.log(req.useragent.browser);
  if (
    req.useragent.browser !== "Chrome" ||
    req.useragent.browser !== "Firefox" ||
    req.useragent.browser !== "Edge"
  ) {
    console.log("Supported browser");
  } else {
    console.log("Unsupported browser");
    return;
  }
  //authorize user
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const signed_session_id = req.cookies["connect.sid"];
  let session_id;
  if (signed_session_id) {
    session_id = signed_session_id?.split(":")[1].split(".")[0];
  }

  if (session_id === req.sessionID) {
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
      res.status(401).send("Unauthorized");
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
        res.status(401).send("Unauthorized");
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching user info:", error);
      res.status(401).send("Unauthorized");
    }
  } else if (!token && !session_id) {
    res.status(401).send("Unauthorized");
  }
};
