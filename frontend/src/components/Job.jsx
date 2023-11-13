import React from "react";
import { Link } from "react-router-dom";
import { timeSince } from "../utils";
import { useSelector } from "react-redux";

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
  } = job;

  const apps = useSelector((state) => state.apps.apps);
  const isApplied = apps.applications?.some((app) => app.job_id === job_id);

  return (
    <Link to={`/${job_id}`}>
      <div
        className={`min-w-[350px] h-[228px] border bg-neutral ${
          isApplied ? "border-black" : ""
        }`}
      >
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
