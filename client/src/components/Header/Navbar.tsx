"use client";
import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { MenuOverlay } from "./MenuOverlay";
import { Avatar } from "../Avatar/Avatar";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-black">
      <div className="flex flex-wrap items-center justify-between mx-auto px-8 py-4">
        <Link to={"/"}>
          <div className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r  from-blue-500 via-purple-500 to-pink-500">
            <span className="text-2xl md:text-3xl text-white pr-2">Wallet</span>
            Dashboard
          </div>
        </Link>
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border border-slate-200 text-slate-200 hover:text-white hover:border-white rounded"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border border-slate-200 text-slate-200 hover:text-white hover:border-white rounded"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            <div className="block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white">
              <Avatar
                src={"/images/hero-image.png"}
                alt="assets"
                size="w-12 h-12"
                name={"Ermira"}
                backgroundColor="#0d0d0d"
              />
            </div>
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay /> : null}
    </nav>
  );
};
