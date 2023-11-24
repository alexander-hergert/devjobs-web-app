import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ThemeSwitcher from "./ThemeSwitcher";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import SignUpButton from "./SignUpButton";
import { TfiMenu } from "react-icons/tfi";
import MobileMenu from "./MobileMenu";
import DashboardButton from "./DashboardButton";

const StyledMenubar = styled.nav`
  background-image: url("../assets/desktop/bg-pattern-header.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  min-height: 160px;

  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1279px) {
    background-image: url("../assets/tablet/bg-pattern-header.svg");
    min-height: 160px;
  }

  @media screen and (max-width: 400px) {
    background-image: url("../assets/mobile/bg-pattern-header.svg");
    min-height: 136px;
  }
`;

const Menubar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(setUser({ payload: user }));
    }
  }, [user]);

  const handleMenuclick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <StyledMenubar>
      {isMenuOpen && (
        <MobileMenu
          handleMenuclick={handleMenuclick}
          isAuthenticated={isAuthenticated}
        />
      )}
      <div className="max-md:w-[327px] md:w-[690px] xl:w-[1100px] flex justify-between items-center">
        <Link to="/">
          <img src="../assets/desktop/logo.svg" alt="logo-devjobs" />
        </Link>
        <TfiMenu
          onClick={handleMenuclick}
          className=" cursor-pointer text-white w-[2rem] h-[2rem] md:hidden"
        />
        <div className="flex items-center gap-8">
          <div className="max-md:hidden flex items-center gap-4">
            {!isAuthenticated && <SignUpButton />}
            {!isAuthenticated && <LoginButton />}
            {isAuthenticated && (
              <>
                <DashboardButton />
                <LogoutButton />
              </>
            )}
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </StyledMenubar>
  );
};

export default Menubar;
