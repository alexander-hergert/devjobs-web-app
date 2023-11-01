import React from "react";
import { Outlet } from "react-router-dom";
import Menubar from "../components/Menubar";
import Footer from "../components/Footer";

//shared code goes into jsx
const SharedLayout = () => {
  return (
    <>
      <Menubar />
      <Outlet />
      <Footer />
    </>
  );
};

export default SharedLayout;
