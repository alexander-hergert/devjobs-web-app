import React, { useEffect } from "react";
import axios from "axios";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../slices/jobsSlice";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Jobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const location = useLocation();

  useEffect(() => {
    try {
      if (!location.search) {
        axios.get("http://localhost:3000/jobs").then((response) => {
          dispatch(getJobs({ payload: response.data }));
          console.log(response.data);
        });
      } else {
        axios
          .get(`http://localhost:3000/jobs/${location.search}`)
          .then((response) => {
            dispatch(getJobs({ payload: response.data }));
            console.log(response.data);
          });
      }
    } catch (error) {}
  }, []);

  if (jobs.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {jobs?.map((job) => (
          <Job key={job.job_id} job={job} />
        ))}
      </section>
      <button className="btn m-auto block">Load More</button>
    </>
  );
};

export default Jobs;
