import React from "react";
import styled from "styled-components";
import LoginButton from "../Global/LoginButton";
import LogoutButton from "../Global/LogoutButton";
import SignUpButton from "../Global/SignUpButton";
import DashboardButton from "../Global/DashboardButton";
import { useLocation } from "react-router-dom";
import BackToAllJobsNavigation from "../Global/BackToAllJobsNavigation";

const Overlay = styled.section`
  position: fixed;
  top: 0;
  padding-top: 5rem;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenu = ({ handleMenuclick, isAuthenticated }) => {
  const location = useLocation();
  return (
    <Overlay onClick={handleMenuclick}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-4 flex flex-col justify-center gap-4 bg-neutral w-[327px] h-[25vh] 
        rounded-lg shadow"
      >
        {!isAuthenticated && (
          <>
            <SignUpButton />
            <LoginButton />
          </>
        )}
        {isAuthenticated && (
          <>
            {location.pathname !== "/" && <BackToAllJobsNavigation />}
            {location.pathname !== "/dashboard" && <DashboardButton />}
            <LogoutButton />
          </>
        )}
      </div>
    </Overlay>
  );
};

export default MobileMenu;
