import React from "react";
import Filter from "../components/Filter";
import Jobs from "../components/Jobs";

const HomePage = () => {
  return (
    <main className="w-[90vw] m-auto">
      <Filter />
      <Jobs />
    </main>
  );
};

export default HomePage;
