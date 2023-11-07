export const addJob = async (
  client,
  user_id,
  logo,
  logo_background,
  status,
  company,
  position,
  posted_at,
  contract,
  location,
  description,
  requirements,
  requirements_list,
  job_role,
  job_role_list,
  company_website
) => {
  try {
    await client.query(
      `INSERT INTO jobs (user_id, logo, logo_background, status, company, position, posted_at, contract, 
        location, description, requirements, requirements_list, job_role, 
        job_role_list, company_website) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
      [
        user_id,
        logo,
        logo_background,
        status,
        company,
        position,
        posted_at,
        contract,
        location,
        description,
        requirements,
        requirements_list,
        job_role,
        job_role_list,
        company_website,
      ]
    );
  } catch (error) {
    console.error("Error inserting jobs:", error);
  }
};
