import Flashcard from "@/app/components/Flashcard";
import { getRequest } from "@/app/lib/fetcher";
import { getSet } from "@/app/lib/getSet";
import { auth } from "@/auth";
import React from "react";
import Image from "next/image";

const page = async ({ params }) => {
	const session = await auth();
	console.log(session);
	const data = await getSet(params["id"]);
	const flashcards = data.flashcards;
	const title = data.title;
	const description = data.description;
	const img = await prisma.cardImage.findUnique({
		where: { id: flashcards[0].cardImageId },
	});
	const imgs = await Promise.all(
		flashcards.map(async (x) => {
			return prisma.cardImage.findUnique({
				where: {
					id: x.cardImageId,
				},
			});
		})
	);

	return (
		<div className="p-[20px] space-y-8 bg-white text-green-900 py-8">
			<div className="space-y-4 flex flex-col items-center max-w-[600px] mx-auto">
				<h1 className="text-3xl lg:text-4xl font-bold bg-light-green p-4 rounded-xl">
					{title}
				</h1>
				<h4 className="text-lg lg:text-xl">{description}</h4>

				<hr className="w-[600px] border-dark-green mx-auto" />
				<div className="flex space-x-1 text-sm items-center">
					<div className="flex space-x-2 items-center">
						<Image
							src={session.user.image}
							className="h-[45px] w-[45px] rounded-full"
							height={96}
							width={96}
							alt="profile image"
						/>

						<div className="space-y-[-5px]">
							<p>Made by:</p>
							<p className="text-lg font-bold">{session.user.name}</p>
						</div>
					</div>
				</div>
				<hr className="w-[600px] border-dark-green mx-auto" />
			</div>
			<div className="space-y-10 flex flex-col justify-center items-center">
				{flashcards.map((x, i) => {
					return (
						<Flashcard
							img={
								"https://storage.googleapis.com/my-ai-image-bucket/" +
								imgs[i].URL
							}
							question={x.key}
							value={x.value}
							key={i}
						></Flashcard>
					);
				})}
			</div>
		</div>
	);
};

export default page;
