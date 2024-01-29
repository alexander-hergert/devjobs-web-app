import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Menubar from "../components/Home/Menubar";
import Footer from "../components/Global/Footer";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getApps } from "../slices/appsSlice";
import { setUser } from "../slices/userSlice";
import { getUsers } from "../slices/allUsersSlice";
import { getCompanyJobs } from "../slices/companyJobsSlice";
import { getTotalJobs } from "../slices/totalJobsSlice";
import { ToastContainer, toast } from "react-toastify";

//shared code goes into jsx
const SharedLayout = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  console.log(user);

  //public
  useEffect(() => {
    const callApi = async () => {
      try {
        const token = await getAccessTokenSilently();
        console.log(token);
        const response = await axios.get(`${baseUrl}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data[0]);
        dispatch(setUser({ user: response.data[0], isLoading: false }));
      } catch (error) {
        dispatch(setUser({ user: undefined, isLoading: false }));
        toast.error("Your account has beend banned.", {
          toastId: "userError",
        });
      }
    };
    if (!user?.user_id) {
      dispatch(setUser({ user: undefined, isLoading: true }));
      callApi();
    }
  }, []);

  //private
  useEffect(() => {
    const callApi = async () => {
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
    };
    if (!user?.user_id && isAuthenticated) {
      callApi();
    }
  }, [isAuthenticated]);

  //company
  useEffect(() => {
    const callApi = async () => {
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
    };
    if (!user?.user_id && isAuthenticated) {
      callApi();
    }
  }, [isAuthenticated]);

  //admin
  useEffect(() => {
    const callApi = async () => {
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
    };
    if (!user?.user_id && isAuthenticated) {
      callApi();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    try {
      if (!location.search) {
        axios.get(`${baseUrl}/jobs`).then((response) => {
          dispatch(getTotalJobs({ payload: response.data[1] }));
          console.log(response.data);
        });
      } else {
        //Query string is present
        axios.get(`${baseUrl}/jobs${location.search}`).then((response) => {
          dispatch(getTotalJobs({ payload: response.data[1] }));
          console.log(response.data);
        });
      }
    } catch (error) {}
  }, [location.search]);

  return (
    <>
      <ToastContainer />
      <Menubar />
      <Outlet />
      <Footer />
    </>
  );
};

export default SharedLayout;
