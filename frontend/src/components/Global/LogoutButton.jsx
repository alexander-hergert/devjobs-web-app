import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CiLogout } from "react-icons/ci";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      className="p-2 max-md:bg-accent bg-neutral max-md:text-white text-primary rounded-xl"
      onClick={() => {
        logout({ logoutParams: { returnTo: window.location.origin } });
        localStorage.setItem("user", JSON.stringify(false));
        //delete cookie
        document.cookie =
          "session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }}
    >
      <div className="justify-center flex gap-2 items-center">
        Log Out
        <CiLogout />
      </div>
    </button>
  );
};

export default LogoutButton;
