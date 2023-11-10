import React from "react";
import { timeSince } from "../utils";
import { useSelector } from "react-redux";
import ApplicationForm from "./ApplicationForm";

const JobBody = ({ job, isApplication, setIsApplication }) => {
  const requirementsString = job?.requirements_list;
  const requirementsArray = requirementsString?.split("##");
  const roleString = job?.job_role_list;
  const roleArray = roleString?.split("##");

  const user = useSelector((state) => state.user.user);

  const handleClick = () => {
    if (user) {
      setIsApplication(true);
    } else {
      console.log("you must be logged in to apply");
    }
  };

  return (
    <>
      {isApplication && <ApplicationForm setIsApplication={setIsApplication} />}
      <section className="self-center w-[50vw] border px-10 bg-neutral">
        <div className="flex justify-between items-center">
          <div>
            <p>
              {timeSince(new Date(job?.posted_at))} • {job?.contract}
            </p>
            <h1>{job?.position}</h1>
            <p>{job?.location}</p>
          </div>
          <button onClick={handleClick} className="btn">
            Apply Now
          </button>
        </div>
        <p className="my-5">{job?.description}</p>
        <h2 className="my-10">Requirements</h2>
        <p>{job?.requirements.content}</p>
        <ul className="list-disc my-4 pl-5">
          {requirementsArray?.map((item) => (
            <li className="my-2" key={item}>
              {item}
            </li>
          ))}
        </ul>
        <h2 className="my-10">What You Will Do</h2>
        <p>{job?.job_role}</p>
        <ul className="list-decimal my-4 pl-5">
          {roleArray?.map((item) => (
            <li className="my-2" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default JobBody;
