import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { getCompanyJobs } from "../../../slices/companyJobsSlice";
import CharactersUsed from "../../Global/CharactersUsed";
import { getCsrfToken } from "../../../utils";
import { toast, ToastContainer } from "react-toastify";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Style = styled.section`
  position: absolute;
  top: 0;
  padding-top: 2rem;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
  width: 100%;
  height: 100dvh;
  white-space: pre-wrap;
  word-wrap: break-word;

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

const CreateJobs = ({ setIsCreateJob, setIsMainVisible }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
  } = useForm();

  //receive data from backend for requirementsItems and roleItems
  const [requirementsItems, setRequirementsItems] = useState([]);
  const [roleItems, setRoleItems] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const csrfToken = getCsrfToken();

  const handleAddRequirementsItem = (e) => {
    e.preventDefault();
    if (watch("requirements-items").length < 2) {
      setError("requirements-items", {
        type: "minLength",
        message: "Please use at least 2 characters!",
      });
      return;
    } else if (watch("requirements-items").length > 100) {
      setError("requirements-items", {
        type: "maxLength",
        message: "Please use max 100 characters!",
      });
      return;
    } else if (requirementsItems.length === 5) {
      setError("requirements-items", {
        type: "maxItems",
        message: "Please use max 5 items!",
      });
      return;
    } else {
      clearErrors("requirements-items");
    }
    setRequirementsItems([...requirementsItems, watch("requirements-items")]);
    //clear input field
    setValue("requirements-items", "");
  };

  const removeRequirement = (index) => {
    setRequirementsItems(requirementsItems.filter((item, i) => i !== index));
  };

  const handleAddRoleItem = (e) => {
    e.preventDefault();
    if (watch("role-items").length < 2) {
      setError("role-items", {
        type: "minLength",
        message: "Please use at least 2 characters!",
      });
      return;
    } else if (watch("role-items").length > 100) {
      setError("role-items", {
        type: "maxLength",
        message: "Please use max 100 characters!",
      });
      return;
    } else if (roleItems.length === 5) {
      setError("role-items", {
        type: "maxItems",
        message: "Please use max 5 items!",
      });
      return;
    } else {
      clearErrors("role-items");
    }
    setRoleItems([...roleItems, watch("role-items")]);
    //clear input field
    setValue("role-items", "");
  };

  const removeRole = (index) => {
    setRoleItems(roleItems.filter((item, i) => i !== index));
  };

  const onSubmit = async (data) => {
    //send data to backend
    //alternate the data
    data.requirementsItems = requirementsItems.map((item) => item + "##");
    data.roleItems = roleItems.map((item) => item + "##");
    try {
      const token = await getAccessTokenSilently();
      const response = await axios({
        method: "post",
        url: `${baseUrl}/createjob`,
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
          "X-CSRF-TOKEN": csrfToken,
        },
        withCredentials: true,
      });
      //update companyJobs state
      dispatch(
        getCompanyJobs({ companyJobs: response.data, isLoading: false })
      );
      setIsCreateJob(false);
      setIsMainVisible(true);
    } catch (error) {
      console.error("Error calling API:", error);
      toast.error("Error creating job", {
        toastId: "error-creating-job",
      });
    }
  };

  return (
    <Style>
      <ToastContainer />
      <button
        className="btn block m-auto border-0 text-white capitalize my-4 bg-red-500 hover:bg-red-200"
        onClick={() => {
          setIsCreateJob(false);
          setIsMainVisible(true);
        }}
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
        <div className="max-md:flex-col gap-2 md:w-[30rem] xl:w-[40rem] flex justify-between my-4">
          <label htmlFor="position">Position*</label>
          <input
            className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
            type="text"
            id="position"
            {...register("position", {
              required: true,
              minLength: 3,
              maxLength: 50,
            })}
            aria-label="position"
            placeholder="e.g. Frontend Developer"
          />
        </div>
        <CharactersUsed
          charactersUsed={watch("position")?.length || 0}
          maxCharacters={50}
          offset={{ small: 2, medium: 8, large: 13 }}
        />
        <div className="max-md:flex-col gap-2 md:w-[30rem] xl:w-[40rem] flex justify-between items-center my-4">
          {errors.position?.type === "required" && (
            <p className="text-red-500 my-4" role="alert">
              Position is required!
            </p>
          )}
          {errors.position?.type === "minLength" && (
            <p className="text-red-500 my-4" role="alert">
              Please use at least 3 characters!
            </p>
          )}
          {errors.position?.type === "maxLength" && (
            <p className="text-red-500 my-4" role="alert">
              Please use max 50 characters!
            </p>
          )}
        </div>
        <div className="max-md:flex-col gap-2 md:w-[30rem] xl:w-[40rem] flex justify-between my-4">
          <label htmlFor="color">Symbol Color</label>
          <input
            className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
            type="color"
            id="color"
            {...register("color")}
            aria-label="color"
          />
        </div>
        <h3>Contract Type</h3>
        <div className="max-md:flex-col gap-2 md:w-[30rem] xl:w-[40rem] flex justify-center items-center my-4">
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
        <div className="max-md:flex-col gap-2 md:w-[30rem] xl:w-[40rem] flex justify-between items-center my-4">
          <label htmlFor="location">Location*</label>
          <input
            className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
            type="text"
            id="location"
            {...register("location", {
              required: true,
              minLength: 2,
              maxLength: 50,
            })}
            aria-label="location"
            placeholder="e.g. Berlin"
          />
        </div>
        <CharactersUsed
          charactersUsed={watch("location")?.length || 0}
          maxCharacters={50}
          offset={{ small: 2, medium: 8, large: 13 }}
        />
        <div className="max-md:flex-col gap-2 md:w-[30rem] xl:w-[40rem] flex justify-between items-center my-4">
          {errors.location?.type === "required" && (
            <p className="text-red-500 my-4" role="alert">
              Location is required!
            </p>
          )}
          {errors.location?.type === "minLength" && (
            <p className="text-red-500 my-4" role="alert">
              Please use at least 2 characters!
            </p>
          )}
          {errors.location?.type === "maxLength" && (
            <p className="text-red-500 my-4" role="alert">
              Please use max 50 characters!
            </p>
          )}
        </div>
        <div className="max-md:flex-col gap-2 md:w-[30rem] xl:w-[40rem] flex justify-between items-center my-4">
          <label htmlFor="website">Website</label>
          <input
            className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
            type="text"
            id="website"
            {...register("website", {
              pattern:
                /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/,
              maxLength: 100,
            })}
            aria-label="website"
            placeholder="e.g. https://www.company.com"
          />
        </div>
        <CharactersUsed
          charactersUsed={watch("website")?.length || 0}
          maxCharacters={50}
          offset={{ small: 2, medium: 8, large: 13 }}
        />
        <div className="max-md:flex-col gap-2 md:w-[30rem] xl:w-[40rem] flex justify-between items-center my-4">
          {errors.website?.type === "pattern" && (
            <p className="text-red-500" role="alert">
              Please use a valid website url format
            </p>
          )}
          {errors.website?.type === "maxLength" && (
            <p className="text-red-500 my-4" role="alert">
              Please use max 100 characters!
            </p>
          )}
        </div>
        <div className="max-md:flex-col gap-2 md:w-[30rem] xl:w-[40rem] flex justify-between items-center my-4">
          <label htmlFor="description">Description*</label>
          <textarea
            className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
            type="text"
            id="description"
            {...register("description", {
              required: true,
              minLength: 50,
              maxLength: 500,
            })}
            aria-label="description"
            placeholder="e.g. We are looking for a Frontend Developer to join our team..."
          ></textarea>
        </div>
        <CharactersUsed
          charactersUsed={watch("description")?.length || 0}
          maxCharacters={500}
          offset={{ small: 2, medium: 8, large: 13 }}
        />
        <div className="max-md:flex-col gap-2 md:w-[30rem] xl:w-[40rem] flex justify-between items-center my-4">
          {errors.description?.type === "required" && (
            <p className="text-red-500 my-4" role="alert">
              Description is required!
            </p>
          )}
          {errors.description?.type === "minLength" && (
            <p className="text-red-500 my-4" role="alert">
              Please use at least 50 characters!
            </p>
          )}
          {errors.description?.type === "maxLength" && (
            <p className="text-red-500 my-4" role="alert">
              Please use max 500 characters!
            </p>
          )}
        </div>
        <div className="max-md:flex-col gap-2 md:w-[30rem] xl:w-[40rem] flex justify-between items-center my-4">
          <label htmlFor="requirementsContent">Requirements*</label>
          <textarea
            className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
            type="text"
            id="requirementsContent"
            {...register("requirementsContent", {
              required: true,
              minLength: 50,
              maxLength: 500,
            })}
            aria-label="requirementsContent"
            placeholder="e.g. 3+ years of experience as a Frontend Developer..."
          ></textarea>
        </div>
        <CharactersUsed
          charactersUsed={watch("requirementsContent")?.length || 0}
          maxCharacters={500}
          offset={{ small: 2, medium: 8, large: 13 }}
        />
        <div className="max-md:flex-col gap-2 md:w-[30rem] xl:w-[40rem] flex justify-between items-center my-4">
          {errors["requirementsContent"]?.type === "required" && (
            <p className="text-red-500 my-4" role="alert">
              Requirements is required!
            </p>
          )}
          {errors["requirementsContent"]?.type === "minLength" && (
            <p className="text-red-500 my-4" role="alert">
              Please use at least 50 characters!
            </p>
          )}
          {errors["requirementsContent"]?.type === "maxLength" && (
            <p className="text-red-500 my-4" role="alert">
              Please use max 500 characters!
            </p>
          )}
        </div>
        <div className="max-md:flex-col gap-2 md:w-[30rem] xl:w-[40rem] flex justify-between items-center my-4">
          <label htmlFor="requirements-items">Other Requirements</label>
          <div className="flex items-center gap-4 w-full">
            <ul className="list-disc">
              {requirementsItems.map((item, index) => (
                <div
                  className="flex items-center justify-between gap-4"
                  key={`${item + index}`}
                >
                  <li className="text-lg">{item}</li>
                  <p onClick={() => removeRequirement(index)}>
                    <span className="cursor-pointer">
                      <IoMdCloseCircleOutline />
                    </span>
                  </p>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-md:flex-col gap-2 md:w-[30rem] xl:w-[40rem] flex justify-between items-center my-4">
          <label className="pt-4" htmlFor="requirements-items">
            New Requirement
          </label>
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="md:flex md:items-center md:gap-4 md:w-full">
              <input
                className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
                type="text"
                id="requirements-items"
                {...register("requirements-items", {
                  minLength: 2,
                  maxLength: 100,
                })}
                aria-label="requirements-items"
                placeholder="Max 5 items"
              />
              <button
                onClick={(e) => handleAddRequirementsItem(e)}
                className="btn border-0 my-4 duration-0 capitalize text-white bg-accent max-md:w-full hover:bg-info"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
        <CharactersUsed
          charactersUsed={watch("requirements-items")?.length || 0}
          maxCharacters={100}
          offset={{ small: 2, medium: 8, large: 13 }}
        />
        <div className="max-md:flex-col gap-2 md:w-[30rem] xl:w-[40rem] flex justify-between items-center my-4">
          {errors["requirements-items"]?.type === "minLength" && (
            <p className="text-red-500 my-4" role="alert">
              Please use at least 2 characters!
            </p>
          )}
          {errors["requirements-items"]?.type === "maxLength" && (
            <p className="text-red-500 my-4" role="alert">
              Please use max 100 characters!
            </p>
          )}
          {errors["requirements-items"]?.type === "maxItems" && (
            <p className="text-red-500 my-4" role="alert">
              Please use max 5 items!
            </p>
          )}
        </div>
        <div className="max-md:flex-col gap-2 md:w-[30rem] xl:w-[40rem] flex justify-between items-center my-4">
          <label htmlFor="roleContent">Role*</label>
          <textarea
            className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
            type="text"
            id="roleContent"
            {...register("roleContent", {
              required: true,
              minLength: 50,
              maxLength: 500,
            })}
            aria-label="roleContent"
            placeholder="e.g. You will be responsible for the development of our website..."
          ></textarea>
        </div>
        <CharactersUsed
          charactersUsed={watch("roleContent")?.length || 0}
          maxCharacters={500}
          offset={{ small: 2, medium: 8, large: 13 }}
        />
        <div className="max-md:flex-col gap-2 md:w-[30rem] xl:w-[40rem] flex justify-between items-center my-4">
          {errors["roleContent"]?.type === "required" && (
            <p className="text-red-500 my-4" role="alert">
              Role is required!
            </p>
          )}
          {errors["roleContent"]?.type === "minLength" && (
            <p className="text-red-500 my-4" role="alert">
              Please use at least 50 characters!
            </p>
          )}
          {errors["roleContent"]?.type === "maxLength" && (
            <p className="text-red-500 my-4" role="alert">
              Please use max 500 characters!
            </p>
          )}
        </div>
        <div className="max-md:flex-col gap-2 md:w-[30rem] xl:w-[40rem] flex justify-between items-center my-4">
          <label htmlFor="role-items">Other Roles</label>
          <div className="flex items-center gap-4 w-full">
            <ul className="list-disc">
              {roleItems.map((item, index) => (
                <div
                  className="flex items-center justify-between gap-4"
                  key={`${item + index}`}
                >
                  <li className="text-lg">{item}</li>
                  <p onClick={() => removeRole(index)}>
                    <span className="cursor-pointer">
                      <IoMdCloseCircleOutline />
                    </span>
                  </p>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-md:flex-col gap-2 md:w-[30rem] xl:w-[40rem] flex justify-between items-center my-4">
          <label className="pt-7" htmlFor="role-items">
            New Role
          </label>
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="md:flex md:items-center md:gap-4 md:w-full">
              <input
                className="max-md:w-[18rem] w-[20rem] rounded border pl-2 text-accent"
                type="text"
                id="role-items"
                {...register("role-items", {
                  minLength: 2,
                  maxLength: 100,
                })}
                aria-label="role-items"
                placeholder="Max 5 items"
              />
              <button
                onClick={(e) => handleAddRoleItem(e)}
                className="btn border-0 my-4 duration-0 capitalize text-white bg-accent max-md:w-full hover:bg-info"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
        <CharactersUsed
          charactersUsed={watch("role-items")?.length || 0}
          maxCharacters={100}
          offset={{ small: 2, medium: 8, large: 13 }}
        />
        <div className="max-md:flex-col gap-2 md:w-[30rem] xl:w-[40rem] flex justify-between items-center">
          {errors["role-items"]?.type === "minLength" && (
            <p className="text-red-500 my-4" role="alert">
              Please use at least 2 characters!
            </p>
          )}
          {errors["role-items"]?.type === "maxLength" && (
            <p className="text-red-500 my-4" role="alert">
              Please use max 100 characters!
            </p>
          )}
          {errors["role-items"]?.type === "maxItems" && (
            <p className="text-red-500 my-4" role="alert">
              Please use max 5 items!
            </p>
          )}
        </div>
        <input
          type="submit"
          value="Save and publish"
          className="btn mt-8 mb-4 border-0 duration-0 capitalize text-white bg-accent max-md:w-full hover:bg-info"
        />
      </form>
    </Style>
  );
};

export default CreateJobs;
