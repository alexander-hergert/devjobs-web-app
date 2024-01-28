import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { getApps } from "../../../slices/appsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DashboardFilter = () => {
  const dispatch = useDispatch();
  const apps = useSelector((state) => state.apps.apps);
  const [allApps, setAllApps] = useState(apps);
  const isLoading = useSelector((state) => state.apps.isLoading);
  const navigate = useNavigate();

  useEffect(() => {
    setAllApps(apps);
  }, [isLoading]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //execute submit with queryparams on load
  const params = new URLSearchParams(window.location.search);
  const search = params.get("search");
  const contract = params.get("contract");

  useEffect(() => {
    const data = { search, contract };
    console.log(allApps);
    if (allApps) {
      if (Object.keys(allApps).length !== 0 && (search || contract)) {
        onSubmit(data);
      }
    }
  }, [allApps]);

  const onSubmit = (data) => {
    console.log(data);
    let { search, contract } = data || { search: "", contract: true };
    console.log(search, contract);
    if (contract === true) {
      contract = "Full Time";
    } else if (contract === false) {
      contract = "Part Time";
    } else {
      contract = contract;
    }

    //filter apps
    const filteredJobs = allApps?.appliedJobs?.filter((job) => {
      if (search && contract === "Full Time") {
        return (
          (job.position.toLowerCase().includes(search.toLowerCase()) ||
            job.company.toLowerCase().includes(search.toLowerCase()) ||
            job.location.toLowerCase().includes(search.toLowerCase()) ||
            job.description.toLowerCase().includes(search.toLowerCase()) ||
            job.requirements.toLowerCase().includes(search.toLowerCase())) &&
          job.contract === "Full Time"
        );
      } else if (search && contract === "Part Time") {
        return (
          (job.position.toLowerCase().includes(search.toLowerCase()) ||
            job.company.toLowerCase().includes(search.toLowerCase()) ||
            job.location.toLowerCase().includes(search.toLowerCase()) ||
            job.description.toLowerCase().includes(search.toLowerCase()) ||
            job.requirements.toLowerCase().includes(search.toLowerCase())) &&
          job.contract === "Part Time"
        );
      } else if (contract) {
        console.log(contract);
        return job.contract === contract;
      }
    });
    console.log(filteredJobs);
    const filteredJobdIds = filteredJobs.map((job) => job.job_id);
    console.log(filteredJobdIds);
    //filter applications
    const filteredApplications = allApps?.applications?.filter((app) => {
      return filteredJobdIds.includes(app.job_id);
    });
    console.log(filteredApplications);
    //sort filtered applications by job_id
    filteredApplications?.sort((a, b) => {
      return (
        filteredJobdIds.indexOf(a.job_id) - filteredJobdIds.indexOf(b.job_id)
      );
    });
    dispatch(
      getApps({
        apps: {
          applications: filteredApplications,
          appliedJobs: filteredJobs,
        },
        isLoading: false,
      })
    );
    //navigate user to query
    navigate(`?search=${search}&contract=${contract}`);
  };

  return (
    <form
      className="flex gap-4 max-md:flex-col max-md:w-[375px]"
      action=""
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex max-md:flex-col gap-4 items-center">
        <div className="max-md:self-start flex gap-4 items-center">
          <label className="font-bold text-2xl" htmlFor="filter">
            Filter
          </label>
          <input
            type="text"
            id="filter"
            {...register("search")}
            className="w-[265px] bg-neutral outline-none border-2 border-gray-500 rounded-md"
            defaultValue={search}
          />
        </div>
        <div className="max-md:self-start flex gap-4 items-center">
          <label className="font-bold text-2xl" htmlFor="contract">
            Fulltime
          </label>
          <input
            type="checkbox"
            id="contract"
            {...register("contract")}
            className="bg-neutral outline-none"
            defaultChecked={contract === "Full Time"}
          />
        </div>
      </div>
      <button className="flex gap-2 btn border-0 my-4 duration-0 capitalize text-white bg-accent hover:bg-info">
        Search
        <FaSearch />
      </button>
    </form>
  );
};

export default DashboardFilter;
