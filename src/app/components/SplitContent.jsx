import React from "react";
import Button from "./Button";

const SplitContent = ({ img, header, subHeader, reverse }) => {
  const isReversed = reverse ? "flex-row-reverse" : "flex-row";
  return (
    <div className="h-[70vh] lg:h-[60vh] p-6 flex justify-center items-center min-h-[600px] lg:max-h-[650px]">
      <div
        className={`max-w-[1200px] h-full flex xs:flex-col-reverse ${
          reverse ? "lg:flex-row-reverse" : "lg:flex-row"
        } lg:space-x-6 justify-center items-center xs:space-y-6 lg:space-y-0`}
      >
        <div className="xs:space-y-4 lg:space-y-8 max-w-[600px] lg:ml-6 xs:mt-6 lg:mt-0">
          <h2 className="xs:text-2xl lg:text-5xl font-extrabold tracking-tighter">
            {header}
          </h2>
          <p className="text-lg">{subHeader}</p>
          <Button>Learn More</Button>
        </div>
        <img
          src={img}
          className="rounded-3xl xs:w-[382px] xs:h-[382px] lg:h-[475px] lg:w-[475px] object-cover"
        />
      </div>
    </div>
  );
};

export default SplitContent;
