import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TbListDetails } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { FaDoorClosed } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { getCompanyJobs } from "../../slices/companyJobsSlice";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import CompanyFilter from "../CompanyFilter";
import CompanySort from "../CompanySort";

const DashboardCompany = ({
  setViewApplications,
  setSelectedJob,
  setIsMainVisible,
  setIsEditJob,
}) => {
  const companyJobs = useSelector((state) => state.companyJobs.companyJobs);
  console.log(companyJobs);
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const handleViewApplications = async (i) => {
    setViewApplications(true);
    setSelectedJob(i);
    setIsMainVisible(false);
  };

  const handleEditJob = (i) => {
    setIsEditJob(true);
    setSelectedJob(i);
    setIsMainVisible(false);
  };

  const handleDeleteJob = async (i) => {
    //get job id
    const data = {
      job_id: companyJobs[i].job_id,
    };
    console.log(data);
    try {
      const token = await getAccessTokenSilently();
      const response = await axios({
        method: "delete",
        url: "http://localhost:3000/deletejob",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //update companyJobs state
      dispatch(
        getCompanyJobs({ companyJobs: response.data, isLoading: false })
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  const handleCancelJob = async (i) => {
    //get job id
    const data = {
      job_id: companyJobs[i].job_id,
    };
    console.log(data);
    try {
      const token = await getAccessTokenSilently();
      const response = await axios({
        method: "put",
        url: "http://localhost:3000/canceljob",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //update companyJobs state
      dispatch(
        getCompanyJobs({ companyJobs: response.data, isLoading: false })
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  return (
    <>
      <div className="flex gap-4 max-xl:justify-center justify-between items-center mb-10 flex-wrap m-auto max-md:w-[375px] md:w-[690px] xl:w-[1100px] px-4">
        <CompanyFilter />
        <CompanySort />
      </div>
      <section className="m-auto max-md:w-[375px] md:w-[690px] xl:w-[1100px] px-4">
        <ul>
          <li
            className="max-xl:grid-cols-5 grid max-md:gap-4 gap-12 grid-cols-7 mb-8 items-center"
            key={0}
          >
            <h3 className="font-bold max-md:text-lg">Position</h3>
            <h3 className="font-bold max-xl:hidden">Location</h3>
            <h3 className="font-bold max-xl:hidden">Job Status</h3>
            <h3 className="font-bold max-md:text-lg">Apps</h3>
            <h3 className="font-bold max-md:text-lg">Edit</h3>
            <h3 className="font-bold max-md:text-lg">Cancel</h3>
            <h3 className="font-bold max-md:text-lg">Delete</h3>
          </li>
          {companyJobs?.map((job, i) => {
            return (
              <li
                className="max-xl:grid-cols-5 grid max-md:gap-4 gap-12 grid-cols-7 my-2 items-center p-2 bg-neutral"
                key={job.job_id}
              >
                <p className="text-sm">{job.position}</p>
                <p className="max-xl:hidden">{job.location}</p>
                <p className="max-xl:hidden">
                  {job.status ? "open" : "closed"}
                </p>
                <button
                  className="btn border-0 duration-0 capitalize text-white bg-accent hover:bg-info min-w-[4rem]"
                  onClick={() => handleViewApplications(i)}
                >
                  <div className="flex gap-2 items-center">
                    Apps
                    <TbListDetails className="max-md:hidden text-xl" />
                  </div>
                </button>
                <button
                  className="btn border-0 duration-0 capitalize text-white bg-accent hover:bg-info min-w-[4rem]"
                  onClick={() => handleEditJob(i)}
                >
                  <div className="flex gap-2 items-center">
                    Edit Job
                    <FaEdit className="max-md:hidden text-xl" />
                  </div>
                </button>
                <button
                  className="btn border-0 duration-0 capitalize text-white bg-red-500  hover:bg-red-200 min-w-[4rem]"
                  onClick={() => handleCancelJob(i)}
                >
                  <div className="flex gap-2 items-center">
                    Close
                    <FaDoorClosed className="max-md:hidden text-xl" />
                  </div>
                </button>
                <button
                  className="btn border-0 duration-0 capitalize text-white bg-red-500 hover:bg-red-200 min-w-[4rem]"
                  onClick={() => handleDeleteJob(i)}
                >
                  <div className="flex gap-2 items-center">
                    Delete
                    <MdDelete className="max-md:hidden text-xl" />
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

export default DashboardCompany;
