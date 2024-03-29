import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TbListDetails } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { FaDoorClosed } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { getCompanyJobs } from "../../../slices/companyJobsSlice";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import CompanyFilter from "./CompanyFilter";
import CompanySort from "./CompanySort";
import { FiRefreshCw } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { getCsrfToken } from "../../../utils";
import { toast, ToastContainer } from "react-toastify";
import DeleteModal from "../DeleteModal";
import { Link } from "react-router-dom";

const DashboardCompany = ({
  setViewApplications,
  setSelectedJob,
  setIsMainVisible,
  setIsEditJob,
  handleRefresh,
  setIsCreateJob,
}) => {
  const companyJobs = useSelector((state) => state.companyJobs.companyJobs);
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const csrfToken = getCsrfToken();
  const user = useSelector((state) => state.user.user);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [itemId, setItemId] = useState(null);

  const handleViewApplications = async (i) => {
    setViewApplications(true);
    setSelectedJob(i);
    setIsMainVisible(false);
  };

  const handleModal = (i) => {
    setIsDeleteModalVisible(true);
    setItemId(i);
  };

  const handleEditJob = (i) => {
    setIsEditJob(true);
    setSelectedJob(i);
    setIsMainVisible(false);
  };

  const handleDelete = async (i) => {
    //get job id
    const data = {
      job_id: companyJobs[i].job_id,
    };
    try {
      const token = await getAccessTokenSilently();
      const response = await axios({
        method: "delete",
        url: `${baseUrl}/deletejob`,
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
          "X-CSRF-TOKEN": csrfToken,
        },
        withCredentials: true,
      });
      //update companyJobs state
      dispatch(
        getCompanyJobs({ companyJobs: response.data, isLoading: false })
      );
      setIsDeleteModalVisible(false);
    } catch (error) {
      console.error("Error calling API:", error);
      toast.error("Error deleting job", {
        toastId: "error-deleting-job",
      });
    }
  };

  const handleCancelJob = async (i) => {
    //get job id
    const data = {
      job_id: companyJobs[i].job_id,
    };
    try {
      const token = await getAccessTokenSilently();
      const response = await axios({
        method: "put",
        url: `${baseUrl}/statusjob`,
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
          "X-CSRF-TOKEN": csrfToken,
        },
        withCredentials: true,
      });
      //update companyJobs state
      dispatch(
        getCompanyJobs({ companyJobs: response.data, isLoading: false })
      );
    } catch (error) {
      console.error("Error calling API:", error);
      toast.error("Error updating job status");
    }
  };

  const handleCreateJob = () => {
    setIsCreateJob(true);
    setIsMainVisible(false);
  };

  return (
    <>
      {isDeleteModalVisible && (
        <DeleteModal
          id={itemId}
          handleDelete={handleDelete}
          setIsDeleteModalVisible={setIsDeleteModalVisible}
          user={user}
        />
      )}
      <ToastContainer />
      <section className="flex gap-12 justify-center items-center mb-10 m-auto max-md:w-[375px] md:w-[690px] xl:w-[1100px] px-4">
        <div className="flex gap-4 items-center">
          <h2 className="mt-5 text-center font-bold">Jobs</h2>
          <button
            onClick={handleRefresh}
            className="btn border-0 my-4 duration-0 capitalize text-white bg-accent hover:bg-info"
          >
            Refresh
            <FiRefreshCw />
          </button>
        </div>
        <button
          onClick={handleCreateJob}
          className="btn border-0 my-4 duration-0 capitalize text-white bg-accent hover:bg-info"
        >
          Create New Joboffer <FaPlus />
        </button>
      </section>
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
                <Link to={`/${job.job_id}`} className="text-sm text-accent">
                  {job.position}
                </Link>
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
                  className={`btn border-0 duration-0 capitalize text-white min-w-[4rem] ${
                    job.status
                      ? "bg-red-500 hover:bg-red-200"
                      : "bg-green-500 hover:bg-green-200"
                  }`}
                  onClick={() => handleCancelJob(i)}
                >
                  <div className="flex gap-2 items-center">
                    {job.status ? "Close" : "Open"}
                    <FaDoorClosed className="max-md:hidden text-xl" />
                  </div>
                </button>
                <button
                  className="btn border-0 duration-0 capitalize text-white bg-red-500 hover:bg-red-200 min-w-[4rem]"
                  onClick={() => handleModal(i)}
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
