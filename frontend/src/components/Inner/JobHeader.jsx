import React from "react";
import { useSelector } from "react-redux";

const JobHeader = ({ job }) => {
  const theme = useSelector((state) => state.theme);
  return (
    <section className="self-center bg-neutral relative bottom-[40px] rounded-lg max-md:mt-4">
      <div
        className="flex items-center justify-between max-md:flex-col max-md:w-[327px] md:w-[689px] 
      xl:w-[730px] max-md:h-[205px] md:h-[140px]"
      >
        <div className="flex items-center md:gap-8 max-md:flex-col">
          <div
            className="max-md:w-[50px] w-[140px] max-md:h-[50px] max-md:rounded-xl
             h-[140px] grid place-items-center rounded-bl-lg max-md:relative max-md:bottom-6"
            style={{ backgroundColor: job?.logo_background }}
          >
            <img src={job?.logo} alt={job?.company} className="w-[50%]" />
          </div>
          <div className="max-md:text-center">
            <p className="text-2xl font-bold text-primary">{job?.company}</p>
            <a
              target="blank"
              href={job?.company_website}
              className="text-slate-500"
            >
              {job?.company_website}
            </a>
          </div>
        </div>
        <div className="max-md:flex-row flex flex-col gap-4">
          <a
            target="blank"
            href={job?.company_website}
            className={`btn max-md:mb-8 md:mr-10 w-[147px] h-[48px] border-none duration-0 capitalize ${
              theme === "light"
                ? "bg-[#eeeffc] text-[#5964e0]"
                : "bg-[#303642] text-white"
            }`}
          >
            Company Site
          </a>
        </div>
      </div>
    </section>
  );
};

export default JobHeader;
