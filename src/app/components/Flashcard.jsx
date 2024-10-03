"use client";
import { useState } from "react";
import Image from "next/image";
import Button from "./Button";
const Flashcard = ({ img, question, value }) => {
  const [flipped, setFlipped] = useState(false);
  if (!flipped) {
    return (
      <div
        onClick={() => setFlipped(!flipped)}
        className="p-4 space-y-4 h-[400px] flex justify-center items-center flex-col bg-light-green w-[100%] rounded-lg drop-shadow-2xl lg:w-[600px] lg:h-[500px]"
      >
        <h1 className="font-bold text-xl">{question}</h1>
        <Image
          src={img}
          className="h-[300px] rounded-lg object-contain"
          height={96}
          width={96}
        />
      </div>
    );
  } else {
    return (
      <div
        onClick={() => setFlipped(!flipped)}
        className="p-4 space-y-4 h-[400px] flex justify-center items-center flex-col bg-light-green w-[80%] rounded-lg drop-shadow-2xl lg:w-[600px] lg:h-[500px]"
      >
        <h1 className="font-bold text-2xl">{value}</h1>
      </div>
    );
  }
};

export default Flashcard;
