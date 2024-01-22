import React from "react";
import { FiRefreshCw } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { TbListDetails } from "react-icons/tb";
import { GiCancel } from "react-icons/gi";
import { getUsers } from "../../slices/allUsersSlice";
import AdminFilter from "../AdminFilter";
import AdminSort from "../AdminSort";

const DashboardAdmin = ({
  handleRefresh,
  setIsMainVisible,
  setViewUserDetails,
  setSelectedUser,
}) => {
  const users = useSelector((state) => state.allUsers.allUsers);
  console.log(users);
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const handleViewUserDetails = (i) => {
    setViewUserDetails(true);
    setIsMainVisible(false);
    setSelectedUser(i);
  };

  const handleBan = async (i) => {
    const token = await getAccessTokenSilently();
    try {
      dispatch(getUsers({ allUsers: [], isLoading: true }));
      const response = await axios.put(
        "http://localhost:3000/banUser",
        { id: users[i].user_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      dispatch(getUsers({ allUsers: response.data, isLoading: false }));
      handleRefresh();
    } catch (error) {
      console.error(error);
    }
  };

  if (users?.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <section className="flex gap-12 justify-center items-center mb-10 m-auto max-md:w-[375px] md:w-[690px] xl:w-[1100px] px-4">
        <div className="flex gap-4 items-center">
          <h2 className="mt-5 text-center font-bold">Users</h2>
          <button
            onClick={handleRefresh}
            className="btn border-0 my-4 duration-0 capitalize text-white bg-accent hover:bg-info"
          >
            Refresh
            <FiRefreshCw />
          </button>
        </div>
      </section>
      <div className="flex gap-4 max-xl:justify-center justify-between items-center mb-10 flex-wrap m-auto max-md:w-[375px] md:w-[690px] xl:w-[1100px] px-4">
        <AdminFilter />
        <AdminSort />
      </div>
      <section className="m-auto max-md:w-[375px] md:w-[690px] xl:w-[1100px] px-4">
        <ul>
          <li
            className="max-xl:grid-cols-5 grid max-md:gap-4 gap-12 grid-cols-6 max-md:grid-cols-3 mb-8 items-center"
            key={0}
          >
            <h3 className="font-bold max-md:text-lg">Username</h3>
            <h3 className="font-bold max-md:text-lg">Avatar</h3>
            <h3 className="font-bold max-md:hidden">Role</h3>
            <h3 className="font-bold max-xl:hidden">Fullname</h3>
            <h3 className="font-bold max-md:text-lg">Details</h3>
            <h3 className="font-bold max-md:text-lg">Bann</h3>
          </li>
          {users?.map((user, i) => {
            return (
              <li
                className={`max-xl:grid-cols-5 grid max-md:gap-4 gap-12 grid-cols-6 my-2 max-md:grid-cols-3 items-center p-2 rounded ${
                  user?.is_banned === false ? "bg-neutral" : "bg-red-200"
                }`}
                key={user.user_id}
              >
                <p
                  className={
                    user?.is_banned === false ? "text-primary" : "text-black"
                  }
                >
                  {user.user_id}
                </p>
                <img
                  className="w-[2rem] h-[2rem] max-md:hidden"
                  src={user.picture}
                  alt={user.picture}
                />
                <p
                  className={
                    user?.is_banned === false
                      ? "text-primary max-md:hidden"
                      : "text-black max-md:hidden"
                  }
                >
                  {user.role}
                </p>
                <p
                  className={
                    user?.is_banned === false
                      ? "text-primary max-xl:hidden"
                      : "text-black max-xl:hidden"
                  }
                >
                  {user.fullname}
                </p>
                <button
                  className="btn border-0 duration-0 capitalize text-white bg-accent hover:bg-info min-w-[4rem]"
                  onClick={() => handleViewUserDetails(i)}
                >
                  <div className="flex gap-2 items-center">
                    Details
                    <TbListDetails className="max-md:hidden text-xl" />
                  </div>
                </button>
                <button
                  className="btn border-0 duration-0 capitalize text-white bg-red-500  hover:bg-red-200 min-w-[4rem]"
                  onClick={() => handleBan(i)}
                >
                  <div className="flex gap-2 items-center">
                    {user?.is_banned ? "Unban" : "Ban"}
                    <GiCancel className="max-md:hidden text-xl" />
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default DashboardAdmin;
