import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

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

  const onSubmit = (data) => console.log(data); //Post request to backend

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
          <label htmlFor="website">Website</label>
          <textarea type="text" id="website" {...register("website")} />
        </div>
        <input type="submit" value="Save Changes" className="self-center btn" />
      </form>
    </Style>
  );
};

export default ApplicationForm;
