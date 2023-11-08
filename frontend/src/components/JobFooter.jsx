import React from "react";
import ApplicationForm from "./ApplicationForm";
import { useSelector } from "react-redux";

const JobFooter = ({ job, isApplication, setIsApplication }) => {
  const user = useSelector((state) => state.user.user);
  console.log(user);

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
          <button onClick={handleClick} className="btn">
            Apply Now
          </button>
        </div>
      </section>
    </>
  );
};

export default JobFooter;
