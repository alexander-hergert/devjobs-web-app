import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const Style = styled.section`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
  width: 100vw;
  height: 100vh;

  input,
  textarea {
    width: 25vw;
  }

  ul {
    margin-left: 2rem;
  }
`;

const EditJob = ({ setIsEditJob }) => {
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
        className="btn block m-auto bg-neutral"
        onClick={() => setIsEditJob(false)}
      >
        CLOSE
      </button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex flex-col bg-neutral w-[60vw] m-auto p-10"
      >
        <h2 className="text-center">JobId</h2>
        <div className="flex gap-4 justify-between my-4">
          <label htmlFor="position">Position</label>
          <input type="text" id="position" {...register("position")} />
        </div>
        <div className="flex gap-4 justify-between my-4">
          <label htmlFor="contract">Contract</label>
          <input type="text" id="contract" {...register("contract")} />
        </div>
        <div className="flex gap-4 justify-between my-4">
          <label htmlFor="location">Location</label>
          <input type="text" id="location" {...register("location")} />
        </div>
        <div className="flex gap-4 justify-between my-4">
          <label htmlFor="website">Website</label>
          <input type="text" id="website" {...register("website")} />
        </div>
        <div className="flex gap-4 justify-between my-4">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            id="description"
            {...register("description")}
          ></textarea>
        </div>
        <div className="flex gap-4 justify-between my-4">
          <label htmlFor="requirements-content">Requirements(Content)</label>
          <textarea
            type="text"
            id="requirements-content"
            {...register("requirements-content")}
          ></textarea>
        </div>
        <div className="flex gap-4 justify-between my-4">
          <label htmlFor="requirements-items">Requirements(ListItem)</label>
          <div className="flex items-center gap-4 w-[25vw]">
            <ul className="list-disc">
              {requirementsItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex gap-4 justify-between my-4">
          <label htmlFor="requirements-items">Requirements(ListItemAdd)</label>
          <div className="flex items-center gap-4 w-[25vw]">
            <input
              type="text"
              id="requirements-items"
              {...register("requirements-items")}
            />
            <button onClick={handleAddRequirementsItem} className="btn">
              Add Item
            </button>
          </div>
        </div>
        <div className="flex gap-4 justify-between my-4">
          <label htmlFor="role-content">Role(Content)</label>
          <textarea
            type="text"
            id="role-content"
            {...register("role-content")}
          ></textarea>
        </div>
        <div className="flex gap-4 justify-between my-4">
          <label htmlFor="role-items">Role(ListItem)</label>
          <div className="flex items-center gap-4 w-[25vw]">
            <ul className="list-disc">
              {roleItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex gap-4 justify-between my-4">
          <label htmlFor="role-items">Role(ListItem)</label>
          <div className="flex items-center gap-4 w-[25vw]">
            <input type="text" id="role-items" {...register("role-items")} />
            <button onClick={handleAddRoleItem} className="btn">
              Add Item
            </button>
          </div>
        </div>
        <input type="submit" value="Save Changes" className="self-center btn" />
      </form>
    </Style>
  );
};

export default EditJob;
