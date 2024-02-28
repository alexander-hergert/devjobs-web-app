import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../../slices/jobsSlice";
import { toast, ToastContainer } from "react-toastify";

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

const Overlay = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2000;
  }
`;

const MobileFilter = ({ handleToggleFilter }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const baseUrl = useSelector((state) => state.baseUrl);

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
    try {
      axios.get(`${baseUrl}/jobs`, { params: data }).then((response) => {
        dispatch(getJobs({ payload: response.data }));
        navigate(
          `/?searchTerm=${data.searchTerm}&location=${data.location}&contract=${data.contract}`
        );
      });
    } catch {
      console.error("Error fetching jobs");
      toast.error("Error fetching jobs", {
        toastId: "error-fetching-jobs",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <Overlay onClick={(e) => handleToggleFilter(e)}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          onClick={(e) => e.stopPropagation()}
          action=""
          className="shadow flex flex-col bg-neutral rounded-lg w-[327px] h-[217px]"
        >
          <input
            className="hidden"
            type="text"
            placeholder="Filter by title, companies, expertise..."
            defaultValue={query.get("searchTerm") || watch("searchTerm")}
            {...register("searchTerm")}
          />
          <div className="flex items-center w-[327px] border-b border-warning h-[80px]">
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
          <div className="p-6 flex flex-col items-center justify-between w-[327px] h-[80px] rounded-r-xl gap-5">
            <div className="flex self-start items-center w-[180px] h-[24px] gap-[16px]">
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
                Full Time Only
              </label>
            </div>
            <button
              className="w-full h-[48px] btn duration-0 capitalize
           text-white bg-accent hover:bg-info border-none rounded-xl text-lg"
            >
              Search
            </button>
          </div>
        </form>
      </Overlay>
    </>
  );
};

export default MobileFilter;
