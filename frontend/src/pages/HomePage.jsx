import React, { useEffect } from "react";
import Filter from "../components/Filter";
import Jobs from "../components/Jobs";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getApps } from "../slices/appsSlice";
import { setUser } from "../slices/userSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const user = useSelector((state) => state.user.user);
  console.log(user);
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
    if (!user) {
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

  return (
    <main className="w-[1100px] m-auto">
      <Filter />
      <Jobs />
    </main>
  );
};

export default HomePage;
