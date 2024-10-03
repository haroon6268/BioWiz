"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Sidebar from "../components/Sidebar";
import { getRequest } from "../lib/fetcher";
import { useRouter } from "next/navigation";
import Button from "../components/Button";

const Dashboard = () => {
  const { data, status } = useSession();
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (status == "loading") {
      return;
    }
    const userId = data?.user?.id;
    let user;

    getRequest("/user?id=" + userId).then((data) => {
      setUser(data.data.user);
    });
  }, [status]);

  const router = useRouter();
  if (status != "loading") {
    console.log(user?.image);
    return (
      <div className="h-[95vh] p-[20px] text-white space-y-6 ">
        <div className="space-y-2">
          <h1 className="text-lg font-bold lg:text-2xl">Your Sets</h1>
          <div className="flex overflow-auto space-x-4">
            {user?.flashCardSets.map((x, i) => {
              return (
                <div
                  className="h-[200px] bg-light-green rounded-xl w-[300px] flex-shrink-0 text-[#333] p-[20px] backdrop:blur-3xl lg:h-[300px] lg:w-[500px] flex flex-col hover:bg-[#99d474] hover:cursor-pointer"
                  onClick={() => router.push("/set/" + x.id)}
                  key={i}
                >
                  <p className="text-xl font-bold flex-1">{x.title}</p>
                  <div className="flex items-center space-x-1">
                    <img
                      src={user?.image}
                      className="h-[30px] w-[30px] rounded-full"
                    />
                    <p className="font-bold">{user?.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-lg font-bold lg:text-2xl">
            Generate a new Set in Seconds!
          </h1>
          <div className="h-[200px] bg-light-green rounded-xl w-[100%] flex-shrink-0 text-[#333] p-4 backdrop:blur-3xl lg:h-[300px] lg:w-[80%] flex items-center justify-center">
            <Button>
              <span className="flex space-x-1 items-center justify-center">
                <img src="/file.svg" />
                Upload File
              </span>
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
