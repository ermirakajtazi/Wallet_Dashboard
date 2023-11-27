import React from "react";

export const Profile = () => {
  return (
    <div className="bg-[#0d0d0d] px-10 py-5 justify-center flex flex-col items-center rounded-xl text-[#dedede]">
      <span className="font-semibold "> Profile Details</span>
      <div className="rounded-full border border-blue-500 w-[250px] h-[250px] lg: relative my-4">
        <img
          className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          src="/images/hero-image.png"
          alt="profile"
          width={300}
          height={300}
        />
      </div>
      <span className="font-semibold text-lg">Ermira Kajtazi</span>
      <span className="text-sm">ermirakajtazi8@gmail.com</span>
    </div>
  );
};
