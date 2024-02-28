import pool from "../config/configDB.js";

//admin functions

//test for admin
export const testAdmin = async (user_id, res) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM users WHERE user_id = $1",
      [user_id]
    );
    const user = result.rows[0];
    if (!user?.role === "admin") {
      res.status(401).send("Unauthorized");
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  } finally {
    if (client) client.release();
  }
};
