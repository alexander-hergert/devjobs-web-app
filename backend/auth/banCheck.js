const checkBanStatus = async (client, user_id, res) => {
  try {
    const resultUser = await client.query(
      "SELECT * FROM users WHERE user_id = $1",
      [user_id]
    );
    const user = resultUser.rows[0];
    if (user?.is_banned) {
      res.status(401).json({ error: "User is banned" });
      return true;
    }
  } catch (err) {
    console.error(err.message);
  }
};

export default checkBanStatus;
