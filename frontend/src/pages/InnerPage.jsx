import React, { useState, useEffect } from "react";
import JobHeader from "../components/Inner/JobHeader";
import JobBody from "../components/Inner/JobBody";
import JobFooter from "../components/Inner/JobFooter";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getSingleJob } from "../slices/jobsSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const InnerPage = () => {
  //scroll window to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const params = useParams();
  const jobId = Number(params.jobId);
  const dispatch = useDispatch();
  const [job] = useSelector((state) => state.jobs.jobs);
  const [isApplication, setIsApplication] = useState(false);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (!jobId || jobId < 1) {
      navigate("/error");
      return;
    }
    try {
      axios
        .get(`${baseUrl}/${jobId}`, { withCredentials: true })
        .then((response) => {
          dispatch(getSingleJob({ jobs: response.data, isLoading: false }));
        });
    } catch {
      console.error("Error fetching job");
      toast.error("Error fetching job");
    }
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
    <>
      <ToastContainer />
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
    </>
  );
};

export default InnerPage;
