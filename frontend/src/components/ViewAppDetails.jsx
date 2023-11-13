import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Style = styled.section`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
  width: 100vw;
  height: 100vh;

  input,
  textarea {
    width: 30vw;
  }
`;

const ViewAppDetails = ({ viewDetails, setViewDetails, appliedData }) => {
  const { applications, appliedJobs } = appliedData;
  const { data, isViewDetails } = viewDetails;
  return (
    <Style>
      <button
        className="btn block m-auto bg-neutral"
        onClick={() => setViewDetails({ data: null, isViewDetails: false })}
      >
        CLOSE
      </button>
      <div className="grid grid-col-2 justify-center">
        <div className="flex gap-8">
          <h2 className="w-[10rem]">Job Position</h2>
          <p className="w-[30rem]">{appliedJobs[data].position}</p>
        </div>
        <div className="flex gap-8">
          <h2 className="w-[10rem]">Company</h2>
          <p className="w-[30rem]">{appliedJobs[data].company}</p>
        </div>
        <div className="flex gap-8">
          <h2 className="w-[10rem]">Location</h2>
          <p className="w-[30rem]">{appliedJobs[data].location}</p>
        </div>
        <div className="flex gap-8">
          <h2 className="w-[10rem]">Job Description</h2>
          <p className="w-[30rem]">{appliedJobs[data].description}</p>
        </div>
        <div className="flex gap-8">
          <h2 className="w-[10rem]">Application Text</h2>
          <p className="w-[30rem]">{applications[data].content}</p>
        </div>
        <Link to={`/${appliedJobs[data].job_id}`} className="btn">To Jobpage</Link>
      </div>
    </Style>
  );
};

export default ViewAppDetails;
