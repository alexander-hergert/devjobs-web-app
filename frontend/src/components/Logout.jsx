import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      className="border p-2 bg-slate-500 rounded-xl"
      onClick={() => {
        logout({ logoutParams: { returnTo: window.location.origin } });
        localStorage.setItem("user", JSON.stringify(false));
      }}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
