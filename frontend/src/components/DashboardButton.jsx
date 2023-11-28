import React from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const DashboardButton = () => {
  return (
    <Link
      to="/dashboard"
      className="p-2 text-center max-md:bg-accent bg-neutral max-md:text-white 
    text-primary rounded-xl"
    >
      <div className="flex gap-2 justify-center items-center">
        Dashboard
        <CgProfile />
      </div>
    </Link>
  );
};

export default DashboardButton;
