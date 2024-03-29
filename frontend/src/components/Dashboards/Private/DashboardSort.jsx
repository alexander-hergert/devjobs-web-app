import React from "react";
import { useForm } from "react-hook-form";
import { getApps } from "../../../slices/appsSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaSortAlphaDown } from "react-icons/fa";

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
    const { typesort, rowsort } = data;
    const sortedApps = [...apps?.applications];
    const sortedJobs = [...apps?.appliedJobs];

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

    const sortedJobsIds = sortedJobs?.map((job) => job.job_id);
    //sort apps by job ids
    sortedApps?.sort((a, b) => {
      return sortedJobsIds.indexOf(a.job_id) - sortedJobsIds.indexOf(b.job_id);
    });

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
    <form
      action=""
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-4 max-md:flex-col max-md:w-[375px]"
    >
      <div className="max-md:self-start flex gap-4 items-center">
        <label className="font-bold text-2xl" htmlFor="typesort">
          Sort
        </label>
        <select
          className="w-[130px] border-2 border-gray-500 rounded-md bg-neutral"
          id="typesort"
          {...register("typesort")}
        >
          <option defaultChecked value="position">
            Position
          </option>
          <option value="company">Company</option>
          <option value="location">Location</option>
        </select>
        <select
          className="w-[130px] border-2 border-gray-500 rounded-md bg-neutral"
          id="rowsort"
          {...register("rowsort")}
        >
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
        <div className="flex gap-2 items-center">
          Sort
          <FaSortAlphaDown />
        </div>
      </button>
    </form>
  );
};

export default DashboardSort;
