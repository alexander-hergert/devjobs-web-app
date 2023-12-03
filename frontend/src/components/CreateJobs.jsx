import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const Style = styled.section`
  position: absolute;
  top: 0;
  padding-top: 2rem;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
  width: 100%;
  height: 100dvh;

  @media screen and (min-width: 767px) {
    input,
    textarea {
      width: 100%;
    }
  }

  input[type="submit"] {
    width: 10rem;
  }

  label {
    align-self: start;
    width: 10rem;
  }

  .align-center {
    align-self: center;
  }

  textarea {
    min-height: 10rem;
  }

  ul {
    margin-left: 2rem;
  }
`;

const CreateJobs = ({ setIsCreateJob }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //List states to simulate adding items to list
  //receive data from backend for requirementsItems and roleItems
  const [requirementsItems, setRequirementsItems] = useState([]);
  const [roleItems, setRoleItems] = useState([]);

  const handleAddRequirementsItem = () => {
    setRequirementsItems([...requirementsItems, watch("requirements-items")]);
  };

  const handleAddRoleItem = () => {
    setRoleItems([...roleItems, watch("role-items")]);
  };

  const onSubmit = (data) => {
    //post data and requirementsItems and roleItems to backend
    console.log(data);
  }; //Post request to backend

  return (
    <Style>
      <button
        className="btn block m-auto bg-neutral text-primary capitalize my-6"
        onClick={() => setIsCreateJob(false)}
      >
        CLOSE
      </button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex flex-col justify-center items-center m-auto bg-neutral 
        max-md:w-[327px] max-md:p-6 md:w-[690px] xl:w-[1100px] shadow rounded-xl text-primary"
      >
        <h2 className="text-center">Create New Job Offer</h2>
        <div className="max-md:flex-col gap-2 md:w-[30rem] flex justify-between my-2">
          <label htmlFor="position">Position</label>
          <input
            className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
            type="text"
            id="position"
            {...register("position")}
          />
        </div>
        <h3>Contract</h3>
        <div className="max-md:flex-col gap-2 md:w-[30rem] flex justify-center items-center my-2">
          <div className="flex items-center">
            <label htmlFor="fulltime">Full Time</label>
            <input
              type="radio"
              id="fulltime"
              value={"Full Time"}
              {...register("contract")}
              defaultChecked
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="parttime">Part Time</label>
            <input
              type="radio"
              id="parttime"
              value={"Part Time"}
              {...register("contract")}
            />
          </div>
        </div>
        <div className="max-md:flex-col gap-2 md:w-[30rem] flex justify-between items-center my-2">
          <label htmlFor="location">Location</label>
          <input
            className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
            type="text"
            id="location"
            {...register("location")}
          />
        </div>
        <div className="max-md:flex-col gap-2 md:w-[30rem] flex justify-between items-center my-2">
          <label htmlFor="website">Website</label>
          <input
            className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
            type="text"
            id="website"
            {...register("website")}
          />
        </div>
        <div className="max-md:flex-col gap-2 md:w-[30rem] flex justify-between items-center my-2">
          <label htmlFor="description">Description</label>
          <textarea
            className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
            type="text"
            id="description"
            {...register("description")}
          ></textarea>
        </div>
        <div className="max-md:flex-col gap-2 md:w-[30rem] flex justify-between items-center my-2">
          <label htmlFor="requirements-content">Requirements</label>
          <textarea
            className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
            type="text"
            id="requirements-content"
            {...register("requirements-content")}
          ></textarea>
        </div>
        <div className="max-md:flex-col gap-2 md:w-[30rem] flex justify-between items-center my-2">
          <label htmlFor="requirements-items">Other Requirements</label>
          <div className="flex items-center gap-4 w-[25vw]">
            <ul className="list-disc">
              {requirementsItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-md:flex-col gap-2 md:w-[30rem] flex justify-between items-center my-2">
          <label className="align-center" htmlFor="requirements-items">
            New Requirement
          </label>
          <div className="flex items-center gap-4 w-full">
            <div className="md:flex md:items-center md:gap-4 md:w-full">
              <input
                className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
                type="text"
                id="requirements-items"
                {...register("requirements-items")}
              />
              <button
                onClick={handleAddRequirementsItem}
                className="btn border-0 my-4 duration-0 capitalize text-white bg-accent max-md:w-full hover:bg-info"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
        <div className="max-md:flex-col gap-2 md:w-[30rem] flex justify-between items-center my-2">
          <label htmlFor="role-content">Role</label>
          <textarea
            className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
            type="text"
            id="role-content"
            {...register("role-content")}
          ></textarea>
        </div>
        <div className="max-md:flex-col gap-2 md:w-[30rem] flex justify-between items-center my-2">
          <label htmlFor="role-items">Other Roles</label>
          <div className="flex items-center gap-4 w-[25vw]">
            <ul className="list-disc">
              {roleItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-md:flex-col gap-2 md:w-[30rem] flex justify-between items-center my-2">
          <label className="align-center" htmlFor="role-items">
            New Role
          </label>
          <div className="flex items-center gap-4 w-full">
            <div className="md:flex md:items-center md:gap-4 md:w-full">
              <input
                className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
                type="text"
                id="role-items"
                {...register("role-items")}
              />
              <button
                onClick={handleAddRoleItem}
                className="btn border-0 my-4 duration-0 capitalize text-white bg-accent max-md:w-full hover:bg-info"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Save and publish"
          className="btn border-0 my-4 duration-0 capitalize text-white bg-accent max-md:w-full hover:bg-info"
        />
      </form>
    </Style>
  );
};

export default CreateJobs;
