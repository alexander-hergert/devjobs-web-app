import React from "react";
import { FiRefreshCw } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { TbListDetails } from "react-icons/tb";
import { GiCancel } from "react-icons/gi";
import { getApps } from "../../slices/appsSlice";


const DashboardAdmin = ({ handleRefresh }) => {
  const apps = useSelector((state) => state.apps.apps);
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

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
        <h2>UsersFilter</h2>
        <h2>UsersSort</h2>
      </div>
      <section className="m-auto max-md:w-[375px] md:w-[690px] xl:w-[1100px] px-4">
        <ul>
          <li
            className="max-xl:grid-cols-5 grid max-md:gap-4 gap-12 grid-cols-7 max-md:grid-cols-4 mb-8 items-center"
            key={0}
          >
            <h3 className="font-bold max-md:text-lg">Username</h3>
            <h3 className="font-bold max-md:text-lg">aaa</h3>
            <h3 className="font-bold max-md:hidden">bbb</h3>
            <h3 className="font-bold max-xl:hidden">ccc</h3>
            <h3 className="font-bold max-xl:hidden">ddd</h3>
            <h3 className="font-bold max-md:text-lg">Bann</h3>
            <h3 className="font-bold max-md:text-lg">Unbann</h3>
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

export default DashboardAdmin;
