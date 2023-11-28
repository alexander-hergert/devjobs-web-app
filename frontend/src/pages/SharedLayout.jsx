import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Menubar from "../components/Menubar";
import Footer from "../components/Footer";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getApps } from "../slices/appsSlice";
import { setUser } from "../slices/userSlice";

//shared code goes into jsx
const SharedLayout = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const user = useSelector((state) => state.user.user);

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
    if (!user?.user_id && isAuthenticated) {
      callApi();
    }
  }, [isAuthenticated]);

  return (
    <>
      <Menubar />
      <Outlet />
      <Footer />
    </>
  );
};

export default SharedLayout;
