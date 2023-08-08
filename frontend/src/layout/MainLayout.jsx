import React from "react";
import HeaderPage from "../components/header/HeaderPage";
import NavBar from "../components/navigation/NavBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <header>
        <HeaderPage />
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
