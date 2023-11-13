import React from "react";
import ApplicationForm from "./ApplicationForm";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const JobFooter = ({ job, isApplication, setIsApplication }) => {
  const user = useSelector((state) => state.user.user);
  const apps = useSelector((state) => state.apps.apps);
  console.log(apps);
  const job_id = useParams().jobId;
  const isApplied = apps.applications?.some(
    (app) => app.job_id === Number(job_id)
  );
  console.log(isApplied);

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
      <section className="self-center flex justify-center bg-neutral w-[100vw]">
        <div className=" flex justify-between items-center w-[50vw]">
          <div>
            <p>{job?.position}</p>
            <p>So Digital Inc.</p>
          </div>
          {!isApplied ? (
            <button onClick={handleClick} className="btn bg-green-500">
              Apply Now
            </button>
          ) : (
            <button className="btn bg-red-600">Already Applied</button>
          )}
        </div>
      </section>
    </>
  );
};

export default JobFooter;
