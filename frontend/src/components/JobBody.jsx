import React from "react";
import { timeSince } from "../utils";
import { useSelector } from "react-redux";
import ApplicationForm from "./ApplicationForm";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";

const LiUl = styled.li`
  display: flex;
  list-style: none;
  gap: 30px;

  &::before {
    content: "";
    min-width: 5px;
    max-width: 5px;
    max-height: 5px;
    min-height: 5px;
    border-radius: 50%;
    background-color: #5964e0;
    display: inline-block;
    margin-top: 10px;
  }
`;

const LiOl = styled.li`
  display: flex;
  list-style: none;
  gap: 30px;

  &::before {
    content: "${(props) => props.$number}";
    color: #5964e0;
    display: inline-block;
  }
`;

const JobBody = ({ job, isApplication, setIsApplication }) => {
  const requirementsString = job?.requirements_list;
  const requirementsArray = requirementsString?.split("##");
  const roleString = job?.job_role_list;
  const roleArray = roleString?.split("##");
  const job_id = useParams().jobId;
  const apps = useSelector((state) => state.apps.apps);
  const isApplied = apps.applications?.some(
    (app) => app.job_id === Number(job_id)
  );

  const user = useSelector((state) => state.user.user);
  console.log(user);
  const handleClick = () => {
    if (user?.role === "private") {
      setIsApplication(true);
    } else if (user?.role === "company") {
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
      <section className="self-center max-md:w-[327px] md:w-[689px] xl:w-[730px] px-10 bg-neutral rounded-lg py-[48px] mb-[82px]">
        <div className="flex justify-between items-center max-md:flex-col">
          <div className="w-full">
            <p className="text-slate-500">
              {timeSince(new Date(job?.posted_at))} • {job?.contract}
            </p>
            <h1 className="text-primary my-2 max-md:text-lg max-md:font-bold">
              {job?.position}
            </h1>
            <p className="text-[#5964e0] text-md font-bold">{job?.location}</p>
          </div>
          {!isApplied ? (
            <button
              onClick={handleClick}
              className="btn text-white capitalize bg-[#5964e0] max-md:w-full max-md:mt-8 hover:bg-info"
            >
              Apply Now
            </button>
          ) : (
            <button className="btn bg-red-600">Already Applied</button>
          )}
        </div>
        <p className="my-10 text-slate-400">{job?.description}</p>
        <h2 className="my-10 text-primary max-md:font-bold max-md:text-lg">
          Requirements
        </h2>
        <p className="my-10 text-slate-400">{job?.requirements}</p>
        <ul className="my-4">
          {requirementsArray?.map((item) => (
            <LiUl className="my-2 text-slate-400" key={item}>
              {item}
            </LiUl>
          ))}
        </ul>
        <h2 className="my-10 text-primary max-md:font-bold max-md:text-lg">
          What You Will Do
        </h2>
        <p className="text-slate-400">{job?.job_role}</p>
        <ul className="my-4">
          {roleArray?.map((item, i) => (
            <LiOl $number={i + 1} className="my-2 text-slate-400" key={item}>
              {item}
            </LiOl>
          ))}
        </ul>
      </section>
    </>
  );
};

export default JobBody;
