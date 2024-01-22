import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Style = styled.main`
  min-height: 100vh;
  padding-top: 10rem;
  background-color: black;
`;

const ErrorPage = () => {
  return (
    <Style
      className=" text-center text-slate-100 font uppercase 
  text-4xl bg-slate-950"
    >
      <div className="mt-[10rem] capitalize">
        sorry this page is unavailable.
        <span className="text-amber-500"> &nbsp;Page does not exist!</span>
      </div>
      <Link to="/" className="btn">
        Home
      </Link>
    </Style>
  );
};

export default ErrorPage;
