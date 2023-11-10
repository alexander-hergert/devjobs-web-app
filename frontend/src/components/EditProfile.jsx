import React from "react";
import styled from "styled-components";
import { set, useForm } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";

const Style = styled.section`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
  width: 100vw;
  height: 100vh;

  input,
  textarea {
    width: 30vw;
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
          <input
            type="text"
            id="fullname"
            {...register("fullname")}
            defaultValue={fullname}
          />
        </div>
        <div className="flex gap-4 justify-between my-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            defaultValue={email}
          />
        </div>
        <div className="flex gap-4 justify-between my-4">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            {...register("address")}
            defaultValue={address}
          />
        </div>
        <div className="flex gap-4 justify-between my-4">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            {...register("location")}
            defaultValue={location}
          />
        </div>
        <div className="flex gap-4 justify-between my-4">
          <label htmlFor="skills">Skills</label>
          <input
            type="text"
            id="skills"
            {...register("skills")}
            defaultValue={skills}
          />
        </div>
        <div className="flex gap-4 justify-between my-4">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="user_website"
            {...register("user_website")}
            defaultValue={user_website}
          />
        </div>
        <input type="submit" value="Save Changes" className="self-center btn" />
      </form>
    </Style>
  );
};

export default EditProfile;
