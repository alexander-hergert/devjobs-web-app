import React from "react";
import { useSelector } from "react-redux";

const JobHeader = ({ job }) => {
  const theme = useSelector((state) => state.theme);
  return (
    <section className="self-center bg-neutral relative bottom-[40px] rounded-lg">
      <div className="flex items-center justify-between w-[730px] h-[140px]">
        <div className="flex items-center gap-8">
          <div
            className="w-[140px] h-[140px] grid place-items-center rounded-bl-lg"
            style={{ backgroundColor: job?.logo_background }}
          >
            <img src={job?.logo} alt={job?.company} className="w-[50%]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">{job?.company}</p>
            <p className="text-slate-500">{job?.company_website}</p>
          </div>
        </div>
        <button
          className={`btn mr-10 w-[147px] h-[48px] border-none duration-0 capitalize ${
            theme === "light"
              ? "bg-[#eeeffc] text-[#5964e0]"
              : "bg-[#303642] text-white"
          }`}
        >
          Company Site
        </button>
      </div>
    </section>
  );
};

export default JobHeader;
