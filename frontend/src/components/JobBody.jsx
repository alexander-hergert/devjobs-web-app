import React from "react";
import { timeSince } from "../utils";
import { useSelector } from "react-redux";
import ApplicationForm from "./ApplicationForm";
import { useParams } from "react-router-dom";
import styled from "styled-components";

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
  console.log(apps);
  const isApplied = apps.applications?.some(
    (app) => app.job_id === Number(job_id)
  );
  console.log(isApplied);

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
      <section className="self-center w-[730px] px-10 bg-neutral rounded-lg py-[48px] mb-[82px]">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-slate-500">
              {timeSince(new Date(job?.posted_at))} • {job?.contract}
            </p>
            <h1 className="text-primary my-2">{job?.position}</h1>
            <p className="text-[#5964e0] text-sm font-bold">{job?.location}</p>
          </div>
          {!isApplied ? (
            <button
              onClick={handleClick}
              className="btn text-white capitalize bg-[#5964e0]"
            >
              Apply Now
            </button>
          ) : (
            <button className="btn bg-red-600">Already Applied</button>
          )}
        </div>
        <p className="my-5 text-slate-400">{job?.description}</p>
        <h2 className="my-10 text-primary">Requirements</h2>
        <p>{job?.requirements.content}</p>
        <ul className="my-4">
          {requirementsArray?.map((item) => (
            <LiUl className="my-2 text-slate-400" key={item}>
              {item}
            </LiUl>
          ))}
        </ul>
        <h2 className="my-10 text-primary">What You Will Do</h2>
        <p className="text-slate-400">{job?.job_role}</p>
        <ul className="my-4 pl-5">
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
