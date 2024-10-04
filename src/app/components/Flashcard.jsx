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
				className="p-4 space-y-4 h-[400px] flex justify-center items-center flex-col bg-dark-green border-primary-yellow border-4 w-[100%] rounded-xl drop-shadow-2xl lg:w-[600px] lg:h-[500px] text-white hover:bg-green-900 hover:cursor-pointer"
			>
				<h1 className="font-bold text-xl">{question}</h1>
				<div className="h-[300px] w-[300px] relative">
					<Image src={img} fill style={{ objectFit: "contain" }} />
				</div>
			</div>
		);
	} else {
		return (
			<div
				onClick={() => setFlipped(!flipped)}
				className="p-4 space-y-4 h-[400px] flex justify-center items-center flex-col bg-dark-green border-primary-yellow border-4 w-[100%] rounded-xl drop-shadow-2xl lg:w-[600px] lg:h-[500px] text-white hover:bg-green-900 hover:cursor-pointer"
			>
				<h1 className="font-bold text-2xl">{value}</h1>
			</div>
		);
	}
};

export default Flashcard;
