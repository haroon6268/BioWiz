"use client";

import React from "react";

const Input = ({ type = "text", width, onChange, value, placeholder }) => {
	if (type == "text") {
		return (
			<input
				style={{ width: width }}
				onChange={() => onChange}
				value={value}
				placeholder={placeholder}
				className="rounded-sm h-8"
			/>
		);
	} else if (type == "file") {
		return <input type="file" width={width} onChange={() => onChange} />;
	}
};

export default Input;
