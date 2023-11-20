import React from "react";
import { Link } from "react-router-dom";

const SignUpButton = () => {
  return (
    <Link className="p-2 text-center max-md:bg-accent bg-neutral max-md:text-white 
    text-primary rounded-xl" to="/signup">
      Sign Up
    </Link>
  );
};

export default SignUpButton;
