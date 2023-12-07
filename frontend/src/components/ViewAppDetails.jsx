import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Style = styled.section`
  position: absolute;
  top: 0;
  padding-top: 5rem;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
  width: 100%;
  min-height: 100dvh;

  h2 {
    width: 15rem;
    text-align: left;
    margin: 0 auto;
  }

  p {
    width: 30rem;
    text-align: left;

    //media qeury from 768px
    @media screen and (min-width: 768px) and (max-width: 1279px) {
      width: 20rem;
    }

    //media query from max 768px
    @media screen and (max-width: 767px) {
      width: 15rem;
    }
  }

  @media screen and (max-width: 767px) {
    padding-top: 2rem;
  }
`;

const ViewAppDetails = ({ viewDetails, setViewDetails, apps }) => {
  const { applications, appliedJobs } = apps;
  const { data, isViewDetails } = viewDetails;
  return (
    <Style>
      <button
        className="btn block m-auto border-0 text-white capitalize my-4 bg-red-500 hover:bg-red-200"
        onClick={() => setViewDetails({ data: null, isViewDetails: false })}
      >
        CLOSE
      </button>
      <div
        className="flex flex-col justify-center items-center m-auto bg-neutral 
        max-md:w-[327px] max-md:p-6 md:w-[690px] xl:w-[1100px] shadow rounded-xl text-primary py-4"
      >
        <div className="flex items-center max-md:gap-2 gap-8 max-md:flex-col max-md:text-center my-2">
          <h2>Job Position</h2>
          <p>{appliedJobs[data].position}</p>
        </div>
        <div className="flex items-center max-md:gap-2 gap-8 max-md:flex-col max-md:text-center my-2">
          <h2>Company</h2>
          <p>{appliedJobs[data].company}</p>
        </div>
        <div className="flex items-center max-md:gap-2 gap-8 max-md:flex-col max-md:text-center my-2">
          <h2>Location</h2>
          <p>{appliedJobs[data].location}</p>
        </div>
        <div className="flex items-center max-md:gap-2 gap-8 max-md:flex-col max-md:text-center my-2">
          <h2 className="self-start">Job Description</h2>
          <p>{appliedJobs[data].description}</p>
        </div>
        <div className="flex items-center max-md:gap-2 gap-8 max-md:flex-col max-md:text-center my-2">
          <h2 className="text-left">Job Status</h2>
          <p>{appliedJobs[data].status ? "open" : "closed"}</p>
        </div>
        <div className="flex items-center max-md:gap-2 gap-8 max-md:flex-col max-md:text-center my-2">
          <h2>Application Status</h2>
          <p>{applications[data].app_status}</p>
        </div>
        <div className="flex items-center max-md:gap-2 gap-8 max-md:flex-col max-md:text-center my-2">
          <h2>Application Text</h2>
          <p>{applications[data].content}</p>
        </div>
        <Link
          to={`/${appliedJobs[data].job_id}`}
          className="btn my-4 duration-0 capitalize text-white bg-accent max-md:w-full hover:bg-info"
        >
          To Jobpage
        </Link>
      </div>
    </Style>
  );
};

export default ViewAppDetails;
