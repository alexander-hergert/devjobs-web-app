import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { getApps } from "../slices/appsSlice";
import { useDispatch, useSelector } from "react-redux";

const DashboardFilter = () => {
  const dispatch = useDispatch();
  const apps = useSelector((state) => state.apps.apps);
  const applications = apps?.applications;
  const [allApps, setAllApps] = useState(apps);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    let { search, contract } = data || { search: "", contract: "" };
    console.log(search, contract);
    if (contract === true) {
      contract = "Full Time";
    } else {
      contract = "Part Time";
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
          job.position.toLowerCase().includes(search.toLowerCase()) ||
          job.company.toLowerCase().includes(search.toLowerCase()) ||
          job.location.toLowerCase().includes(search.toLowerCase()) ||
          job.description.toLowerCase().includes(search.toLowerCase()) ||
          (job.requirements.toLowerCase().includes(search.toLowerCase()) &&
            job.contract === "Part Time")
        );
      } else if (contract) {
        console.log(contract);
        return job.contract === contract;
      }
    });
    console.log(filteredJobs);
    dispatch(getApps({ payload: { applications, appliedJobs: filteredJobs } }));
  };

  return (
    <div>
      <form className="flex gap-4" action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4 items-center">
          <label className="font-bold text-2xl" htmlFor="filter">
            Filter
          </label>
          <input
            type="text"
            id="filter"
            {...register("search")}
            className="bg-neutral outline-none"
          />
        </div>
        <div className="flex gap-4 items-center">
          <label className="font-bold text-2xl" htmlFor="contract">
            Fulltime
          </label>
          <input
            type="checkbox"
            id="contract"
            {...register("contract")}
            className="bg-neutral outline-none"
          />
        </div>
        <button className="flex gap-2 btn border-0 my-4 duration-0 capitalize text-white bg-accent hover:bg-info">
          Search
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default DashboardFilter;
