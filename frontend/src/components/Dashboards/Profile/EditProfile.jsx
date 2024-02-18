import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice";
import { getCsrfToken } from "../../../utils";

const Style = styled.section`
  position: fixed;
  top: 0;
  padding-top: 2rem;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
  width: 100vw;
  height: 100dvh;

  .danger-zone {
    align-self: center;
  }

  @media screen and (max-width: 767px) {
    padding-top: 0;
    position: absolute;
  }

  label,
  p {
    //mobile query
    @media screen and (max-width: 767px) {
      align-self: start;
    }
  }
`;

const EditProfile = ({ setIsEditProfile, user, setIsMainVisible }) => {
  const { fullname, email, address, location, skills, user_website } = user;
  const [isDeleteProfile, setIsDeleteProfile] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const csrfToken = getCsrfToken();

  const { getAccessTokenSilently, logout } = useAuth0();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.put(`${baseUrl}/user`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-CSRF-TOKEN": csrfToken,
        },
        withCredentials: true,
      });
      dispatch(setUser({ user: response.data, isLoading: false }));
      setIsEditProfile(false);
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsDeleteProfile(!isDeleteProfile);
  };

  const handleDelete = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.delete(`${baseUrl}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-CSRF-TOKEN": csrfToken,
        },
        withCredentials: true,
      });
      dispatch(setUser({ payload: undefined }));
      //delete cookie
      document.cookie =
        "session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setIsEditProfile(false);
      logout({ logoutParams: { returnTo: window.location.origin } });
      localStorage.setItem("user", JSON.stringify(false));
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  return (
    <Style>
      <button
        className="btn block m-auto border-0 text-white capitalize my-4 bg-red-500 hover:bg-red-200"
        onClick={() => {
          setIsEditProfile(false);
          setIsMainVisible(true);
        }}
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
            {...register("user_website", {
              pattern: /^www\.\w+\.\w{2,3}$/,
            })}
            defaultValue={user_website}
          />
        </div>
        {errors.user_website?.type === "pattern" && (
          <p className="text-red-500" role="alert">
            Please use a valid website url format
          </p>
        )}
        <input
          type="submit"
          value="Save Changes"
          className="btn border-0 my-4 duration-0 capitalize text-white bg-accent max-md:w-full hover:bg-info"
        />
        <div className="border-2 p-4 mt-10 rounded-lg flex gap-8 items-center mb-2 border-red-700">
          <p className="capitalize text-red-700 danger-zone">danger zone</p>
          <button
            onClick={(e) => handleClick(e)}
            className="btn border-0 bg-red-700 capitalize text-white hover:bg-red-400"
          >
            {!isDeleteProfile ? "delete profile" : "don't delete profile"}
          </button>
        </div>
        {isDeleteProfile && (
          <div className="border-2 p-4 mt-5 rounded-lg flex gap-8 items-center mb-4 border-red-700">
            <p className="capitalize text-red-700 danger-zone min-w-[10rem] max-w-[20rem]">
              are you sure you want to delete your profile? This step can't be
              unchanged! It will delete user and all applications.
            </p>
            <div className="flex max-md:flex-col gap-4">
              <button
                onClick={handleDelete}
                className="btn border-0 bg-red-700 capitalize text-white hover:bg-red-400"
              >
                yes
              </button>
              <button
                className="btn border-0 bg-red-700 capitalize text-white hover:bg-red-400"
                onClick={() => setIsDeleteProfile(false)}
              >
                no
              </button>
            </div>
          </div>
        )}
      </form>
    </Style>
  );
};

export default EditProfile;
