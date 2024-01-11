import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditProfile from "../components/EditProfile";
import EditJob from "../components/EditJob";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../components/Loader";
import axios from "axios";
import { getApps } from "../slices/appsSlice";
import ViewAppDetails from "../components/ViewAppDetails";
import { FaPlus } from "react-icons/fa";
import CreateJobs from "../components/CreateJobs";
import { getCompanyJobs } from "../slices/companyJobsSlice";
import ViewApplications from "../components/ViewApplications";
import { FiRefreshCw } from "react-icons/fi";
import ReadMessages from "../components/ReadMessages";
import ReadReplies from "../components/ReadReplies";
import styled from "styled-components";
import UploadWidget from "../components/UploadWidget";
import DashboardFilter from "../components/DashboardFilter";
import CompanyFilter from "../components/CompanyFilter";
import DashboardSort from "../components/DashboardSort";
import CompanySort from "../components/CompanySort";
import { FaEdit } from "react-icons/fa";
import { SlEnvolopeLetter } from "react-icons/sl";
import { TbListDetails } from "react-icons/tb";
import { GiCancel } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import { FaDoorClosed } from "react-icons/fa";

const ProfileImage = styled.div`
  position: relative;
  width: 10rem;
  height: 10rem;
  border: 0.25rem solid var(--accent);
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  border: 0.1rem solid black;

  &:hover {
    //darken background with pseudo element
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      border-radius: 50%;
    }
  }

  input {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  div {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
  }

  &:hover div {
    opacity: 1;
  }
`;

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  const apps = useSelector((state) => state.apps.apps);
  const companyJobs = useSelector((state) => state.companyJobs.companyJobs);
  const navigate = useNavigate();
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isEditJob, setIsEditJob] = useState(false);
  const [isCreateJob, setIsCreateJob] = useState(false);
  const [isReadingMessages, setIsReadingMessages] = useState(false);
  const [isReadingReplies, setIsReadingReplies] = useState(false);
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const [viewDetails, setViewDetails] = useState({
    data: 0,
    isViewDetails: false,
  });
  const [selectedJob, setSelectedJob] = useState(0);
  const [viewApplications, setViewApplications] = useState(false);

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = async () => {
    //if user is private
    if (user?.role === "private") {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get("http://localhost:3000/appliedJobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        dispatch(getApps({ apps: response.data, isLoading: false }));
      } catch (error) {
        console.error("Error calling API:", error);
      }
    } //if user is company
    else if (user?.role === "company") {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get(
          "http://localhost:3000/getCompanyJobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        dispatch(
          getCompanyJobs({ companyJobs: response.data, isLoading: false })
        );
      } catch (error) {
        console.error("Error calling API:", error);
      }
    }
  };

  const handleCreateJob = () => {
    setIsCreateJob(!isCreateJob);
  };

  const handleEditProfile = () => {
    setIsEditProfile(!isEditProfile);
  };

  const handleMessages = async () => {
    setIsReadingMessages(!isReadingMessages);
  };

  const handleReplies = () => {
    setIsReadingReplies(!isReadingReplies);
  };

  const handleEditJob = (i) => {
    setIsEditJob(!isEditJob);
    setSelectedJob(i);
  };

  const handleViewDetails = (i) => {
    setViewDetails({ data: i, isViewDetails: true });
  };

  const handleViewApplications = async (i) => {
    setViewApplications(!viewApplications);
    setSelectedJob(i);
  };

  const handleCancel = async (i) => {
    //get application id
    const data = {
      app_id: apps?.applications[i].app_id,
    };
    console.log(data);
    try {
      const token = await getAccessTokenSilently();
      const response = await axios({
        method: "delete",
        url: "http://localhost:3000/application",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //update apps state
      dispatch(getApps({ apps: response.data, isLoading: false }));
      console.log(response.data);
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  const handleCancelJob = async (i) => {
    //get job id
    const data = {
      job_id: companyJobs[i].job_id,
    };
    console.log(data);
    try {
      const token = await getAccessTokenSilently();
      const response = await axios({
        method: "put",
        url: "http://localhost:3000/canceljob",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //update companyJobs state
      dispatch(
        getCompanyJobs({ companyJobs: response.data, isLoading: false })
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  const handleDeleteJob = async (i) => {
    //get job id
    const data = {
      job_id: companyJobs[i].job_id,
    };
    console.log(data);
    try {
      const token = await getAccessTokenSilently();
      const response = await axios({
        method: "delete",
        url: "http://localhost:3000/deletejob",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //update companyJobs state
      dispatch(
        getCompanyJobs({ companyJobs: response.data, isLoading: false })
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  //Route Protection
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/");
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return <Loader />;
  }

  if (isAuthenticated && user) {
    return (
      <>
        {isEditProfile && (
          <EditProfile setIsEditProfile={setIsEditProfile} user={user} />
        )}
        {isReadingMessages && (
          <ReadMessages setIsReadingMessages={setIsReadingMessages} />
        )}
        {isReadingReplies && (
          <ReadReplies setIsReadingReplies={setIsReadingReplies} />
        )}
        {isEditJob && (
          <EditJob setIsEditJob={setIsEditJob} selectedJob={selectedJob} />
        )}
        {isCreateJob && <CreateJobs setIsCreateJob={setIsCreateJob} />}
        {viewDetails.isViewDetails && (
          <ViewAppDetails
            viewDetails={viewDetails}
            setViewDetails={setViewDetails}
            apps={apps}
          />
        )}
        {viewApplications && (
          <ViewApplications
            setViewApplications={setViewApplications}
            selectedJob={selectedJob}
          />
        )}
        <main>
          <section className="flex justify-center gap-12 items-center mt-10">
            <div className="max-lg:flex max-md:block items-center gap-12">
              <ProfileImage>
                <input type="image" src={user?.picture} alt={user?.fullname} />
                <div>
                  <UploadWidget />
                </div>
              </ProfileImage>
              <h2 className="lg:hidden text-center">
                <span className="font-bold text-lg">{user?.fullname}</span>
              </h2>
            </div>
            <h1 className="max-lg:hidden">
              Hello, <span className="font-bold">{user?.fullname}</span>.
              Welcome to Devjobs!
            </h1>
            <div className="flex gap-4 items-center max-xl:flex-col">
              <button
                onClick={handleEditProfile}
                className="btn border-0 duration-0 capitalize text-white bg-accent hover:bg-info"
              >
                <div className="flex gap-2 items-center">
                  Edit Profile
                  <FaEdit />
                </div>
              </button>
              {user.role === "private" && (
                <button
                  onClick={handleMessages}
                  className="btn border-0 duration-0 capitalize text-white bg-accent hover:bg-info"
                >
                  <div className="flex gap-2 items-center">
                    Read Messages
                    <SlEnvolopeLetter />
                    {user.has_new_message && (
                      <div className="w-[0.75rem] h-[0.75rem] bg-red-500 rounded-2xl"></div>
                    )}
                  </div>
                </button>
              )}
              {user.role === "company" && (
                <button
                  onClick={handleReplies}
                  className="btn border-0 my-2 duration-0 capitalize text-white bg-accent hover:bg-info"
                >
                  <div className="flex gap-2 items-center">
                    Read Replies
                    <SlEnvolopeLetter />
                    {user.has_new_message && (
                      <div className="w-[0.75rem] h-[0.75rem] bg-red-500 rounded-2xl"></div>
                    )}
                  </div>
                </button>
              )}
            </div>
          </section>
          <section className="flex gap-12 justify-center items-center mb-10 m-auto max-md:w-[375px] md:w-[690px] xl:w-[1100px] px-4">
            <div className="flex gap-4 items-center">
              <h2 className="mt-5 text-center font-bold">
                {user.role === "private" ? "Applications" : "Jobs"}
              </h2>
              <button
                onClick={handleRefresh}
                className="btn border-0 my-4 duration-0 capitalize text-white bg-accent hover:bg-info"
              >
                Refresh
                <FiRefreshCw />
              </button>
            </div>
            {user?.role === "company" && (
              <button
                onClick={handleCreateJob}
                className="btn border-0 my-4 duration-0 capitalize text-white bg-accent hover:bg-info"
              >
                Create New Joboffer <FaPlus />
              </button>
            )}
          </section>
          <div className="flex gap-4 max-xl:justify-center justify-between items-center mb-10 flex-wrap m-auto max-md:w-[375px] md:w-[690px] xl:w-[1100px] px-4">
            {user?.role === "private" && <DashboardFilter />}
            {user?.role === "company" && <CompanyFilter />}
            {user?.role === "private" && <DashboardSort />}
            {user?.role === "company" && <CompanySort />}
          </div>
          {/* Private User */}
          {user?.role === "private" && (
            <section className="m-auto max-md:w-[375px] md:w-[690px] xl:w-[1100px] px-4">
              <ul>
                <li
                  className="grid max-md:gap-4 gap-12 grid-cols-7 max-lg:grid-cols-4 mb-8 items-center"
                  key={0}
                >
                  <h3 className="font-bold max-md:text-lg">Position</h3>
                  <h3 className="font-bold max-md:text-lg">Company</h3>
                  <h3 className="font-bold max-lg:hidden">Location</h3>
                  <h3 className="font-bold max-lg:hidden">Job Status</h3>
                  <h3 className="font-bold max-lg:hidden">App Status</h3>
                  <h3 className="font-bold max-md:text-lg">Details</h3>
                  <h3 className="font-bold max-md:text-lg">Cancel</h3>
                </li>
                {apps?.appliedJobs?.map((job, i) => {
                  return (
                    <li
                      className={`grid max-md:gap-4 gap-12 grid-cols-7 my-2 max-lg:grid-cols-4 items-center p-2 rounded ${
                        apps?.applications[i].app_status === "Accepted"
                          ? "bg-green-200"
                          : apps?.applications[i].app_status === "Denied"
                          ? "bg-red-200"
                          : "bg-neutral"
                      }`}
                      key={job.job_id}
                    >
                      <p
                        className={
                          apps?.applications[i].app_status === "Pending"
                            ? "text-primary"
                            : "text-black"
                        }
                      >
                        {job.position}
                      </p>
                      <p
                        className={
                          apps?.applications[i].app_status === "Pending"
                            ? "text-primary"
                            : "text-black"
                        }
                      >
                        {job.company}
                      </p>
                      <p
                        className={
                          apps?.applications[i].app_status === "Pending"
                            ? "text-primary max-lg:hidden"
                            : "text-black max-lg:hidden"
                        }
                      >
                        {job.location}
                      </p>
                      <p
                        className={
                          apps?.applications[i].app_status === "Pending"
                            ? "text-primary max-lg:hidden"
                            : "text-black max-lg:hidden"
                        }
                      >
                        {job.status ? "open" : "closed"}
                      </p>
                      <p
                        className={
                          apps?.applications[i].app_status === "Pending"
                            ? "text-primary max-lg:hidden"
                            : "text-black max-lg:hidden"
                        }
                      >
                        {apps?.applications[i].app_status}
                      </p>
                      <button
                        className="btn border-0 duration-0 capitalize text-white bg-accent hover:bg-info min-w-[4rem]"
                        onClick={() => handleViewDetails(i)}
                      >
                        <div className="flex gap-2 items-center">
                          Details
                          <TbListDetails className="text-xl" />
                        </div>
                      </button>
                      <button
                        className="btn border-0 duration-0 capitalize text-white bg-red-500  hover:bg-red-200 min-w-[4rem]"
                        onClick={() => handleCancel(i)}
                      >
                        <div className="flex gap-2 items-center">
                          Cancel
                          <GiCancel className="text-xl" />
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
          {/* Company User */}
          {user?.role === "company" && (
            <section className="m-auto max-md:w-[375px] md:w-[690px] xl:w-[1100px] px-4">
              <ul>
                <li
                  className="grid max-md:gap-4 gap-12 grid-cols-7 max-lg:grid-cols-5 mb-8 items-center"
                  key={0}
                >
                  <h3 className="font-bold max-md:text-lg">Position</h3>
                  <h3 className="font-bold max-lg:hidden">Location</h3>
                  <h3 className="font-bold max-lg:hidden">Job Status</h3>
                  <h3 className="font-bold max-md:text-lg">Apps</h3>
                  <h3 className="font-bold max-md:text-lg">Edit</h3>
                  <h3 className="font-bold max-md:text-lg">Cancel</h3>
                  <h3 className="font-bold max-md:text-lg">Delete</h3>
                </li>
                {companyJobs?.map((job, i) => {
                  return (
                    <li
                      className="grid max-md:gap-4 gap-12 grid-cols-7 my-2 max-lg:grid-cols-5 items-center"
                      key={job.job_id}
                    >
                      <p>{job.position}</p>
                      <p className="max-lg:hidden">{job.location}</p>
                      <p className="max-lg:hidden">
                        {job.status ? "open" : "closed"}
                      </p>
                      <button
                        className="btn border-0 duration-0 capitalize text-white bg-accent hover:bg-info min-w-[4rem]"
                        onClick={() => handleViewApplications(i)}
                      >
                        Applications
                      </button>
                      <button
                        className="btn border-0 duration-0 capitalize text-white bg-accent hover:bg-info min-w-[4rem]"
                        onClick={() => handleEditJob(i)}
                      >
                        <div className="flex gap-2 items-center">
                          Edit Job
                          <FaEdit />
                        </div>
                      </button>
                      <button
                        className="btn border-0 duration-0 capitalize text-white bg-red-500  hover:bg-red-200 min-w-[4rem]"
                        onClick={() => handleCancelJob(i)}
                      >
                        <div className="flex gap-2 items-center">
                          Close
                          <FaDoorClosed />
                        </div>
                      </button>
                      <button
                        className="btn border-0 duration-0 capitalize text-white bg-red-500 hover:bg-red-200 min-w-[4rem]"
                        onClick={() => handleDeleteJob(i)}
                      >
                        <div className="flex gap-2 items-center">
                          Delete
                          <MdDelete className="text-xl" />
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </main>
      </>
    );
  }
};

export default Dashboard;
