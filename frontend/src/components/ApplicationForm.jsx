import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

const Style = styled.section`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
  top: 0;
  width: 100vw;
  height: 100vh;
  padding-top: 5rem;

  input,
  textarea {
    width: 30vw;
  }

  textarea {
    height: 50vh;
  }

  ul {
    margin-left: 2rem;
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
    } catch (error) {
      console.error("Error calling API:", error);
      console.log(error.response.data);
    }
  };

  return (
    <Style>
      <button
        className="btn block m-auto bg-neutral"
        onClick={() => setIsApplication(false)}
      >
        CLOSE
      </button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex flex-col bg-neutral w-[50vw] m-auto p-10"
      >
        <h2 className="text-center">Write Application</h2>
        <div className="flex gap-4 justify-between my-4">
          <label htmlFor="content">Application</label>
          <textarea type="text" id="content" {...register("content")} />
        </div>
        <input type="submit" value="Save Changes" className="self-center btn" />
      </form>
    </Style>
  );
};

export default ApplicationForm;
