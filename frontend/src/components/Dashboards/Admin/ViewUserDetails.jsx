import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { getCsrfToken } from "../../../utils";

const Style = styled.section`
  position: absolute;
  top: 0;
  padding-top: 5rem;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
  width: 100%;
  min-height: 100dvh;
  white-space: pre-wrap;

  h2 {
    width: 15rem;
    text-align: left;
    margin: 0 auto;
  }

  p {
    width: 30rem;
    text-align: left;

    //media qeury from 768px
    @media screen and (min-width: 768px) and (max-width: 1279px) {
      width: 20rem;
    }

    //media query from max 768px
    @media screen and (max-width: 767px) {
      width: 15rem;
    }
  }

  @media screen and (max-width: 767px) {
    padding-top: 2rem;
  }
`;

const ViewUserDetails = ({
  setViewUserDetails,
  setIsMainVisible,
  selectedUser,
}) => {
  const { getAccessTokenSilently } = useAuth0();
  const allUsers = useSelector((state) => state.allUsers.allUsers);
  const user = allUsers[selectedUser];
  const param = user.user_id;
  const [userStats, setUserStats] = useState({});
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const csrfToken = getCsrfToken();

  useEffect(() => {
    const getUserStats = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get(`${baseUrl}/getUserStats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
          params: { id: param },
        });
        setUserStats(response.data);
      } catch (error) {
        console.error("Error calling API:", error);
      }
    };
    getUserStats();
  }, []);

  return (
    <Style>
      <button
        className="btn block m-auto border-0 text-white capitalize my-4 bg-red-500 hover:bg-red-200"
        onClick={() => {
          setViewUserDetails(false);
          setIsMainVisible(true);
        }}
      >
        CLOSE
      </button>
      <div
        className="flex flex-col justify-center items-center m-auto bg-neutral 
        max-md:w-[327px] max-md:p-6 md:w-[690px] xl:w-[1100px] shadow rounded-xl text-primary py-4"
      >
        <h1>User Statistics</h1>
        <div className="flex items-center max-md:gap-2 gap-8 max-md:flex-col max-md:text-center my-2">
          <h2>User_Id</h2>
          <p className="break-words">{user?.user_id}</p>
        </div>
        <div className="flex items-center max-md:gap-2 gap-8 max-md:flex-col max-md:text-center my-2">
          <h2>Fullname</h2>
          <p className="break-words">{user.fullname}</p>
        </div>
        <div className="flex items-center max-md:gap-2 gap-8 max-md:flex-col max-md:text-center my-2">
          <h2 className="self-start">Email</h2>
          <p className="break-words">{user?.email}</p>
        </div>
        <div className="flex items-center max-md:gap-2 gap-8 max-md:flex-col max-md:text-center my-2">
          <h2 className="text-left">Location</h2>
          <p className="break-words">{user?.location}</p>
        </div>
        {user?.role === "private" && (
          <div className="flex items-center max-md:gap-2 gap-8 max-md:flex-col max-md:text-center my-2">
            <h2>Applications</h2>
            <p className="break-words">{userStats?.applications?.length}</p>
          </div>
        )}
        {user?.role === "company" && (
          <div className="flex items-center max-md:gap-2 gap-8 max-md:flex-col max-md:text-center my-2">
            <h2>Jobs</h2>
            <p className="break-words">{userStats?.jobs?.length}</p>
          </div>
        )}
        {user?.role === "private" && (
          <div className="flex items-center max-md:gap-2 gap-8 max-md:flex-col max-md:text-center my-2">
            <h2>Messages</h2>
            <p className="break-words">{userStats?.messages?.length}</p>
          </div>
        )}
        {user?.role === "company" && (
          <div className="flex items-center max-md:gap-2 gap-8 max-md:flex-col max-md:text-center my-2">
            <h2>Replies</h2>
            <p className="break-words">{userStats?.replies?.length}</p>
          </div>
        )}
      </div>
    </Style>
  );
};

export default ViewUserDetails;
