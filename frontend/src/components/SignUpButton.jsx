import React from "react";
import { Link } from "react-router-dom";

const SignUpButton = () => {
  return (
    <Link className="border p-2 bg-slate-500 rounded-xl" to="/signup">
      Sign Up
    </Link>
  );
};

export default SignUpButton;
