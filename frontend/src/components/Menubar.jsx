import React from "react";
import styled from "styled-components";
import ThemeSwitcher from "./ThemeSwitcher";
import LoginButton from "../components/Login";
import LogoutButton from "../components/Logout";
import { useAuth0 } from "@auth0/auth0-react";

const StyledMenubar = styled.nav`
  background-image: url("../assets/desktop/bg-pattern-header.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  width: 100vw;
  height: calc(11vw);

  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    background-image: url("../assets/tablet/bg-pattern-header.svg");
    height: calc(22vw);
  }

  @media screen and (max-width: 400px) {
    background-image: url("../assets/mobile/bg-pattern-header.svg");
  }
`;

const Menubar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <StyledMenubar>
      <div className="w-[90vw] flex justify-between items-center">
        <img src="../assets/desktop/logo.svg" alt="logo" />
        <div className="flex items-center gap-8">
          {!isLoading && (
            <div className="flex gap-4">
              <LoginButton />
              <LogoutButton />
            </div>
          )}
          <ThemeSwitcher />
        </div>
      </div>
    </StyledMenubar>
  );
};

export default Menubar;
