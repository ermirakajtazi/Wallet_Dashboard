import React from "react";
import { TypeAnimation } from "react-type-animation";
import { useAssetsContext } from "../contexts/Assets";

export const TotalBalance = () => {
  const { assets } = useAssetsContext();
  const totalBalance = Object.values(assets).reduce((total, asset) => {
    return total + parseFloat(asset.balance);
  }, 0);
  return (
    <section>
      <div className="place-self-center text-center sm:text-left container mx-auto">
        <h1 className="text-white mb-4 text-4xl sm:text-3xl lg:text-4xl font-extrabold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r  from-blue-500 via-purple-500 to-pink-500">
            Hello
          </span>
          <TypeAnimation
            sequence={[" Ermira", 1000, " Welcome", 1000]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </h1>
        <p className="text-[#ADB7BE] text-base sm:text-lg lg:text-xl mb-6">
          Get an overview of your digital wallet balance and digital
          transactions
        </p>
      </div>
      <div>
        <h1 className="text-xl sm:text-xl lg:text-2xl text-[#dedede] font-semibold pb-4">
          Card:
          <span className="pl-1 text-transparent bg-clip-text bg-gradient-to-r  from-blue-500 via-purple-500 to-pink-500">
            Visa
          </span>
        </h1>
        <div className="flex bg-[#191919] p-10 rounded">
          <div>
            <img src="/images/Design.png" alt="card" height={250} width={300} />
          </div>
          <div className="flex flex-row justify-between pl-10">
            <h1 className="text-lg sm:text-xl lg:text-2xl text-[#dedede]  font-semibold">
              Total Balance:
            </h1>
            <span className="text-lg sm:text-xl lg:text-2xl text-white font-extrabold pl-5">
              {totalBalance.toFixed(4)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
