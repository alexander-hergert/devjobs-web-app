import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Menubar from "../components/Menubar";
import Footer from "../components/Footer";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getApps } from "../slices/appsSlice";
import { setUser } from "../slices/userSlice";
import { getUsers } from "../slices/allUsersSlice";
import { getCompanyJobs } from "../slices/companyJobsSlice";
import { getTotalJobs } from "../slices/totalJobsSlice";

//shared code goes into jsx
const SharedLayout = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const user = useSelector((state) => state.user.user);
  const location = useLocation();

  //public
  useEffect(() => {
    const callApi = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get("http://localhost:3000/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data[0]);
        dispatch(setUser({ user: response.data[0], isLoading: false }));
      } catch (error) {
        dispatch(setUser({ user: undefined, isLoading: false }));
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
        const response = await axios.get("http://localhost:3000/getUsers", {
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
        axios.get("http://localhost:3000/jobs").then((response) => {
          dispatch(getTotalJobs({ payload: response.data[1] }));
          console.log(response.data);
        });
      } else {
        //Query string is present
        axios
          .get(`http://localhost:3000/jobs${location.search}`)
          .then((response) => {
            dispatch(getTotalJobs({ payload: response.data[1] }));
            console.log(response.data);
          });
      }
    } catch (error) {}
  }, [location.search]);

  return (
    <>
      <Menubar />
      <Outlet />
      <Footer />
    </>
  );
};

export default SharedLayout;
