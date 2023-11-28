import React from "react";
import { Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";

const SignUpButton = () => {
  return (
    <Link
      className="p-2 text-center max-md:bg-accent bg-neutral max-md:text-white 
    text-primary rounded-xl"
      to="/signup"
    >
      <div className="flex gap-2 justify-center items-center">
        Sign Up
        <FaPencilAlt />
      </div>
    </Link>
  );
};

export default SignUpButton;
