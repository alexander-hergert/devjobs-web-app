import React from "react";
import { Link } from "react-router-dom";
import { timeSince } from "../utils";

const Job = ({ job }) => {
  const {
    job_id,
    position,
    company,
    logo,
    logo_background,
    posted_at,
    contract,
    location,
    role,
    level,
    languages,
    tools,
  } = job;

  return (
    <Link to={`/${job_id}`}>
      <div className="min-w-[350px] h-[228px] border bg-neutral">
        <div
          style={{ backgroundColor: logo_background }}
          className="w-[2rem] h-[2rem] grid place-items-center rounded m-4"
        >
          <img src={logo} alt={company} />
        </div>
        <p>
          {timeSince(new Date(posted_at))} • {contract}
        </p>
        <h2>{position}</h2>
        <p>{company}</p>
        <p>{location}</p>
      </div>
    </Link>
  );
};

export default Job;
