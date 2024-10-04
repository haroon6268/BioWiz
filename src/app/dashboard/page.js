"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Sidebar from "../components/Sidebar";
import { getRequest } from "../lib/fetcher";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import Image from "next/image";

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
			<div className="lg:h-fit h-[83vh] p-[20px] text-green-900 space-y-24 bg-white py-12">
				<div className="space-y-2">
					<h1 className="text-2xl lg:text-3xl font-bold">Your Sets</h1>
					<div className="flex overflow-auto space-x-4">
						{user?.flashCardSets.map((x, i) => {
							return (
								<div
									className="h-[200px] bg-dark-green rounded-xl w-[300px] flex-shrink-0 text-white p-[20px] backdrop:blur-3xl lg:h-[300px] lg:w-[500px] flex flex-col hover:bg-[#99d474] hover:cursor-pointer border-primary-yellow border-4"
									onClick={() => router.push("/set/" + x.id)}
									key={i}
								>
									<p className="text-xl font-bold flex-1">{x.title}</p>
									<div className="flex items-center space-x-1">
										<div className="h-[30px] w-[30px] relative">
											<Image src={user?.image} className="rounded-full" fill />
										</div>
										<p className="font-bold">{user?.name}</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className="space-y-2 max-w-[1200px] mx-auto">
					<h1 className=" font-bold text-2xl lg:text-3xl">
						Generate a new Set in Seconds!
					</h1>
					<div className="h-[200px] bg-dark-green rounded-xl w-[100%] flex-shrink-0 text-[#333] p-4 backdrop:blur-3xl lg:h-[250px] lg:w-[100%] flex items-center justify-center border-primary-yellow border-4">
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
