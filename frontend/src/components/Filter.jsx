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
    <section className="flex w-[1100] h-[80px] relative bottom-[40px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex justify-center items-center bg-neutral rounded-xl"
      >
        <div className="flex items-center w-[463px] h-[80px] rounded-l-xl">
          <div className="pl-[32px] flex items-center w-[312px] h-[24px] gap-[16px]">
            <img
              className="w-[24px] h-[24px] self-center"
              src="../assets/desktop/icon-search.svg"
              alt="search icon"
            />
            <input
              className="bg-neutral outline-none w-[271px] h-[16px]"
              aria-label="search field"
              type="text"
              placeholder="Filter by title, companies, expertise..."
              defaultValue={query.get("searchTerm")}
              {...register("searchTerm")}
            />
          </div>
        </div>
        <div className="flex items-center w-[301px] border-x border-warning h-[80px]">
          <div className="flex items-center pl-[24px] w-[169px] h-[24px] gap-[16px]">
            <img
              className="w-[17px] h-[24px] self-center"
              src="../assets/desktop/icon-location.svg"
              alt="location icon"
            />
            <input
              className="bg-neutral outline-none w-[135px] h-[16px]"
              aria-label="location filter"
              type="text"
              placeholder="Filter by location..."
              defaultValue={query.get("location")}
              {...register("location")}
            />
          </div>
        </div>
        <div className="flex items-center justify-between w-[336px] h-[80px] rounded-r-xl">
          <div className="flex items-center pl-[24px] w-[190px] h-[24px] gap-[16px]">
            <CheckBox
              $backgroundColor={theme === "light" ? "#f4f6f8" : "#313643"}
              className="w-[24px] h-[24px] "
              type="checkbox"
              {...register("contract")}
              defaultChecked={query.get("contract") === "true"}
            />
            <label
              className="font-bold w-[120px] h-[24px] text-primary"
              htmlFor="contract"
            >
              Full Time Only
            </label>
          </div>
          <button className="text-lg w-[123px] h-[48px] btn duration-0 capitalize mr-4 text-white bg-accent hover:bg-info border-none">
            Search
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filter;
