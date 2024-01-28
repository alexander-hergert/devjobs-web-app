import React from "react";
import styled from "styled-components";
import LoginButton from "../Global/LoginButton";
import LogoutButton from "../Global/LogoutButton";
import SignUpButton from "../Global/SignUpButton";
import DashboardButton from "../Global/DashboardButton";

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
  return (
    <Overlay onClick={handleMenuclick}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-4 flex flex-col justify-center gap-8 bg-neutral w-[327px] h-[25vh] 
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
            <DashboardButton />
            <LogoutButton />
          </>
        )}
      </div>
    </Overlay>
  );
};

export default MobileMenu;
