import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="border p-2 max-md:bg-accent bg-neutral max-md:text-white text-primary rounded-xl"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );
};

export default LoginButton;
