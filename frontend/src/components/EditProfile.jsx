import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const Style = styled.section`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
  width: 100vw;
  height: 100vh;
`;

const EditProfile = ({ setIsEdit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <Style>
      <button className="btn" onClick={() => setIsEdit(false)}>
        CLOSE
      </button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex flex-col bg-neutral w-[20vw] m-auto"
      >
        <div className="flex gap-4 justify-between my-4">
          <label htmlFor="fullname">Fullname</label>
          <input type="text" id="fullname" {...register("fullname")} />
        </div>
        <div className="flex gap-4 justify-between my-4">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
        </div>
        <div className="flex gap-4 justify-between my-4">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" {...register("address")} />
        </div>
        <div className="flex gap-4 justify-between my-4">
          <label htmlFor="location">Location</label>
          <input type="text" {...register("location")} />
        </div>
        <div className="flex gap-4 justify-between my-4">
          <label htmlFor="skills">Skills</label>
          <input type="text" id="skills" {...register("skills")} />
        </div>
        <div className="flex gap-4 justify-between my-4">
          <label htmlFor="website">Website</label>
          <input type="text" id="website" {...register("website")} />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </Style>
  );
};

export default EditProfile;
