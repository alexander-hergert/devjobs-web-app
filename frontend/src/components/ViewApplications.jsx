import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import { getCompanyApps } from "../slices/jobAppsSlice";
import WriteMessage from "./WriteMessage";

const Style = styled.section`
  position: absolute;
  top: 0;
  padding-top: 5rem;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
  width: 100%;
  min-height: 100dvh;

  h2 {
    width: 15rem;
    text-align: left;
    margin: 0 auto;
  }

  p {
    width: 15rem;
    text-align: left;

    //media qeury from 768px
    @media screen and (min-width: 768px) and (max-width: 1279px) {
      width: 20rem;
    }

    //media query from max 768px
    @media screen and (max-width: 767px) {
      font-size: 0.8rem;
    }
  }

  @media screen and (max-width: 767px) {
    padding-top: 2rem;
  }
`;

const ViewApplications = ({ setViewApplications, selectedJob }) => {
  const { getAccessTokenSilently } = useAuth0();
  const companyJobs = useSelector((state) => state.companyJobs.companyJobs);
  const messages = useSelector((state) => state.messages.messages);
  console.log(messages);
  const dispatch = useDispatch();
  const companyApps = useSelector((state) => state.jobApps.jobApps);
  const [enlargedApp, setEnlargedApp] = useState(0);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(0);

  const handleOpen = (i) => {
    setEnlargedApp(i);
  };

  const handleStatus = async (i, status) => {
    const data = {
      job_id: companyJobs[selectedJob]?.job_id,
      user_id: companyApps[i]?.users[i]?.user_id,
      status: status,
    };
    console.log(data);
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.put(
        `http://localhost:3000/updateJobApplication`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      dispatch(getCompanyApps({ jobApps: response.data, isLoading: false }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleWriteMessage = async (i) => {
    setSelectedApp(i);
    setIsMessageOpen(true);
  };

  useEffect(() => {
    //on load fetch da of applicants
    const fetchApplicants = async () => {
      const data = { job_id: companyJobs[selectedJob]?.job_id };
      console.log(data);
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get(
          `http://localhost:3000/getJobApplications?job_id=${data.job_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        dispatch(getCompanyApps({ jobApps: response.data, isLoading: false }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplicants();
  }, []);

  return (
    <>
      {isMessageOpen && (
        <WriteMessage
          setIsMessageOpen={setIsMessageOpen}
          companyApps={companyApps}
          selectedApp={selectedApp}
        />
      )}
      <Style>
        <button
          className="btn block m-auto border-0 text-white capitalize my-4 bg-red-500 hover:bg-red-200"
          onClick={() => setViewApplications(false)}
          aria-label="close"
        >
          CLOSE
        </button>
        <div
          className="grid grid-cols-4 justify-center justify-items-center items-center m-auto bg-neutral 
        max-md:w-[327px] max-md:p-6 md:w-[690px] xl:w-[1100px] shadow rounded-xl text-primary p-4 border-b-4 border-accent"
        >
          <div className="col-span-4">
            <h2 className="pl-12 text-2xl font-bold">Applications</h2>
          </div>
          {companyApps[0]?.users[0]?.fullname && (
            <ul className="col-span-4 mt-6 px-4">
              {companyApps?.map((app, i) => (
                <li
                  className="col-span-4 grid xl:grid-cols-4 gap-4 md:grid-cols-2 md:grid-rows-2 xl:grid-rows-1"
                  key={i}
                >
                  <div className="flex flex-col items-center gap-2">
                    <img
                      className="w-[10rem] h-[10rem]"
                      src={app.users[i]?.picture}
                      alt={app.users[i]?.fullname}
                    />
                    <h3>{app.users[i]?.fullname}</h3>
                    <h3
                      className={
                        app.apps[i]?.app_status === "Accepted"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {app.apps[i]?.app_status}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4>{app.users[i]?.email}</h4>
                    <h4>{app.users[i]?.location}</h4>
                    <h4>{app.users[i]?.address}</h4>
                    <h4>{app.users[i]?.skills}</h4>
                    <h4>
                      <a
                        className="text-blue-500 hover:text-blue-800"
                        href={app.users[i]?.user_website}
                        target="_blank"
                      >
                        {app.users[i]?.user_website}
                      </a>
                    </h4>
                  </div>
                  <div
                    onClick={() => handleOpen(i)}
                    className={`cursor-pointer max-md:px-0 max-xl:px-4 flex flex-col items-center gap-2 ${
                      enlargedApp === i ? "" : "max-h-[5rem]"
                    }`}
                  >
                    <p className="hyphens-auto">{app.apps[i]?.content}</p>
                  </div>
                  <div className="flex flex-col gap-4 md:w-[10rem] md:justify-self-center xl:justify-self-end">
                    <button
                      onClick={() => handleWriteMessage(i)}
                      aria-label="write message"
                      className="btn border-0 duration-0 capitalize text-white bg-accent hover:bg-info min-w-[4rem]"
                      disabled={
                        messages[i]?.app_id === app.apps[i]?.app_id
                          ? true
                          : false
                      }
                    >
                      ANSWER
                    </button>
                    <button
                      aria-label="accept"
                      onClick={() => handleStatus(i, "Accepted")}
                      className="btn border-0 duration-0 capitalize text-white bg-accent hover:bg-info min-w-[4rem]"
                    >
                      ACCEPT
                    </button>
                    <button
                      aria-label="deny"
                      onClick={() => handleStatus(i, "Denied")}
                      className="btn border-0 duration-0 capitalize text-white bg-red-500 hover:bg-red-200 min-w-[4rem]"
                    >
                      DENY
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {!companyApps[0]?.users[0]?.fullname && (
            <h3 className="col-span-4 text-center my-4">
              You have no Applications for this job.
            </h3>
          )}
        </div>
      </Style>
    </>
  );
};

export default ViewApplications;
