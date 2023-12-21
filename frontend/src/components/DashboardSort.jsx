import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getApps } from "../slices/appsSlice";
import { useDispatch, useSelector } from "react-redux";

const DashboardSort = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const apps = useSelector((state) => state.apps.apps);

  const onSubmit = (data) => {
    console.log(data);
    const { typesort, rowsort } = data;
    let sortedApps = [...apps?.applications];
    const sortedJobs = [...apps?.appliedJobs];
    console.log(sortedApps);
    console.log(sortedJobs);

    if (typesort === "position") {
      sortedJobs?.sort((a, b) => {
        if (rowsort === "asc") {
          return a.position.localeCompare(b.position);
        } else {
          return b.position.localeCompare(a.position);
        }
      });
    } else if (typesort === "company") {
      sortedJobs?.sort((a, b) => {
        if (rowsort === "asc") {
          return a.company.localeCompare(b.company);
        } else {
          return b.company.localeCompare(a.company);
        }
      });
    } else if (typesort === "location") {
      sortedJobs?.sort((a, b) => {
        if (rowsort === "asc") {
          return a.location.localeCompare(b.location);
        } else {
          return b.location.localeCompare(a.location);
        }
      });
    }

    console.log(sortedJobs);

    const sortedJobsIds = sortedJobs?.map((job) => job.job_id);
    console.log(sortedJobsIds);

    //sort apps by job ids
    sortedApps?.sort((a, b) => {
      return sortedJobsIds.indexOf(a.job_id) - sortedJobsIds.indexOf(b.job_id);
    });

    console.log(sortedApps);

    dispatch(
      getApps({
        apps: {
          applications: sortedApps,
          appliedJobs: sortedJobs,
        },
        isLoading: false,
      })
    );
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="flex gap-4 items-center">
        <label className="font-bold text-2xl" htmlFor="typesort">
          Sort
        </label>
        <select
          className="border-2 border-gray-500 rounded-md"
          id="typesort"
          {...register("typesort")}
        >
          <option defaultChecked value="position">
            Position
          </option>
          <option value="company">Company</option>
          <option value="location">Location</option>
        </select>
        <select id="rowsort" {...register("rowsort")}>
          <option defaultChecked value="asc">
            Ascending
          </option>
          <option value="desc">Descending</option>
        </select>
        <button
          className="flex gap-2 btn border-0 my-4 duration-0 capitalize text-white bg-accent hover:bg-info"
          type="submit"
        >
          Sort
        </button>
      </form>
    </div>
  );
};

export default DashboardSort;
