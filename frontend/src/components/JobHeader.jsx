import React from "react";

const JobHeader = ({ job }) => {
  return (
    <section className="self-center bg-neutral">
      <div className="border flex items-center justify-between w-[50vw]">
        <div className="flex items-center gap-8">
          <div
            className="w-[5rem] h-[5rem] grid place-items-center"
            style={{ backgroundColor: job?.logo_background }}
          >
            <img src={job?.logo} alt={job?.company} />
          </div>
          <div>
            <p>{job?.company}</p>
            <p>{job?.company_website}</p>
          </div>
        </div>
        <button className="btn mr-10">Company Site</button>
      </div>
    </section>
  );
};

export default JobHeader;
