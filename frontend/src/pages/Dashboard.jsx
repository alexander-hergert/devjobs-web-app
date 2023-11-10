import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditProfile from "../components/EditProfile";
import EditJob from "../components/EditJob";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../components/Loader";
import axios from "axios";
import { setUser } from "../slices/userSlice";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isEditJob, setIsEditJob] = useState(false);
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    const callApi = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get("http://localhost:3000/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setUser({ payload: response.data[0] }));
      } catch (error) {
        console.error("Error calling API:", error);
      }
    };
    callApi();
  }, []);

  const handleEditProfile = () => {
    setIsEditProfile(!isEditProfile);
  };

  const handleEditJob = () => {
    setIsEditJob(!isEditJob);
  };

  //Route Protection
  useEffect(() => {
    if (!user && !isLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [user, isLoading, isAuthenticated]);

  if (isLoading) {
    return <Loader />;
  }

  if (isAuthenticated && user) {
    return (
      <>
        {isEditProfile && (
          <EditProfile setIsEditProfile={setIsEditProfile} user={user} />
        )}
        {isEditJob && <EditJob setIsEditJob={setIsEditJob} />}
        <main>
          <section className="flex justify-around items-center mt-10">
            <img
              className="w-[10rem] h-[10rem] rounded-full"
              src={user?.picture}
              alt={user?.fullname}
            />
            <h1>
              Hello, <span className="font-bold">{user?.fullname}</span>.
              Welcome to Devjobs!
            </h1>
            <button onClick={handleEditProfile} className="btn">
              Edit Profile
            </button>
          </section>
          <h2 className="my-5 text-center font-bold">Jobs</h2>
          <section className="flex justify-around items-center">
            <ul>
              <li className="flex items-center gap-2">
                <h3>Job Title</h3>
                <p>Company Name</p>
                <p>Location</p>
                <p>Status</p>
                <button className="btn">View Details (Link to Job)</button>
                <button onClick={handleEditJob} className="btn">
                  Edit Job
                </button>
              </li>
            </ul>
          </section>
        </main>
      </>
    );
  }
};

export default Dashboard;
