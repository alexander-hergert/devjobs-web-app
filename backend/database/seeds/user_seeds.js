export const addUser = async (
  client,
  user_id,
  role,
  email,
  fullname,
  picture,
  address,
  location,
  skills,
  user_website,
  has_new_message,
  is_banned,
  session_id
) => {
  try {
    await client.query(
      `INSERT INTO users (user_id, role, email, fullname, 
        picture, address, location, skills, user_website, has_new_message, is_banned, session_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
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
        has_new_message,
        is_banned,
        session_id,
      ]
    );
  } catch (error) {
    console.error("Error inserting users:", error);
  }
};
