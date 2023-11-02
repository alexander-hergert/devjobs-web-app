import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const JobFooter = () => {
  const jobs = useSelector((state) => state.jobs.jobs);
  const params = useParams();
  const jobId = Number(params.jobId) - 1;

  const { contract } = jobs.payload[jobId];

  return (
    <section className="self-center flex justify-center bg-neutral w-[100vw]">
      <div className=" flex justify-between items-center w-[50vw]">
        <div>
          <p>{contract}</p>
          <p>So Digital Inc.</p>
        </div>
        <button className="btn">Apply Now</button>
      </div>
    </section>
  );
};

export default JobFooter;
