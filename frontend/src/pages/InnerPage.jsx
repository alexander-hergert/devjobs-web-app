import React, { useState, useEffect } from "react";
import JobHeader from "../components/JobHeader";
import JobBody from "../components/JobBody";
import JobFooter from "../components/JobFooter";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getSingleJob } from "../slices/jobsSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { setUser } from "../slices/userSlice";
import { getApps } from "../slices/appsSlice";

const InnerPage = () => {
  //scroll window to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const params = useParams();
  const jobId = params.jobId;

  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const job = jobs[0];
  const user = useSelector((state) => state.user.user);
  const { getAccessTokenSilently } = useAuth0();
  const [isApplication, setIsApplication] = useState(false);

  useEffect(() => {
    const callApi = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get("http://localhost:3000/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        dispatch(setUser({ payload: response.data[0] }));
      } catch (error) {
        console.error("Error calling API:", error);
      }
    };
    if (!user?.user_id) {
      callApi();
    }
  }, []);

  useEffect(() => {
    const callApi = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get("http://localhost:3000/appliedJobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        dispatch(getApps({ payload: response.data }));
      } catch (error) {
        console.error("Error calling API:", error);
      }
    };
    if (!user?.user_id) {
      callApi();
    }
  }, []);

  useEffect(() => {
    try {
      axios.get(`http://localhost:3000/${jobId}`).then((response) => {
        dispatch(getSingleJob({ payload: response.data }));
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
