import React from "react";
import { AvatarInterface } from "./AvatarInterface";

export const Avatar = ({
  src,
  alt,
  size = "w-12 h-12",
  name,
  backgroundColor = "transparent",
}: AvatarInterface) => {
  const hasImage = src !== undefined && src !== null;
  const getInitials = (name: string) => {
    return name
      ? name
          .split(" ")
          .map((word) => word[0].toUpperCase())
          .join("")
      : "";
  };
  return (
    <div
      className={`rounded-full overflow-hidden ${size} bg-[${backgroundColor}] flex items-center justify-center`}
    >
      {hasImage ? (
        <img className="object-cover w-full h-full" src={src} alt={alt} />
      ) : (
        <span className="text-white text-lg font-semibold">
          {getInitials(name)}
        </span>
      )}
    </div>
  );
};
