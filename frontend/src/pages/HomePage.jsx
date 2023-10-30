import React from "react";
import LoginButton from "../components/Login";
import LogoutButton from "../components/Logout";
import Profile from "../components/Profile";
import { useAuth0 } from "@auth0/auth0-react";

const HomePage = () => {

  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <main>
      <LoginButton />
      <LogoutButton />
    </main>
  );
};

export default HomePage;
