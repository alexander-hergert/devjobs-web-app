import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CiLogin } from "react-icons/ci";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="p-2 max-md:bg-accent bg-neutral max-md:text-white text-primary rounded-xl"
      onClick={() => loginWithRedirect()}
    >
      <div className="flex gap-2 justify-center items-center">
        Log In
        <CiLogin />
      </div>
    </button>
  );
};

export default LoginButton;
