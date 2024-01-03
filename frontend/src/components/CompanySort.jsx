import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getCompanyJobs } from "../slices/companyJobsSlice";
import { useDispatch, useSelector } from "react-redux";

const CompanySort = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const companyJobs = useSelector((state) => state.companyJobs.companyJobs);

  const onSubmit = (data) => {
    console.log(data);
    const { typesort, rowsort } = data;
    const sortedJobs = [...companyJobs];
    console.log(sortedJobs);

    if (typesort === "position") {
      sortedJobs?.sort((a, b) => {
        if (rowsort === "asc") {
          return a.position.localeCompare(b.position);
        } else {
          return b.position.localeCompare(a.position);
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

    dispatch(
      getCompanyJobs({
        companyJobs: sortedJobs,
        isLoading: false,
      })
    );
  };

  return (
    <div>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-4 max-md:flex-col"
      >
        <div className="flex gap-4 items-center">
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
            <option value="location">Location</option>
          </select>
          <select id="rowsort" {...register("rowsort")}>
            <option defaultChecked value="asc">
              Ascending
            </option>
            <option value="desc">Descending</option>
          </select>
        </div>
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

export default CompanySort;
