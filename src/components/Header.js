import React from "react";
import { LOGO_URL } from "../utils/constants";

const Header = () => {
  return (
    <div className="border-r-2 border-gray-200 fixed h-full z-10 top-0 left-0">
      <img src={LOGO_URL} className="w-32 m-8 rounded-full" alt="logo" />
      <div className="px-14 text-gray-700">
        <h1>Opportunities</h1>
        <h1 className="my-1">My Profile</h1>
        <button className="hover:underline">Sign Out</button>
      </div>
    </div>
  );
};

export default Header;
