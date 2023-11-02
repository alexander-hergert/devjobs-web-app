import React, { useEffect } from "react";
import axios from "axios";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../slices/jobsSlice";

const Jobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);

  useEffect(() => {
    try {
      axios.get("../data.json").then((response) => {
        dispatch(getJobs({ payload: response.data }));
      });
    } catch {}
  }, []);

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {jobs?.payload?.map((job) => (
          <Job key={job.id} job={job} />
        ))}
      </section>
      <button className="btn m-auto block">Load More</button>
    </>
  );
};

export default Jobs;
