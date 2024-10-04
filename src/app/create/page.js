import React from "react";
import Input from "../components/Input";

const page = () => {
	return (
		<div className="bg-white h-[90vh] flex items-center justify-center">
			<div className="space-y-4 bg-dark-green h-[400px] flex flex-col p-[20px] items-center w-[80%] rounded-xl text-white">
				<h1 className="text-2xl font-bold tracking-tight">Create a new Set</h1>
				<Input placeholder={"Enter a Title"} width="100%" />
				<Input placeholder={"Enter a Description"} width="100%" />
				<Input type="file" />
			</div>
		</div>
	);
};

export default page;
