import React, { useEffect } from "react";
import styled from "styled-components";
import ThemeSwitcher from "./ThemeSwitcher";
import LoginButton from "../components/Login";
import LogoutButton from "../components/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";

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
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setUser({ payload: user }));
    }
  }, [user]);

  return (
    <StyledMenubar>
      <div className="w-[90vw] flex justify-between items-center">
        <Link to="/">
          <img src="../assets/desktop/logo.svg" alt="logo" />
        </Link>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            {!isAuthenticated && <LoginButton />}
            {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className="bg-neutral rounded cursor-pointer"
                >
                  <CgProfile style={{ width: "3rem", height: "3rem" }} />
                </Link>
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
