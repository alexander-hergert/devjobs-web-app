import React from "react";
import { Link } from "react-router-dom";

const SignUpButton = () => {
  return (
    <Link className="border p-2 bg-white text-slate-900 rounded-xl" to="/signup">
      Sign Up
    </Link>
  );
};

export default SignUpButton;
