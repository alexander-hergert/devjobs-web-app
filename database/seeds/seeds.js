import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
import { addUser } from "./user_seeds.js";
import { addJob } from "./job_seeds.js";
import { companies, jobs } from "./data.js";

dotenv.config({ path: "../../.env" });

//ADMIN DATA
const user_id = process.env.User_Id;
const role = process.env.Role;
const email = process.env.Email;
const fullname = process.env.FullName;
const picture = process.env.Picture;

const pool = new Pool({
  user: "alexanderhergert",
  host: "localhost",
  database: "webdevjobs",
  password: "1234",
  port: 5432,
});

// Seed the users table
const deleteTableUsers = async (client) => {
  try {
    await client.query("DROP TABLE IF EXISTS users CASCADE");
  } catch (error) {
    console.error("Error deleting users table:", error);
  }
};

const createTableUsers = async (client) => {
  try {
    await client.query(
      `CREATE TABLE IF NOT EXISTS users (user_id VARCHAR(100) PRIMARY KEY, 
      role VARCHAR(20) NOT NULL, 
      email VARCHAR(100) NOT NULL, 
      fullname VARCHAR(100) NOT NULL,
      picture VARCHAR(255), 
      address VARCHAR(100),
      location VARCHAR(100), 
      skills VARCHAR(100),
      user_website VARCHAR(100))`
    );
    console.log("Table users created successfully!");
  } catch (error) {
    console.error("Error creating users table:", error);
  }
};

const fillUsersTable = async (client) => {
  await addUser(
    client,
    user_id,
    role,
    email,
    fullname,
    picture,
    null,
    null,
    null
  );
  for (let i = 0; i < companies.length; i++) {
    const company = companies[i];
    await addUser(
      client,
      company.user_id,
      "company",
      company.email,
      company.name,
      company.logo
    );
  }
};

//Seeds the jobs table
const deleteTableJobs = async (client) => {
  try {
    await client.query("DROP TABLE IF EXISTS jobs CASCADE");
  } catch (error) {
    console.error("Error deleting jobs table:", error);
  }
};

const createTableJobs = async (client) => {
  try {
    await client.query(
      `CREATE TABLE IF NOT EXISTS jobs (
        job_id SERIAL PRIMARY KEY, 
        user_id VARCHAR(255) NOT NULL REFERENCES users(user_id),
        logo VARCHAR(255),
        logo_background VARCHAR(255),
        status BOOLEAN NOT NULL, 
        company VARCHAR(100) NOT NULL, 
        position VARCHAR(50) NOT NULL, 
        posted_at TIMESTAMP NOT NULL, 
        contract VARCHAR(50) NOT NULL, 
        location VARCHAR(50) NOT NULL, 
        description TEXT NOT NULL, 
        requirements TEXT NOT NULL, 
        requirements_list TEXT, 
        job_role TEXT NOT NULL, 
        job_role_list TEXT, 
        company_website VARCHAR(100)
      )`
    );
    console.log("Table jobs created successfully!");
  } catch (error) {
    console.error("Error creating jobs table:", error);
  }
};

const fillJobsTable = async (client) => {
  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    await addJob(
      client,
      job.user_id,
      job.logo,
      job.logo_background,
      job.status,
      job.company,
      job.position,
      job.posted_at,
      job.contract,
      job.location,
      job.description,
      job.requirements,
      job.requirements_list,
      job.job_role,
      job.job_role_list,
      job.company_website
    );
  }
};

// Seed the applications table

const deleteTableApplications = async (client) => {
  try {
    await client.query("DROP TABLE IF EXISTS applications CASCADE");
  } catch (error) {
    console.error("Error deleting applications table:", error);
  }
};

const createTableApplications = async (client) => {
  try {
    await client.query(
      `CREATE TABLE IF NOT EXISTS applications (
        app_id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL REFERENCES users(user_id),
        job_id INT NOT NULL REFERENCES jobs(job_id),
        app_status VARCHAR(20) DEFAULT 'Pending',
        content TEXT NOT NULL
        )
      `
    );
    console.log("Table applications created successfully!");
  } catch (error) {
    console.error("Error creating applications table:", error);
  }
};

const fillApplicationsTable = async (client) => {
  try {
    await client.query(
      `INSERT INTO applications (user_id, job_id, app_status, content)
        VALUES ($1, $2, $3, $4)`,
      [user_id, 1, "Pending", "I am a frontend developer"]
    );
    console.log("Applications inserted successfully!");
  } catch (error) {
    console.error("Error inserting applications:", error);
  }
};

// Call the functions
const callFunctions = async () => {
  const client = await pool.connect();
  try {
    await deleteTableUsers(client);
    await createTableUsers(client);
    await fillUsersTable(client);
    await deleteTableJobs(client);
    await createTableJobs(client);
    await fillJobsTable(client);
    await deleteTableApplications(client);
    await createTableApplications(client);
    await fillApplicationsTable(client);
  } finally {
    client.release();
  }
};

callFunctions();
