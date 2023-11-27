import React from "react";
import { Profile } from "./Profile";
import DoughnutChart from "./VisualAssets";

export const ProfileContainer = () => {
  return (
    <div className="mt-28">
      <Profile />
      <DoughnutChart />
    </div>
  );
};
