import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditProfile from "../components/Dashboards/Profile/EditProfile";
import EditJob from "../components/Dashboards/Company/EditJob";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../components/Global/Loader";
import axios from "axios";
import { getApps } from "../slices/appsSlice";
import ViewAppDetails from "../components/Dashboards/Private/ViewAppDetails";
import CreateJobs from "../components/Dashboards/Company/CreateJobs";
import { getCompanyJobs } from "../slices/companyJobsSlice";
import ViewApplications from "../components/Dashboards/Company/ViewApplications";
import ReadMessages from "../components/Dashboards/Private/ReadMessages";
import ReadReplies from "../components/Dashboards/Company/ReadReplies";
import styled from "styled-components";
import UploadWidget from "../components/Dashboards/Profile/UploadWidget";
import { FaEdit } from "react-icons/fa";
import DashboardAdmin from "../components/Dashboards/Admin/DashboardAdmin";
import DashboardPrivate from "../components/Dashboards/Private/DashboardPrivate";
import DashboardCompany from "../components/Dashboards/Company/DashboardCompany";
import MessageButton from "../components/Dashboards/Private/MessageButton";
import ReplyButton from "../components/Dashboards/Company/ReplyButton";
import { getUsers } from "../slices/allUsersSlice";
import ViewUserDetails from "../components/Dashboards/Admin/ViewUserDetails";

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
  const [selectedUser, setSelectedUser] = useState(0); //for admin
  const [viewApplications, setViewApplications] = useState(false);
  const [viewUserDetails, setViewUserDetails] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = async () => {
    //if user is admin
    if (user?.role === "admin") {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get(`${baseUrl}/getUsers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        dispatch(getUsers({ allUsers: response.data, isLoading: false }));
      } catch (error) {
        console.error("Error calling API:", error);
      }
    }
    //if user is private
    if (user?.role === "private") {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get(`${baseUrl}/appliedJobs`, {
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
        const response = await axios.get(`${baseUrl}/getCompanyJobs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        dispatch(
          getCompanyJobs({ companyJobs: response.data, isLoading: false })
        );
      } catch (error) {
        console.error("Error calling API:", error);
      }
    }
  };

  const handleEditProfile = () => {
    setIsEditProfile(!isEditProfile);
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

  //user banned no access
  if (user?.is_banned) {
    return (
      <section className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-center">
          You have been banned from Devjobs.
        </h1>
      </section>
    );
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
        {viewUserDetails && (
          <ViewUserDetails
            setViewUserDetails={setViewUserDetails}
            setIsMainVisible={setIsMainVisible}
            selectedUser={selectedUser}
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
                  <MessageButton
                    setIsReadingMessages={setIsReadingMessages}
                    setIsMainVisible={setIsMainVisible}
                  />
                )}
                {user.role === "company" && (
                  <ReplyButton
                    setIsReadingReplies={setIsReadingReplies}
                    setIsMainVisible={setIsMainVisible}
                  />
                )}
              </div>
            </section>
            {/* Admin User*/}
            {user?.role === "admin" && (
              <DashboardAdmin
                setIsMainVisible={setIsMainVisible}
                handleRefresh={handleRefresh}
                setViewUserDetails={setViewUserDetails}
                setSelectedUser={setSelectedUser}
              />
            )}
            {/* Private User*/}
            {user?.role === "private" && (
              <DashboardPrivate
                setViewDetails={setViewDetails}
                setIsMainVisible={setIsMainVisible}
                handleRefresh={handleRefresh}
              />
            )}
            {/* Company User*/}
            {user?.role === "company" && (
              <DashboardCompany
                setViewApplications={setViewApplications}
                setSelectedJob={setSelectedJob}
                setIsMainVisible={setIsMainVisible}
                setIsEditJob={setIsEditJob}
                handleRefresh={handleRefresh}
                setIsCreateJob={setIsCreateJob}
              />
            )}
          </main>
        )}
      </>
    );
  }
};

export default Dashboard;
