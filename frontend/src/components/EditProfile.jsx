import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";

const Style = styled.section`
  position: fixed;
  top: 0;
  padding-top: 10rem;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
  width: 100vw;
  height: 100vh;

  label,
  p {
    //moblie query
    @media screen and (max-width: 767px) {
      align-self: start;
    }
  }
`;

const EditProfile = ({ setIsEditProfile, user }) => {
  const { fullname, email, address, location, skills, user_website } = user;
  const { getAccessTokenSilently } = useAuth0();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.put("http://localhost:3000/user", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      dispatch(setUser({ payload: response.data[0] }));
      setIsEditProfile(false);
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  return (
    <Style>
      <button
        className="btn block m-auto bg-neutral text-primary capitalize my-4"
        onClick={() => setIsEditProfile(false)}
      >
        close
      </button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex flex-col justify-center items-center m-auto bg-neutral 
        max-md:w-[327px] max-md:p-6 md:w-[690px] xl:w-[1100px] shadow rounded-xl text-primary"
      >
        <h2 className="text-center">Edit Profile</h2>
        <div className="max-md:flex-col gap-2 md:w-[30rem] flex justify-between items-center my-2">
          <label htmlFor="email">Email *</label>
          <input
            className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
            type="text"
            id="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            aria-invalid={errors.email ? "true" : "false"}
            defaultValue={email}
          />
        </div>
        {errors.email?.type === "required" && (
          <p className="text-red-500" role="alert">
            Email is required
          </p>
        )}
        {errors.email?.type === "pattern" && (
          <p className="text-red-500" role="alert">
            This is not an Email
          </p>
        )}
        <div className="max-md:flex-col gap-2 md:w-[30rem] flex justify-between items-center my-2">
          <label htmlFor="fullname">Fullname *</label>
          <input
            className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
            type="text"
            id="fullname"
            {...register("fullname", { required: true, minLength: 3 })}
            aria-invalid={errors.fullname ? "true" : "false"}
            defaultValue={fullname}
          />
        </div>
        {errors.fullname?.type === "required" && (
          <p className="text-red-500" role="alert">
            Name is required
          </p>
        )}
        {errors.fullname?.type === "minLength" && (
          <p className="text-red-500" role="alert">
            Name has to be at least 3 characters long
          </p>
        )}
        <div className="max-md:flex-col gap-2 md:w-[30rem] flex justify-between items-center my-2">
          <label htmlFor="address">Address</label>
          <input
            className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
            type="text"
            id="address"
            {...register("address")}
            defaultValue={address}
          />
        </div>
        <div className="max-md:flex-col gap-2 md:w-[30rem] flex justify-between items-center my-2">
          <label htmlFor="location">Location</label>
          <input
            className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
            type="text"
            id="location"
            {...register("location")}
            defaultValue={location}
          />
        </div>
        <div className="max-md:flex-col gap-2 md:w-[30rem] flex justify-between items-center my-2">
          <label htmlFor="skills">Skills</label>
          <input
            className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
            type="text"
            id="skills"
            {...register("skills")}
            defaultValue={skills}
          />
        </div>
        <div className="max-md:flex-col gap-2 md:w-[30rem] flex justify-between items-center my-2">
          <label htmlFor="website">Website</label>
          <input
            className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
            type="text"
            id="user_website"
            {...register("user_website")}
            defaultValue={user_website}
          />
        </div>
        <input
          type="submit"
          value="Save Changes"
          className="btn my-4 duration-0 capitalize text-white bg-accent max-md:w-full"
        />
      </form>
    </Style>
  );
};

export default EditProfile;
