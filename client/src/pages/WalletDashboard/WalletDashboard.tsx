import React from "react";
import { Navbar } from "../../components/Header/Navbar";
import { TotalBalance } from "../../components/TotalBalance";
import { Outlet } from "react-router-dom";
import { ProfileContainer } from "../../components/Profile/ProfileContainer";

export const WalletDashboard = () => {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="rounded pl-10 flex sm:flex-col md:flex-col xl:flex-row">
        <div className="bg-[#0d0d0d] p-10 mt-28 mb-10 basis-9/12">
          <TotalBalance />
          <Outlet />
        </div>
        <div className="basis-auto mx-10">
          <ProfileContainer />
        </div>
      </div>
    </main>
  );
};
