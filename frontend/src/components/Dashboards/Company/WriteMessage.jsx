import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { getMessages } from "../../../slices/messagesSlice";
import { useDispatch } from "react-redux";
import CharactersUsed from "../../Global/CharactersUsed";

const Style = styled.section`
  position: fixed;
  top: 0;
  padding-top: 5rem;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 100;
  width: 100%;
  min-height: 100dvh;

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

  @media screen and (max-width: 767px) {
    padding-top: 2rem;
  }
`;

const WriteMessage = ({ setIsMessageOpen, companyApps, selectedApp }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const onSubmit = async (data) => {
    try {
      data.app_id = companyApps[selectedApp].app?.app_id;
      const token = await getAccessTokenSilently();
      const response = await axios.post(`${baseUrl}/createMessage`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      dispatch(getMessages({ messages: response.data, isLoading: false }));
      setIsMessageOpen(false);
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  return (
    <Style>
      <button
        className="btn block m-auto border-0 text-white capitalize my-4 bg-red-500 hover:bg-red-200"
        onClick={() => setIsMessageOpen(false)}
        aria-label="close"
      >
        CLOSE
      </button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex flex-col bg-neutral m-auto p-10 max-md:w-[327px] 
        max-md:p-6 md:w-[690px] xl:w-[1100px] shadow rounded-xl"
      >
        <h2 className="text-center font-bold">Write Message</h2>
        <div className="flex flex-col gap-4 justify-center items-center my-4">
          <label htmlFor="content">Message Text</label>
          <textarea
            className="bg-neutral text-primary"
            type="text"
            id="content"
            {...register("content", {
              required: true,
              minLength: 50,
              maxLength: 500,
            })}
            placeholder="Write your message here (min 50 and max 500 characters)"
            aria-invalid={errors.content ? "true" : "false"}
          />
          <CharactersUsed
            charactersUsed={watch("content")?.length || 0}
            maxCharacters={500}
            offset={{ small: 0, medium: 0, large: 0 }}
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
        <input
          type="submit"
          value="submit message"
          className="btn my-4 duration-0 capitalize text-white bg-accent max-md:max-w-full 
          max-w-[10rem] self-center hover:bg-info border-none"
        />
      </form>
    </Style>
  );
};

export default WriteMessage;
