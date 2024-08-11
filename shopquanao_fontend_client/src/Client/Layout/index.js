// Layout.js
import React from "react";
import Header from "./DefaultLayout/Header";
import Container from "./DefaultLayout/Container";
//import Section from "./DefaultLayout/Section";
import Footer from "./DefaultLayout/Footer";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  // Kiểm tra nếu đang ở trang chủ thì hiển thị Container và Section
  const showContainerAndSection = location.pathname === "/client";

  return (
    
    <div id="page">
      <Header />
       {showContainerAndSection && <Container />} 
      
      <Outlet /> 
      <Footer /> 
    </div>
    
  );
};

export default Layout;
