import React, { useEffect } from "react";
import axios from "axios";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../slices/jobsSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { setPage } from "../slices/paginationSlice";

const Jobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const location = useLocation();
  const page = useSelector((state) => state.pagination.page);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (!location.search) {
        axios.get("http://localhost:3000/").then((response) => {
          dispatch(getJobs({ payload: response.data }));
          console.log(response.data);
        });
      } else {
        //Query string is present
        axios
          .get(`http://localhost:3000/${location.search}`)
          .then((response) => {
            dispatch(getJobs({ payload: response.data }));
            console.log(response.data);
          });
      }
    } catch (error) {}
  }, [location.search]);

  if (jobs.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  const handleLoadMore = () => {
    const number = Number(location.search.slice(6)) || 1;
    dispatch(setPage({ payload: number + 1 }));
    navigate(`/?page=${number + 1}`);
  };

  return (
    <>
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
      </button>
    </>
  );
};

export default Jobs;
