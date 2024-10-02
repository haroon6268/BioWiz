import React from "react";

const Button = ({ children, type }) => {
  return (
    <button
      type={type}
      className="bg-[#FCCD2A] hover:bg-[#dcb425] px-4 py-2 rounded-md font-bold border-black  border-solid border-r-4 border-b-4 h-fit"
    >
      {children}
    </button>
  );
};

export default Button;
