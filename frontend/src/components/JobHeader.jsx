import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const JobHeader = () => {
  const jobs = useSelector((state) => state.jobs.jobs);
  const params = useParams();
  const jobId = Number(params.jobId) - 1;

  const { company, logo, logoBackground, website } = jobs.payload[jobId];

  return (
    <section className="self-center bg-neutral">
      <div className="border flex items-center justify-between w-[50vw]">
        <div className="flex items-center gap-8">
          <div
            className="w-[5rem] h-[5rem] grid place-items-center"
            style={{ backgroundColor: logoBackground }}
          >
            <img src={logo} alt={company} />
          </div>
          <div>
            <p>{company}</p>
            <p>{website}</p>
          </div>
        </div>
        <button className="btn mr-10">Company Site</button>
      </div>
    </section>
  );
};

export default JobHeader;
