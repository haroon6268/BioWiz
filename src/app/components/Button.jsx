import React from "react";

const Button = ({ children, bordered }) => {
  if (!bordered) {
    return (
      <button className="bg-[#FCCD2A] hover:bg-[#dcb425] px-4 py-2 rounded-md font-bold border-black  border-solid border-r-4 border-b-4 h-fit">
        {children}
      </button>
    );
  } else {
    return (
      <button className="border-[#FCCD2A] h-fit hover:bg-[#dcb425] px-4 py-2 rounded-md font-bold  border-solid border-r-[1px] border-b-[1px] border-l-[1px] border-t-[1px] text-white">
        {children}
      </button>
    );
  }
};

export default Button;
