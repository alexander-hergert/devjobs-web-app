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
  has_new_message
) => {
  try {
    await client.query(
      `INSERT INTO users (user_id, role, email, fullname, 
        picture, address, location, skills, user_website, has_new_message) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
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
      ]
    );
  } catch (error) {
    console.error("Error inserting users:", error);
  }
};
