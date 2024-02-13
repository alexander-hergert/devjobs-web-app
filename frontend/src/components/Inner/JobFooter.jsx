import React from "react";
import ApplicationForm from "./ApplicationForm";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const JobFooter = ({ job, isApplication, setIsApplication }) => {
  const user = useSelector((state) => state.user.user);
  const apps = useSelector((state) => state.apps.apps);
  const job_id = useParams().jobId;
  const isApplied = apps?.applications?.some(
    (app) => app.job_id === Number(job_id)
  );

  const handleClick = () => {
    if (user?.role === "private") {
      setIsApplication(true);
    } else if (user?.role === "company" || user?.role === "admin") {
      toast.error("This feature is only for candidates", {
        toastId: "applicationError",
      });
    } else {
      toast.error("You must be logged in to apply", {
        toastId: "applicationError",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      {isApplication && <ApplicationForm setIsApplication={setIsApplication} />}
      <section className="self-center flex justify-center bg-neutral w-full py-4 rounded-t-lg">
        <div className=" flex justify-between items-center max-md:w-[327px] md:w-[689px] xl:w-[730px]">
          <div className="max-md:hidden">
            <p className="text-primary text-xl font-bold">{job?.position}</p>
            <p className="text-slate-500 mt-2">So Digital Inc.</p>
          </div>
          {!isApplied ? (
            <button
              onClick={handleClick}
              className="btn text-white capitalize bg-[#5964e0] max-md:w-full hover:bg-info"
            >
              Apply Now
            </button>
          ) : (
            <button className="btn bg-slate-500 text-white max-md:w-full">
              Already Applied
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default JobFooter;
