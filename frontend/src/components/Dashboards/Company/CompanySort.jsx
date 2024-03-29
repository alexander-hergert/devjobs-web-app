import React from "react";
import { useForm } from "react-hook-form";
import { getCompanyJobs } from "../../../slices/companyJobsSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaSortAlphaDown } from "react-icons/fa";

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
    const { typesort, rowsort } = data;
    const sortedJobs = [...companyJobs];

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
        className="flex gap-4 max-md:flex-col max-md:w-[375px]"
      >
        <div className="max-md:self-start flex gap-4 items-center">
          <label className="font-bold text-2xl" htmlFor="typesort">
            Sort
          </label>
          <select
            className="max-md:w-[145px] w-[120px] border-2 border-gray-500 rounded-md bg-neutral"
            id="typesort"
            {...register("typesort")}
          >
            <option defaultChecked value="position">
              Position
            </option>
            <option value="location">Location</option>
          </select>
          <select
            className="max-md:w-[145px] w-[120px] border-2 border-gray-500 rounded-md bg-neutral"
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
    </div>
  );
};

export default CompanySort;
