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
  const isApplied = apps.applications?.some(
    (app) => app.job_id === Number(job_id)
  );

  return (
    <Link to={`/${job_id}`}>
      <div
        className={`xl:w-[350px] md:w-[339px] h-[228px] bg-neutral rounded-xl pl-8 shadow relative ${
          isApplied ? "border-slate-500 border-4" : ""
        }`}
      >
        <div
          style={{ backgroundColor: logo_background }}
          className="w-[50px] h-[50px] grid place-items-center rounded-2xl relative bottom-[25px]"
        >
          <img src={logo} alt={company} />
        </div>
        <p className="text-slate-500">
          {timeSince(new Date(posted_at))} • {contract}
        </p>
        <h2 className="font-bold text-primary text-xl my-2">{position}</h2>
        <p className="text-slate-500">{company}</p>
        <p className="mt-8 text-[#5762e0] font-bold">{location}</p>
        {isApplied && (
          <div className="absolute bottom-0 right-0 bg-slate-500 rounded-tl-lg p-2">
            <p className="capitalize text-white">already applied</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Job;
