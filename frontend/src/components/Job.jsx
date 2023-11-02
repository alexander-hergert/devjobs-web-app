import React from "react";
import { Link } from "react-router-dom";

const Job = ({ job }) => {
  const {
    position,
    company,
    logo,
    logoBackground,
    postedAt,
    contract,
    location,
    role,
    level,
    languages,
    tools,
  } = job;
  return (
    <Link to={`/${job.id}`}>
      <div className="min-w-[350px] h-[228px] border bg-neutral">
        <div
          style={{ backgroundColor: logoBackground }}
          className="w-[2rem] h-[2rem] grid place-items-center rounded m-4"
        >
          <img src={logo} alt={company} />
        </div>
        <p>
          {postedAt} • {contract}
        </p>
        <h2>{position}</h2>
        <p>{company}</p>
        <p>{location}</p>
      </div>
    </Link>
  );
};

export default Job;
