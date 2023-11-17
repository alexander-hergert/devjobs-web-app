import React from "react";
import { useSelector } from "react-redux";

const JobHeader = ({ job }) => {
  const theme = useSelector((state) => state.theme);
  return (
    <section className="self-center bg-neutral relative bottom-[40px] rounded-lg">
      <div className="flex items-center justify-between max-sm:flex-col max-sm:w-[327px] md:w-[689px] 
      lg:w-[730px] max-sm:h-[205px] md:h-[140px]">
        <div className="flex items-center md:gap-8 max-sm:flex-col">
          <div
            className="max-sm:w-[50px] w-[140px] max-sm:h-[50px] max-sm:rounded-xl
             h-[140px] grid place-items-center rounded-bl-lg max-sm:relative max-sm:bottom-6"
            style={{ backgroundColor: job?.logo_background }}
          >
            <img src={job?.logo} alt={job?.company} className="w-[50%]" />
          </div>
          <div className="max-sm:text-center">
            <p className="text-2xl font-bold text-primary">{job?.company}</p>
            <p className="text-slate-500">{job?.company_website}</p>
          </div>
        </div>
        <button
          className={`btn max-sm:mb-8 md:mr-10 w-[147px] h-[48px] border-none duration-0 capitalize ${
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
