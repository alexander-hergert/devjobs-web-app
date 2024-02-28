import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { TbListDetails } from "react-icons/tb";
import { GiCancel } from "react-icons/gi";
import { getApps } from "../../../slices/appsSlice";
import DashboardFilter from "./DashboardFilter";
import DashboardSort from "./DashboardSort";
import { FiRefreshCw } from "react-icons/fi";
import { getCsrfToken } from "../../../utils";
import { toast, ToastContainer } from "react-toastify";

const DashboardPrivate = ({
  setViewDetails,
  setIsMainVisible,
  handleRefresh,
}) => {
  const apps = useSelector((state) => state.apps.apps);
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const csrfToken = getCsrfToken();

  const handleViewDetails = (i) => {
    setViewDetails({ data: i, isViewDetails: true });
    setIsMainVisible(false);
  };

  const handleCancel = async (i) => {
    //get application id
    const data = {
      app_id: apps?.applications[i].app_id,
    };
    try {
      const token = await getAccessTokenSilently();
      const response = await axios({
        method: "delete",
        url: `${baseUrl}/application`,
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
          "X-CSRF-TOKEN": csrfToken,
        },
        withCredentials: true,
      });
      //update apps state
      dispatch(getApps({ apps: response.data, isLoading: false }));
    } catch (error) {
      console.error("Error calling API:", error);
      toast.error("Error cancelling application", {
        toastId: "error-cancelling-application",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="flex gap-12 justify-center items-center mb-10 m-auto max-md:w-[375px] md:w-[690px] xl:w-[1100px] px-4">
        <div className="flex gap-4 items-center">
          <h2 className="mt-5 text-center font-bold">Applications</h2>
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
        <DashboardFilter />
        <DashboardSort />
      </div>
      <section className="m-auto max-md:w-[375px] md:w-[690px] xl:w-[1100px] px-4">
        <ul>
          <li
            className="max-xl:grid-cols-5 grid max-md:gap-4 gap-12 grid-cols-7 max-md:grid-cols-4 mb-8 items-center"
            key={0}
          >
            <h3 className="font-bold max-md:text-lg">Position</h3>
            <h3 className="font-bold max-md:text-lg">Company</h3>
            <h3 className="font-bold max-md:hidden">Location</h3>
            <h3 className="font-bold max-xl:hidden">Job Status</h3>
            <h3 className="font-bold max-xl:hidden">App Status</h3>
            <h3 className="font-bold max-md:text-lg">Details</h3>
            <h3 className="font-bold max-md:text-lg">Cancel</h3>
          </li>
          {apps?.appliedJobs?.map((job, i) => {
            return (
              <li
                className={`max-xl:grid-cols-5 grid max-md:gap-4 gap-12 grid-cols-7 my-2 max-md:grid-cols-4 items-center p-2 rounded ${
                  apps?.applications[i].app_status === "Accepted"
                    ? "bg-green-200"
                    : apps?.applications[i].app_status === "Denied"
                    ? "bg-red-200"
                    : "bg-neutral"
                }`}
                key={job.job_id}
              >
                <p
                  className={
                    apps?.applications[i].app_status === "Pending"
                      ? "text-primary"
                      : "text-black"
                  }
                >
                  {job.position}
                </p>
                <p
                  className={
                    apps?.applications[i].app_status === "Pending"
                      ? "text-primary"
                      : "text-black"
                  }
                >
                  {job.company}
                </p>
                <p
                  className={
                    apps?.applications[i].app_status === "Pending"
                      ? "text-primary max-md:hidden"
                      : "text-black max-md:hidden"
                  }
                >
                  {job.location}
                </p>
                <p
                  className={
                    apps?.applications[i].app_status === "Pending"
                      ? "text-primary max-xl:hidden"
                      : "text-black max-xl:hidden"
                  }
                >
                  {job.status ? "open" : "closed"}
                </p>
                <p
                  className={
                    apps?.applications[i].app_status === "Pending"
                      ? "text-primary max-xl:hidden"
                      : "text-black max-xl:hidden"
                  }
                >
                  {apps?.applications[i].app_status}
                </p>
                <button
                  className="btn border-0 duration-0 capitalize text-white bg-accent hover:bg-info min-w-[4rem]"
                  onClick={() => handleViewDetails(i)}
                >
                  <div className="flex gap-2 items-center">
                    Details
                    <TbListDetails className="max-md:hidden text-xl" />
                  </div>
                </button>
                <button
                  className="btn border-0 duration-0 capitalize text-white bg-red-500  hover:bg-red-200 min-w-[4rem]"
                  onClick={() => handleCancel(i)}
                >
                  <div className="flex gap-2 items-center">
                    Cancel
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

export default DashboardPrivate;
