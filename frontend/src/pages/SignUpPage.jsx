import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();
  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithPopup,
    getAccessTokenSilently,
  } = useAuth0();
  const onSubmit = (data) => {
    console.log(data);
    loginWithPopup();
  };
  const formData = watch();

  useEffect(() => {
    console.log(formData);
    const callApi = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.post(
          "http://localhost:3000/createuser",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(setUser({ payload: response.data[0] }));
        navigate("/dashboard");
      } catch (error) {
        navigate("/");
        console.error("Error calling API:", error);
      }
    };
    if (user) {
      callApi();
    }
  }, [isAuthenticated]);

  return (
    <>
      <h1 className="text-center">
        Welcome to Webdevjobs! Please sign up to benefit from our service.
      </h1>
      <form
        action=""
        className="flex flex-col justify-center items-center m-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="private">Private</label>
          <input
            type="radio"
            name="role"
            id="private"
            value="private"
            {...register("role")}
          />
          <label htmlFor="company">Company</label>
          <input
            type="radio"
            name="role"
            id="company"
            value="company"
            {...register("role")}
          />
        </div>
        <div className="w-[30rem] flex justify-between">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="testmail@gmail.com"
            {...register("email")}
          />
        </div>
        <div className="w-[30rem] flex justify-between">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            placeholder="John Doe"
            {...register("fullname")}
          />
        </div>
        <div className="w-[30rem] flex justify-between">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="123 Main St"
            {...register("address")}
          />
        </div>
        <div className="w-[30rem] flex justify-between">
          <label htmlFor="location">location</label>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="New York"
            {...register("location")}
          />
        </div>
        <div className="w-[30rem] flex justify-between">
          <label htmlFor="skills">Skills</label>
          <input
            type="text"
            name="skills"
            id="skills"
            placeholder="HTML, CSS, JavaScript"
            {...register("skills")}
          />
        </div>
        <div className="w-[30rem] flex justify-between">
          <label htmlFor="user_website">Website</label>
          <input
            type="text"
            name="user_website"
            id="user_website"
            placeholder="www.example.com"
            {...register("user_website")}
          />
        </div>
        <button className="btn" onSubmit={handleSubmit(onSubmit)}>
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignUpPage;
