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
  user_website
) => {
  try {
    await client.query(
      `INSERT INTO users (user_id, role, email, fullname, 
        picture, address, location, skills, user_website) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
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
      ]
    );
  } catch (error) {
    console.error("Error inserting users:", error);
  }
};
