import React from "react";
import { Link } from "react-router-dom";
import { IoBusinessSharp } from "react-icons/io5";

const BackToAllJobsNavigation = () => {
  return (
    <Link
      to="/"
      className="p-2 text-center max-md:bg-accent bg-neutral max-md:text-white 
    text-primary rounded-xl"
    >
      <div className="flex gap-2 justify-center items-center">
        Back to Jobs
        <IoBusinessSharp />
      </div>
    </Link>
  );
};

export default BackToAllJobsNavigation;
