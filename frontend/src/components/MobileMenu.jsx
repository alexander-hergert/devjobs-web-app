import React from "react";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import SignUpButton from "./SignUpButton";

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
            <Link
              to="/dashboard"
              className="cursor-pointer text-center bg-accent text-white p-2 rounded-xl"
            >
              Dashboard
            </Link>
            <LogoutButton />
          </>
        )}
      </div>
    </Overlay>
  );
};

export default MobileMenu;
