"use client";
import React from "react";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data } = useSession();
  console.log(data);
  return <div>{JSON.stringify(data)}</div>;
};

export default Dashboard;
