import React from "react";
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
`;

const EditProfile = ({ setIsEditProfile }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data); //Post request to backend

  return (
    <Style>
      <button
        className="btn block m-auto bg-neutral"
        onClick={() => setIsEditProfile(false)}
      >
        CLOSE
      </button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex flex-col bg-neutral w-[50vw] m-auto p-10"
      >
        <h2 className="text-center">Edit Profile</h2>
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
          <input type="text" id="location" {...register("location")} />
        </div>
        <div className="flex gap-4 justify-between my-4">
          <label htmlFor="skills">Skills</label>
          <input type="text" id="skills" {...register("skills")} />
        </div>
        <div className="flex gap-4 justify-between my-4">
          <label htmlFor="website">Website</label>
          <input type="text" id="website" {...register("website")} />
        </div>
        <input type="submit" value="Save Changes" className="self-center btn" />
      </form>
    </Style>
  );
};

export default EditProfile;
