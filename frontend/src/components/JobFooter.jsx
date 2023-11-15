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
      <section className="self-center flex justify-center bg-neutral w-[100vw] py-4">
        <div className=" flex justify-between items-center w-[730px]">
          <div>
            <p className="text-primary text-xl font-bold">{job?.position}</p>
            <p className="text-slate-500 mt-2">So Digital Inc.</p>
          </div>
          {!isApplied ? (
            <button onClick={handleClick} className="btn text-white capitalize bg-[#5964e0]">
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
