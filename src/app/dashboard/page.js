"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Sidebar from "../components/Sidebar";
import { getRequest } from "../lib/fetcher";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const { data, status } = useSession();
    const [user, setUser] = useState(null);
    console.log(data);
    useEffect(() => {
        if (status == "loading") {
            return;
        }
        const userId = data?.user?.id;
        let user;

        getRequest("/user?id=" + userId).then((data) => {
            setUser(data.data.user);
            console.log("user", data);
        });
    }, [status]);

    const router = useRouter();
    if (status != "loading") {
        return (
            <div className="h-[95vh] p-4 text-white space-y-6 ">
                <div>
                    <h1 className="font-bold text-xl lg:text-3xl">
                        Welcome{" "}
                        <span className="text-primary-yellow">
                            {user?.name}!
                        </span>
                    </h1>
                </div>
                <div className="space-y-2">
                    <h1 className="text-lg font-bold lg:text-2xl">Your Sets</h1>
                    <div className="flex overflow-auto space-x-4">
                        {user?.flashCardSets.map((x, i) => {
                            return (
                                <div
                                    className="h-[200px] bg-light-green rounded-xl w-[300px] flex-shrink-0 text-[#333] p-4 backdrop:blur-3xl lg:h-[300px] lg:w-[500px]"
                                    onClick={() => router.push("/set/" + x.id)}
                                >
                                    <p className="text-xl font-bold">
                                        {x.title}
                                    </p>
                                    <p className="text-lg font-bold ">
                                        {x.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
};

export default Dashboard;
