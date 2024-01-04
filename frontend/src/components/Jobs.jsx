import React, { useEffect } from "react";
import axios from "axios";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../slices/jobsSlice";
import { getTotalJobs } from "../slices/totalJobsSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { setPage } from "../slices/paginationSlice";
import JobLoader from "./JobLoader";
import ScrollUpButton from "./ScrollUpButton";

const Jobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const isLoading = useSelector((state) => state.jobs.isLoading);
  const totalJobs = useSelector((state) => state.totalJobs.totalJobs);
  const location = useLocation();
  const page = useSelector((state) => state.pagination.page);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (!location.search) {
        axios.get("http://localhost:3000/jobs").then((response) => {
          dispatch(getJobs({ jobs: response.data[0], isLoading: false }));
          dispatch(getTotalJobs({ payload: response.data[1] }));
          console.log(response.data);
        });
      } else {
        //Query string is present
        axios
          .get(`http://localhost:3000/jobs${location.search}`)
          .then((response) => {
            dispatch(getJobs({ jobs: response.data[0], isLoading: false }));
            dispatch(getTotalJobs({ payload: response.data[1] }));
            console.log(response.data);
            //set the page number
            const query = new URLSearchParams(location.search);
            const totalJobs = response.data[1];
            const number = parseInt(query.get("page") || 1);
            if (number > Math.ceil(totalJobs / 12)) {
              dispatch(setPage({ payload: Math.ceil(totalJobs / 12) }));
              navigate(
                `/?searchTerm=${query.get("searchTerm") || ""}&location=${
                  query.get("location") || ""
                }&contract=${query.get("contract") || ""}&page=${Math.ceil(
                  totalJobs / 12
                )}`
              );
            } else {
              dispatch(setPage({ payload: number }));
            }
          });
      }
    } catch (error) {}
  }, [location.search]);

  if (isLoading) {
    return (
      <section
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-x-[10px]
       xl:gap-x-[25px] gap-y-[60px] md:w-[690px] xl:w-[1100px] md:mt-[30px] xl:mt-[66px]"
      >
        {[...Array(12)].map((_, i) => (
          <JobLoader key={i} />
        ))}
      </section>
    );
  }

  const handleLoadMore = () => {
    if (page === Math.ceil(totalJobs / 12)) return; //if we are on the last page, do nothing
    const query = new URLSearchParams(location.search);
    const number = parseInt(query.get("page") || 1);
    dispatch(setPage({ payload: number + 1 }));
    navigate(
      `/?searchTerm=${query.get("searchTerm") || ""}&location=${
        query.get("location") || ""
      }&contract=${query.get("contract") || ""}&page=${number + 1}`
    );
  };

  return (
    <>
      <section className="flex justify-center font-bold">
        <h2>Found {totalJobs} jobs</h2>
      </section>
      <section
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-x-[10px]
       xl:gap-x-[25px] gap-y-[60px] md:w-[690px] xl:w-[1100px] md:mt-[30px] xl:mt-[66px]"
      >
        {jobs?.map((job) => (
          <Job key={job.job_id} job={job} />
        ))}
      </section>
      <button
        onClick={handleLoadMore}
        className="btn m-auto border-none my-12 block max-md:w-[141px] md:w-[121px] capitalize text-white bg-[#5762e0] hover:bg-info"
      >
        Load More
        <br />({page} / {Math.ceil(totalJobs / 12)})
      </button>
      {page >= 2 && <ScrollUpButton />}
    </>
  );
};

export default Jobs;
