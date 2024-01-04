import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getApps } from "../slices/appsSlice";
import { useNavigate } from "react-router-dom";
import CharactersUsed from "./CharactersUsed";

const Style = styled.section`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
  top: 0;
  width: 100%;
  min-height: 100vh;
  padding-top: 5rem;

  input,
  textarea {
    width: 100%;
    border-radius: 5px;
  }

  textarea {
    height: 30vh;
    min-height: 20vh;
    max-height: 40vh;
    padding: 1rem;
    border: 1px solid #ccc;
  }

  ul {
    margin-left: 2rem;
  }

  @media screen and (max-width: 767px) {
    padding-top: 2rem;
  }
`;

const ApplicationForm = ({ setIsApplication }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { getAccessTokenSilently } = useAuth0();
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      data.job_id = param.jobId;
      const token = await getAccessTokenSilently();
      const response = await axios.post("http://localhost:3000/apply", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      dispatch(getApps({ payload: response.data }));
      navigate(`/dashboard`);
    } catch (error) {
      console.error("Error calling API:", error);
      console.log(error.response.data);
    }
  };

  return (
    <Style>
      <button
        className="btn block m-auto bg-neutral text-primary capitalize my-4"
        onClick={() => setIsApplication(false)}
      >
        CLOSE
      </button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex flex-col bg-neutral m-auto p-10 max-md:w-[327px] 
        max-md:p-6 md:w-[690px] xl:w-[1100px] shadow rounded-xl"
      >
        <h2 className="text-center font-bold">Write Application</h2>
        <div className="flex flex-col gap-4 justify-center items-center my-4">
          <label htmlFor="content">Application Text</label>
          <textarea
            className="bg-neutral text-primary"
            type="text"
            id="content"
            {...register("content", {
              required: true,
              minLength: 50,
              maxLength: 500,
            })}
            placeholder="Write your application here (min 50 and max 500 characters)"
            aria-invalid={errors.content ? "true" : "false"}
          />
          {errors.content?.type === "required" && (
            <p className="text-red-500" role="alert">
              Text is required
            </p>
          )}
          {errors.content?.type === "minLength" && (
            <p className="text-red-500" role="alert">
              Please add least 50 characters
            </p>
          )}
          {errors.content?.type === "maxLength" && (
            <p className="text-red-500" role="alert">
              You can't type more than 500 characters
            </p>
          )}
        </div>
        <CharactersUsed
          charactersUsed={watch("content")?.length || 0}
          maxCharacters={500}
          offset={{ small: 0, medium: 0, large: 0 }}
        />
        <input
          type="submit"
          value="submit application"
          className="btn my-4 duration-0 capitalize text-white bg-accent max-md:max-w-full 
          max-w-[10rem] self-center hover:bg-info border-none"
        />
      </form>
    </Style>
  );
};

export default ApplicationForm;
