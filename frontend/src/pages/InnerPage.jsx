import React, { useState, useEffect } from "react";
import JobHeader from "../components/JobHeader";
import JobBody from "../components/JobBody";
import JobFooter from "../components/JobFooter";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getSingleJob } from "../slices/jobsSlice";

const InnerPage = () => {
  //scroll window to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const params = useParams();
  const jobId = params.jobId;

  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  console.log(jobs);
  const job = jobs[0];
  const [isApplication, setIsApplication] = useState(false);

  useEffect(() => {
    try {
      axios.get(`http://localhost:3000/${jobId}`).then((response) => {
        dispatch(getSingleJob({ jobs: response.data, isLoading: false }));
        console.log(response.data);
      });
    } catch {}
  }, []);

  if (!job) {
    return (
      <div className="flex justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  //fetch the job from the backend
  return (
    <main className="flex flex-col justify-center">
      <JobHeader job={job} />
      <JobBody
        job={job}
        isApplication={isApplication}
        setIsApplication={setIsApplication}
      />
      <JobFooter
        job={job}
        isApplication={isApplication}
        setIsApplication={setIsApplication}
      />
    </main>
  );
};

export default InnerPage;
