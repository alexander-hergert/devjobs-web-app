import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/userSlice";
import { IoMdBusiness } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { isAuthenticated, loginWithPopup, getAccessTokenSilently, logout } =
    useAuth0();

  const user = useSelector((state) => state.user.user);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const onSubmit = (data) => {
    loginWithPopup();
  };
  const formData = watch();

  //Create User
  useEffect(() => {
    const callApi = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.post(`${baseUrl}/createuser`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        dispatch(setUser({ user: response.data, isLoading: false }));
        navigate("/dashboard");
      } catch (error) {
        toast.error("Error creating user");
        //set timeout to logout
        setTimeout(() => {
          logout({ logoutParams: { returnTo: window.location.origin } });
        }, 1000);
        localStorage.setItem("user", JSON.stringify(false));
      }
    };
    if (!user?.user_id && isAuthenticated) {
      callApi();
    }
  }, [isAuthenticated]);

  return (
    <>
      <ToastContainer />
      <section className="p-4">
        <h1 className="text-center">
          Welcome to Webdevjobs! Please sign up to benefit from our service.
        </h1>
        <form
          action=""
          className="flex flex-col justify-center items-center m-auto bg-neutral 
        max-md:w-[327px] max-md:p-6 md:w-[690px] xl:w-[1100px] shadow rounded-xl text-primary"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-2xl">Choose Profile Type</h2>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2" htmlFor="private">
                <FaRegUser />
                Private
              </label>
              <input
                aria-label="private"
                type="radio"
                name="role"
                id="private"
                value="private"
                {...register("role")}
                defaultChecked
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2" htmlFor="company">
                <IoMdBusiness />
                Company
              </label>
              <input
                aria-label="company"
                type="radio"
                name="role"
                id="company"
                value="company"
                {...register("role")}
              />
            </div>
          </div>
          <h2 className="max-md:text-center text-2xl mt-4">
            Profile personal informations
          </h2>
          <div className="max-md:flex-col gap-2 md:w-[30rem] flex justify-between items-center my-2">
            <label htmlFor="email">Email *</label>
            <input
              className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
              type="email"
              name="email"
              id="email"
              placeholder="testmail@gmail.com"
              {...register("email", { required: true })}
              aria-invalid={errors.email ? "true" : "false"}
            />
          </div>
          {errors.email?.type === "required" && (
            <p className="text-red-500" role="alert">
              Email is required
            </p>
          )}
          <div className="max-md:flex-col gap-2 md:w-[30rem] flex justify-between items-center my-2">
            <label htmlFor="fullname">Full Name *</label>
            <input
              className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
              type="text"
              name="fullname"
              id="fullname"
              placeholder="John Doe"
              {...register("fullname", { required: true, minLength: 3 })}
              aria-invalid={errors.fullname ? "true" : "false"}
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
              name="address"
              id="address"
              placeholder="123 Main St"
              {...register("address")}
            />
          </div>
          <div className="max-md:flex-col gap-2 md:w-[30rem] flex justify-between items-center my-2">
            <label htmlFor="location">Location</label>
            <input
              className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
              type="text"
              name="location"
              id="location"
              placeholder="New York, USA"
              {...register("location")}
            />
          </div>
          <div className="max-md:flex-col gap-2 md:w-[30rem] flex justify-between items-center my-2">
            <label htmlFor="skills">Skills</label>
            <input
              className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
              type="text"
              name="skills"
              id="skills"
              placeholder="HTML, CSS, JavaScript"
              {...register("skills")}
            />
          </div>
          <div className="max-md:flex-col gap-2 md:w-[30rem] flex justify-between items-center my-2">
            <label htmlFor="user_website">Website</label>
            <input
              className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
              type="text"
              name="user_website"
              id="user_website"
              placeholder="www.example.com"
              {...register("user_website")}
            />
          </div>
          <button
            className="btn my-4 duration-0 capitalize text-white bg-accent"
            onSubmit={handleSubmit(onSubmit)}
          >
            Sign Up
          </button>
        </form>
      </section>
    </>
  );
};

export default SignUpPage;
