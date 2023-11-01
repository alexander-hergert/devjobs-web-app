import React, { useState, useEffect } from "react";
import axios from "axios";
import Job from "./Job";

const Jobs = () => {
  //data belongs then in redux store but for now in component

  const [data, setData] = useState([]);
  useEffect(() => {
    try {
      axios.get("../data.json").then((response) => {
        console.log(response);
        setData(response.data);
      });
    } catch {}
  }, []);

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {data.map((job) => (
          <Job key={job.id} job={job} />
        ))}
      </section>
      <button className="btn m-auto block">Load More</button>
    </>
  );
};

export default Jobs;
