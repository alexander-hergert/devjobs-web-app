import React, { useState } from "react";
import Filter from "../components/Home/Filter";
import Jobs from "../components/Home/Jobs";
import MobileFilter from "../components/Home/MobileFilter";

const HomePage = () => {
  const [isToggleFilter, setIsToggleFilter] = useState(false);
  const handleToggleFilter = (e) => {
    e.preventDefault();
    setIsToggleFilter(!isToggleFilter);
  };

  return (
    <main className="max-md:w-[327px] md:w-[690px] xl:w-[1100px] m-auto">
      {isToggleFilter && (
        <MobileFilter handleToggleFilter={handleToggleFilter} />
      )}
      <Filter handleToggleFilter={handleToggleFilter} />
      <Jobs />
    </main>
  );
};

export default HomePage;
