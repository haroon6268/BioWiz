import Button from "./Button";
import React from "react";

const Hero = () => {
  return (
    <div className="xs:h-[80vh] lg:h-[60vh] flex justify-center items-center p-6 min-h-[800px] lg:max-h-[900px] bg-white">
      <div className="max-w-[1200px] flex xs:flex-col lg:flex-row w-full justify-center xs:space-y-6 lg:space-y-0 items-center lg:space-x-2">
        <div className="space-y-6 max-w-[600px]">
          <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tighter">
            Ace your Biology Exams with AI-Powered Flashcards and Quizzes
          </h1>
          <p className="lg:text-lg">
            Upload anatomy diagrams, and our AI instantly generates flashcards
            and quizzes to help you study smarter, not harder.
          </p>
          <Button>Get Started</Button>
        </div>
        <img
          src="heart.png"
          className="xs:h-[300px] xs:w-[300px] lg:h-[500px] lg:w-[500px]"
        ></img>
      </div>
    </div>
  );
};

export default Hero;
