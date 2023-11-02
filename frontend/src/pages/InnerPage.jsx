import React from "react";
import JobHeader from "../components/JobHeader";
import JobBody from "../components/JobBody";
import JobFooter from "../components/JobFooter";

const InnerPage = () => {
  return (
    <main className="flex flex-col justify-center">
      <JobHeader />
      <JobBody />
      <JobFooter />
    </main>
  );
};

export default InnerPage;
