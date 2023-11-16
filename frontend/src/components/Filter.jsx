import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../slices/jobsSlice";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const CheckBox = styled.input`
  appearance: none;

  &:after {
    border-radius: 5px;
    content: "";
    position: absolute;
    width: 24px;
    height: 24px;
    background-color: ${(props) => props.$backgroundColor || "#BF4F74"};
  }

  &:checked::after {
    border-radius: 5px;
    content: "";
    position: absolute;
    width: 24px;
    height: 24px;
    background-image: url("../assets/desktop/icon-check.svg");
    background-color: #5964e0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
`;

const Image = styled.input`
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%)
    hue-rotate(50deg) brightness(107%) contrast(101%);
`;

const ImageSearch = styled.img`
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%)
    hue-rotate(50deg) brightness(107%) contrast(101%);
`;

const Filter = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const onSubmit = (data) => {
    console.log("form", data);
    try {
      axios
        .get(`http://localhost:3000/jobs`, { params: data })
        .then((response) => {
          dispatch(getJobs({ payload: response.data }));
          console.log(response.data);
          console.log(data);
          navigate(
            `/?searchTerm=${data.searchTerm}&location=${data.location}&contract=${data.contract}`
          );
        });
    } catch {}
  };

  return (
    <section className="flex max-sm:w-[327px] md:w-[690px] lg:w-[1100] h-[80px] relative bottom-[40px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="shadow flex justify-center items-center bg-neutral rounded-lg"
      >
        <div className="flex items-center max-sm:hidden md:w-[222px] lg:w-[463px] h-[80px] rounded-l-xl">
          <div className="md:pl-[23px] lg:pl-[32px] flex items-center md:w-[147px] lg:w-[312px] h-[24px] gap-[16px]">
            <img
              className="w-[24px] h-[24px] self-center"
              src="../assets/desktop/icon-search.svg"
              alt="search icon"
            />
            <input
              className="bg-neutral outline-none md:w-[105px] lg:w-[271px] h-[16px] overflow-ellipsis"
              aria-label="search field"
              type="text"
              placeholder="Filter by title, companies, expertise..."
              defaultValue={query.get("searchTerm")}
              {...register("searchTerm")}
            />
          </div>
        </div>
        <div className="flex items-center max-sm:hidden md:w-[215px] lg:w-[301px] border-x border-warning h-[80px]">
          <div className="flex items-center pl-[24px] md:w-[169px] h-[24px] gap-[16px]">
            <img
              className="w-[17px] h-[24px] self-center"
              src="../assets/desktop/icon-location.svg"
              alt="location icon"
            />
            <input
              className="bg-neutral outline-none md:w-[135px] h-[16px]"
              aria-label="location filter"
              type="text"
              placeholder="Filter by location..."
              defaultValue={query.get("location")}
              {...register("location")}
            />
          </div>
        </div>
        <div className="flex items-center justify-between max-sm:hidden md:w-[253px] lg:w-[336px] h-[80px] rounded-r-xl">
          <div className="flex items-center pl-[24px] md:w-[130px] lg:w-[190px] h-[24px] gap-[16px]">
            <CheckBox
              $backgroundColor={theme === "light" ? "#f4f6f8" : "#313643"}
              className="w-[24px] h-[24px] "
              type="checkbox"
              id="contract"
              {...register("contract")}
              defaultChecked={query.get("contract") === "true"}
            />
            <label
              className="font-bold w-[120px] h-[24px] text-primary"
              htmlFor="contract"
            >
              Full Time
              <span className="hidden lg:inline-block">&nbsp; Only</span>
            </label>
          </div>
          <button
            className="md:w-[80px] lg:w-[123px] h-[48px] btn duration-0 capitalize mr-4
           text-white bg-accent hover:bg-info border-none rounded-lg"
          >
            Search
          </button>
        </div>
        {/* mobile view */}
        <div className="flex items-center md:hidden w-[327px] h-[80px] rounded-l-xl">
          <div className="pl-4 flex justify-between items-center h-[24px] gap-[16px] w-full">
            <input
              className="bg-neutral outline-none w-[105px] h-[16px] overflow-ellipsis"
              aria-label="search field"
              type="text"
              placeholder="Filter by title, companies, expertise..."
              defaultValue={query.get("searchTerm" || watch("searchTerm"))}
              {...register("searchTerm")}
            />
            <div className="flex items-center gap-[16px]">
              {theme === "light" ? (
                <input
                  type="image"
                  className="w-[24px] h-[24px] self-center cursor-pointer"
                  src="../assets/mobile/icon-filter.svg"
                  alt="filter icon"
                />
              ) : (
                <Image
                  type="image"
                  className="w-[24px] h-[24px] self-center cursor-pointer"
                  src="../assets/mobile/icon-filter.svg"
                  alt="filter icon"
                />
              )}
              <button
                className="w-[48px] h-[48px] btn duration-0 mr-4
            bg-accent hover:bg-info border-none rounded-lg p-0"
              >
                <ImageSearch
                  className="w-[20px]"
                  src="../assets/desktop/icon-search.svg"
                  alt="search icon"
                />
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Filter;
