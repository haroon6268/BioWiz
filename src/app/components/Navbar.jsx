import React from "react";
import Button from "./Button";

const Navbar = () => {
  return (
    <div className="min-h-[40px] max-h-[60px] p-[20px] bg-dark-green flex items-center justify-between">
      <h1 className="font-extrabold text-white text-2xl">BioWiz</h1>
      <div className="flex flex-row space-x-4">
        <Button bordered={false}>Login</Button>
        <Button>Sign Up</Button>
      </div>
    </div>
  );
};

export default Navbar;
