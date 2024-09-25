"use client";
import React, { useState } from "react";
import { postRequest } from "../lib/fetcher";
import Image from "next/image";

const Page = () => {
  const [file, setFile] = useState(null);
  const handleChange = (files) => {
    setFile(files[0]);
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("img", file);
    const res = postRequest("/scan", formData);
    console.log("submitted");
  };

  return (
    <form
      method="post"
      encType="multipart/form-data"
      onSubmit={(x) => x.preventDefault()}
    >
      <input type="file" onChange={(x) => handleChange(x.target.files)} />
      <button
        onClick={(x) => {
          handleSubmit();
        }}
      >
        Submit
      </button>
      <img src="https://storage.cloud.google.com/my-ai-image-bucket/6f7bc4e8-c5ac-4352-b8cd-21bf8af0bf24.png" />
    </form>
  );
};

export default Page;
