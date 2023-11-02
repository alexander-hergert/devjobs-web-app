import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const JobBody = () => {
  const jobs = useSelector((state) => state.jobs.jobs);
  const params = useParams();
  const jobId = Number(params.jobId) - 1;

  const {
    postedAt,
    contract,
    position,
    location,
    description,
    requirements,
    role,
  } = jobs.payload[jobId];

  return (
    <section className="self-center w-[50vw] border px-10 bg-neutral">
      <div className="flex justify-between items-center">
        <div>
          <p>
            {postedAt} • {contract}
          </p>
          <h1>{position}</h1>
          <p>{location}</p>
        </div>
        <button className="btn">Apply Now</button>
      </div>
      <p className="my-5">{description}</p>
      <h2 className="my-10">Requirements</h2>
      <p>{requirements.content}</p>
      <ul className="list-decimal my-4 pl-5">
        {requirements.items?.map((item) => (
          <li className="my-2" key={item}>
            {item}
          </li>
        ))}
      </ul>
      <h2 className="my-10">What You Will Do</h2>
      <p>{role.content}</p>
      <ul className="list-decimal my-4 pl-5">
        {role.items?.map((item) => (
          <li className="my-2" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default JobBody;
