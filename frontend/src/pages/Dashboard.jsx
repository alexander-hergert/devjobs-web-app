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
import DashboardAdmin from "../components/Dashboards/DashboardAdmin";
import DashboardPrivate from "../components/Dashboards/DashboardPrivate";
import DashboardCompany from "../components/Dashboards/DashboardCompany";

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
  const navigate = useNavigate();
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isEditJob, setIsEditJob] = useState(false);
  const [isCreateJob, setIsCreateJob] = useState(false);
  const [isReadingMessages, setIsReadingMessages] = useState(false);
  const [isReadingReplies, setIsReadingReplies] = useState(false);
  const [isMainVisible, setIsMainVisible] = useState(true);
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
    setIsMainVisible(false);
  };

  const handleEditProfile = () => {
    setIsEditProfile(!isEditProfile);
  };

  const handleMessages = async () => {
    setIsReadingMessages(!isReadingMessages);
    setIsMainVisible(false);
  };

  const handleReplies = () => {
    setIsReadingReplies(!isReadingReplies);
    setIsMainVisible(false);
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
          <ReadMessages
            setIsReadingMessages={setIsReadingMessages}
            setIsMainVisible={setIsMainVisible}
          />
        )}
        {isReadingReplies && (
          <ReadReplies
            setIsReadingReplies={setIsReadingReplies}
            setIsMainVisible={setIsMainVisible}
          />
        )}
        {isEditJob && (
          <EditJob
            setIsEditJob={setIsEditJob}
            selectedJob={selectedJob}
            setIsMainVisible={setIsMainVisible}
          />
        )}
        {isCreateJob && (
          <CreateJobs
            setIsCreateJob={setIsCreateJob}
            setIsMainVisible={setIsMainVisible}
          />
        )}
        {viewDetails.isViewDetails && (
          <ViewAppDetails
            viewDetails={viewDetails}
            setViewDetails={setViewDetails}
            apps={apps}
            setIsMainVisible={setIsMainVisible}
          />
        )}
        {viewApplications && (
          <ViewApplications
            setViewApplications={setViewApplications}
            selectedJob={selectedJob}
            setIsMainVisible={setIsMainVisible}
          />
        )}
        {isMainVisible && (
          <main>
            <section className="flex justify-center gap-12 items-center mt-10">
              <div className="max-lg:flex max-md:block items-center gap-12">
                <ProfileImage>
                  <input
                    type="image"
                    src={user?.picture}
                    alt={user?.fullname}
                  />
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
                  className="w-[10rem] btn border-0 duration-0 capitalize text-white bg-accent hover:bg-info"
                >
                  <div className="flex gap-2 items-center">
                    Edit Profile
                    <FaEdit />
                  </div>
                </button>
                {user.role === "private" && (
                  <button
                    onClick={handleMessages}
                    className="w-[10rem] btn border-0 duration-0 capitalize text-white bg-accent hover:bg-info"
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
                    className="w-[10rem] btn border-0 my-2 duration-0 capitalize text-white bg-accent hover:bg-info"
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
            {/* Private User Table*/}
            {user?.role === "private" && (
              <DashboardPrivate
                setViewDetails={setViewDetails}
                setIsMainVisible={setIsMainVisible}
              />
            )}
            {/* Company User Table*/}
            {user?.role === "company" && (
              <DashboardCompany
                setViewApplications={setViewApplications}
                setSelectedJob={setSelectedJob}
                setIsMainVisible={setIsMainVisible}
                setIsEditJob={setIsEditJob}
              />
            )}
          </main>
        )}
      </>
    );
  }
};

export default Dashboard;
