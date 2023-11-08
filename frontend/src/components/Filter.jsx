import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getJobs } from "../slices/jobsSlice";
import { useNavigate, useLocation } from "react-router-dom";

const Filter = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const onSubmit = (data) => {
    console.log("form", data);
    try {
      axios
        .get(`http://localhost:3000/jobs`, { params: data })
        .then((response) => {
          dispatch(getJobs({ payload: response.data }));
          console.log(response.data);
          console.log(data);
          navigate(
            `/?searchTerm=${data.searchTerm}&location=${data.location}&contract=${data.contract}`
          );
        });
    } catch {}
  };

  return (
    <section className="flex h-[4rem]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex justify-center items-center bg-neutral"
      >
        <div className="flex item-center gap-2 w-[30vw] border h-[4rem]">
          <img
            className="w-[1.5rem] h-[1.5rem] self-center"
            src="../assets/desktop/icon-search.svg"
            alt="search icon"
          />
          <input
            className="bg-neutral outline-none"
            aria-label="search field"
            type="text"
            placeholder="Filter by title, companies, expertise..."
            defaultValue={query.get("searchTerm")}
            {...register("searchTerm")}
          />
        </div>
        <div className="flex item-center gap-2 w-[30vw] border h-[4rem]">
          <img
            className="w-[1rem] h-[1.5rem] self-center"
            src="../assets/desktop/icon-location.svg"
            alt="location icon"
          />
          <input
            className="bg-neutral outline-none"
            aria-label="location filter"
            type="text"
            placeholder="Filter by location..."
            defaultValue={query.get("location")}
            {...register("location")}
          />
        </div>
        <div className="flex justify-evenly item-center gap-2 w-[30vw] border h-[4rem]">
          <input
            type="checkbox"
            {...register("contract")}
            defaultChecked={query.get("contract") === "true"}
          />
          <label className="self-center" htmlFor="contract">
            Full Time Only
          </label>
          <button className="btn self-center">Search</button>
        </div>
      </form>
    </section>
  );
};

export default Filter;
