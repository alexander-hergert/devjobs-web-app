import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditProfile from "../components/EditProfile";
import EditJob from "../components/EditJob";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../components/Loader";
import axios from "axios";
import { setUser } from "../slices/userSlice";
import { getApps } from "../slices/appsSlice";
import ViewAppDetails from "../components/ViewAppDetails";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);

  const apps = useSelector((state) => state.apps.apps);
  const navigate = useNavigate();
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isEditJob, setIsEditJob] = useState(false);
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const [viewDetails, setViewDetails] = useState({
    data: 0,
    isViewDetails: false,
  });

  // useEffect(() => {
  //   const callApi = async () => {
  //     try {
  //       const token = await getAccessTokenSilently();
  //       const response = await axios.get("http://localhost:3000/user", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       dispatch(setUser({ payload: response.data[0] }));
  //     } catch (error) {
  //       console.error("Error calling API:", error);
  //     }
  //   };
  //   callApi();
  // }, []);

  // useEffect(() => {
  //   const callApi = async () => {
  //     try {
  //       const token = await getAccessTokenSilently();
  //       const response = await axios.get("http://localhost:3000/appliedJobs", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       console.log(response.data);
  //       dispatch(getApps({ payload: response.data }));
  //     } catch (error) {
  //       console.error("Error calling API:", error);
  //     }
  //   };
  //   callApi();
  // }, []);

  const handleEditProfile = () => {
    setIsEditProfile(!isEditProfile);
  };

  const handleEditJob = () => {
    setIsEditJob(!isEditJob);
  };

  const handleViewDetails = (i) => {
    setViewDetails({ data: i, isViewDetails: true });
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
      dispatch(getApps({ payload: response.data }));
      console.log(response.data);
    } catch (error) {
      console.error("Error calling API:", error);
    }
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
        {viewDetails.isViewDetails && (
          <ViewAppDetails
            viewDetails={viewDetails}
            setViewDetails={setViewDetails}
            apps={apps}
          />
        )}
        <main>
          <section className="flex justify-center gap-12 items-center mt-10">
            <div className="max-lg:flex max-md:block items-center gap-12">
              <img
                className="w-[10rem] h-[10rem] rounded-full"
                src={user?.picture}
                alt={user?.fullname}
              />
              <h1 className="lg:hidden">
                <span className="font-bold text-lg">{user?.fullname}</span>
              </h1>
            </div>
            <h1 className="max-lg:hidden">
              Hello, <span className="font-bold">{user?.fullname}</span>.
              Welcome to Devjobs!
            </h1>
            <button onClick={handleEditProfile} className="btn duration-0">
              Edit Profile
            </button>
          </section>
          <h2 className="mt-5 mb-10 text-center font-bold">Applications</h2>
          <section className="m-auto max-md:w-[375px] md:w-[690px] xl:w-[1100px] px-4">
            <ul>
              <li
                className="grid max-md:gap-4 gap-12 grid-cols-7 max-lg:grid-cols-4 mb-8"
                key={0}
              >
                <h3 className="font-bold max-md:text-lg">Position</h3>
                <h3 className="font-bold max-md:text-lg">Company</h3>
                <h3 className="font-bold max-lg:hidden">Location</h3>
                <h3 className="font-bold max-lg:hidden">Job Status</h3>
                <h3 className="font-bold max-lg:hidden">App Status</h3>
                <h3 className="font-bold max-md:text-lg">Details</h3>
                <h3 className="font-bold max-md:text-lg">Cancel</h3>
                {user.role === "company" && <p>Edit</p>}
              </li>
              {apps?.appliedJobs?.map((job, i) => {
                return (
                  <li
                    className="grid max-md:gap-4 gap-12 grid-cols-7 my-2 max-lg:grid-cols-4"
                    key={job.job_id}
                  >
                    <p>{job.position}</p>
                    <p>{job.company}</p>
                    <p className="max-lg:hidden">{job.location}</p>
                    <p className="max-lg:hidden">{job.status ? "open" : "closed"}</p>
                    <p className="max-lg:hidden">
                      {apps?.applications[i].app_status}
                    </p>
                    <button
                      className="btn duration-0 capitalize min-w-[4rem]"
                      onClick={() => handleViewDetails(i)}
                    >
                      View Details
                    </button>
                    {/* {user.role === "company" && (
                      <button onClick={handleEditJob} className="btn">
                        Edit Job
                      </button>
                    )} */}
                    <button
                      className="btn duration-0 capitalize min-w-[4rem]"
                      onClick={() => handleCancel(i)}
                    >
                      Cancel App
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        </main>
      </>
    );
  }
};

export default Dashboard;
