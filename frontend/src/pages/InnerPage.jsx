import React, { useState, useEffect } from "react";
import JobHeader from "../components/JobHeader";
import JobBody from "../components/JobBody";
import JobFooter from "../components/JobFooter";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getSingleJob } from "../slices/jobsSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const InnerPage = () => {
  //scroll window to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const params = useParams();
  const jobId = Number(params.jobId);
  console.log(jobId);
  const dispatch = useDispatch();
  const [job] = useSelector((state) => state.jobs.jobs);
  const jobs = useSelector((state) => state.totalJobs.totalJobs);
  console.log(jobs);
  const [isApplication, setIsApplication] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!jobId || jobId < 1) {
      navigate("/error");
      return;
    }
    try {
      axios.get(`http://localhost:3000/${jobId}`).then((response) => {
        dispatch(getSingleJob({ jobs: response.data, isLoading: false }));
        console.log(response.data);
      });
    } catch {}
  }, []);

  if (!job) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h1>Job not found</h1>
        <Link to="/" className="btn">
          Home
        </Link>
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
