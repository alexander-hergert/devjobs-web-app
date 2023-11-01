import React from "react";
import axios from "axios";

const Filter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "Here goes axios request. The request is sending the filters to the backend and the backend will return the filtered data as json."
    );
  };

  return (
    <section className="flex justify-center h-[4rem]">
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex justify-center items-center w-[90vw] bg-neutral"
      >
        <div className="flex item-center gap-2 w-[30vw] border h-[4rem]">
          <img
            className="w-[1.5rem] h-[1.5rem] self-center"
            src="../assets/desktop/icon-search.svg"
            alt="search icon"
          />
          <input
            className="bg-neutral outline-none"
            aria-label="search field"
            type="text"
            name=""
            id=""
            placeholder="Filter by title, companies, expertise..."
          />
        </div>
        <div className="flex item-center gap-2 w-[30vw] border h-[4rem]">
          <img
            className="w-[1rem] h-[1.5rem] self-center"
            src="../assets/desktop/icon-location.svg"
            alt="location icon"
          />
          <input
            className="bg-neutral outline-none"
            aria-label="location filter"
            type="text"
            name=""
            id=""
            placeholder="Filter by location..."
          />
        </div>
        <div className="flex justify-evenly item-center gap-2 w-[30vw] border h-[4rem]">
          <input type="checkbox" name="fulltime" id="fulltime" />
          <label className="self-center" htmlFor="fulltime">
            Full Time Only
          </label>
          <button className="btn self-center">Search</button>
        </div>
      </form>
    </section>
  );
};

export default Filter;
