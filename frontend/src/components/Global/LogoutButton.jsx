import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CiLogout } from "react-icons/ci";
import axios from "axios";
import { getCsrfToken } from "../../utils";
import { toast, ToastContainer } from "react-toastify";

const LogoutButton = () => {
  const { logout, getAccessTokenSilently } = useAuth0();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const csrfToken = getCsrfToken();

  return (
    <>
      <ToastContainer />
      <button
        className="p-2 max-md:bg-accent bg-neutral max-md:text-white text-primary rounded-xl"
        onClick={async () => {
          try {
            const token = await getAccessTokenSilently();
            const response = await axios.get(`${baseUrl}/logout`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            });
            const logoutResponse = await logout({
              logoutParams: { returnTo: window.location.origin },
            });
          } catch (error) {
            console.error("Error calling API:", error);
            toast.error("Error logging out", {
              toastId: "error-logging-out",
            });
          }
          localStorage.setItem("user", JSON.stringify(false));
        }}
      >
        <div className="justify-center flex gap-2 items-center">
          Log Out
          <CiLogout />
        </div>
      </button>
    </>
  );
};

export default LogoutButton;
