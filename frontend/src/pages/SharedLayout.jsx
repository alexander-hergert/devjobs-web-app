import React from "react";
import { Outlet } from "react-router-dom";
//import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";

//shared code goes into jsx
const SharedLayout = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Outlet />
      <Footer />
    </>
  );
};

export default SharedLayout;
