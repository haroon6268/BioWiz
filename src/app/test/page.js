"use client";
import React, { useState } from "react";
import { postRequest } from "../lib/fetcher";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const handleChange = (files) => {
        setFile(files[0]);
    };
    const [counter, setCounter] = useState(0);
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("img", file);
        formData.append("setTitle", title);
        formData.append("setDescription", description);
        const res = await postRequest("/upload", formData);
        let redirect = res.data.redirect;
        router.push(redirect);
    };

    return (
        <>
            <form
                method="post"
                encType="multipart/form-data"
                onSubmit={(x) => x.preventDefault()}
            >
                <input
                    type="file"
                    onChange={(x) => handleChange(x.target.files)}
                />

                <input
                    placeholder="Title"
                    type="text"
                    value={title}
                    onChange={(x) => setTitle(x.target.value)}
                />
                <input
                    placeholder="Description"
                    type="text"
                    value={description}
                    onChange={(x) => setDescription(x.target.value)}
                />
                <button
                    onClick={(x) => {
                        handleSubmit();
                    }}
                >
                    Submit
                </button>
                <img src="https://storage.cloud.google.com/my-ai-image-bucket/6f7bc4e8-c5ac-4352-b8cd-21bf8af0bf24.png" />
            </form>
            <button onClick={() => signIn("google")}>dsdsHello</button>
        </>
    );
};

export default Page;
