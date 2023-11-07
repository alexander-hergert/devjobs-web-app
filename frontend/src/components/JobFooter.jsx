import React from "react";

const JobFooter = ({ job }) => {
  return (
    <section className="self-center flex justify-center bg-neutral w-[100vw]">
      <div className=" flex justify-between items-center w-[50vw]">
        <div>
          <p>{job?.position}</p>
          <p>So Digital Inc.</p>
        </div>
        <button className="btn">Apply Now</button>
      </div>
    </section>
  );
};

export default JobFooter;
