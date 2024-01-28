import React from "react";
import { styled } from "styled-components";

const Div = styled.div`
  margin: 0 auto;
  margin-top: 6rem;
  margin-bottom: 6rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid #3498db;
  border-top: 5px solid transparent;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = () => {
  return <Div></Div>;
};

export default Loader;
