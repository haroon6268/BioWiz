import React from "react";
import Button from "./Button";

const CTA = () => {
  return (
    <div className="h-[70vh] lg:min-h-[600px] bg-custom-svg flex justify-center items-center p-6">
      <div className="space-y-4 flex flex-col items-center justify-center">
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tighter text-center">
          What are you Waiting For?
        </h2>
        <p className="text-center text-lg">Join 1000+ Other Students Today!</p>
        <Button>Join Now</Button>
      </div>
    </div>
  );
};

export default CTA;
