import { jobs } from "./data.js";

export const createRandomJobs = () => {
  const randomJobs = [];
  const length = jobs.length;
  for (let i = 0; i < 100; i++) {
    randomJobs.push({
      user_id: jobs[Math.floor(Math.random() * length)].user_id,
      logo: jobs[Math.floor(Math.random() * length)].logo,
      logo_background: jobs[Math.floor(Math.random() * length)].logo_background,
      status: jobs[Math.floor(Math.random() * length)].status,
      company: jobs[Math.floor(Math.random() * length)].company,
      position: jobs[Math.floor(Math.random() * length)].position,
      posted_at: jobs[Math.floor(Math.random() * length)].posted_at,
      contract: jobs[Math.floor(Math.random() * length)].contract,
      location: jobs[Math.floor(Math.random() * length)].location,
      description: jobs[Math.floor(Math.random() * length)].description,
      requirements: jobs[Math.floor(Math.random() * length)].requirements,
      requirements_list:
        jobs[Math.floor(Math.random() * length)].requirements_list,
      job_role: jobs[Math.floor(Math.random() * length)].job_role,
      job_role_list: jobs[Math.floor(Math.random() * length)].job_role_list,
      company_website: jobs[Math.floor(Math.random() * length)].company_website,
    });
  }
  return randomJobs;
};
