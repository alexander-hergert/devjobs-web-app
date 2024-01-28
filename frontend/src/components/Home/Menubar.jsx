import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ThemeSwitcher from "../Global/ThemeSwitcher";
import LoginButton from "../Global/LoginButton";
import LogoutButton from "../Global/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SignUpButton from "../Global/SignUpButton";
import { TfiMenu } from "react-icons/tfi";
import MobileMenu from "./MobileMenu";
import DashboardButton from "../Global/DashboardButton";

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
  const { isAuthenticated, isLoading } = useAuth0();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const isUserLoading = useSelector((state) => state.user.isLoading);

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
            {isUserLoading ? (
              <p className="text-white">Loading...</p>
            ) : (
              <>
                {!user?.user_id && (
                  <>
                    <SignUpButton />
                    <LoginButton />
                  </>
                )}
                {user?.user_id && (
                  <>
                    <DashboardButton />
                    <LogoutButton />
                  </>
                )}
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
