import React from "react";
import { Avatar } from "../Avatar/Avatar";

export const MenuOverlay = () => {
  return (
    <ul className="flex flex-col py-4 items-center">
      <Avatar
        src={"/images/hero-image.png"}
        alt="assets"
        size="w-12 h-12"
        name={"Ermira"}
        backgroundColor='#0d0d0d'
      />
    </ul>
  );
};
