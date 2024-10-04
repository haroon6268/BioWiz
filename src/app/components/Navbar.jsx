import React from "react";

import { auth } from "@/auth";
import { SignOut } from "./SignOut";
import SignIn from "./GoogleSignin";
const Navbar = () => {
  return (
    <div className="min-h-[40px] max-h-[60px] p-[20px] bg-dark-green flex items-center justify-between">
      <div className="flex items-center space-x-1 relative left-[-9px]">
        <img src="/heart.png" className="h-[40px] w-[40px] relative"></img>
        <h1 className="font-extrabold text-white text-2xl tracking-tighter">
          BioWiz
        </h1>
      </div>
      <div className="flex flex-row space-x-4">
        <SignIn />
      </div>
    </div>
  );
};

export default Navbar;
