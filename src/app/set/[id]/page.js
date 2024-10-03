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
    <div className="p-[20px] space-y-8">
      <div className="text-white space-y-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        <h4 className="">{description}</h4>
        <hr></hr>
        <div className="flex space-x-1 text-sm items-center">
          <div className="flex space-x-1 items-center">
            <Image
              src={session.user.image}
              className="h-[40px] w-[40px] rounded-full"
              height={96}
              width={96}
              alt="profile image"
            />
            <p className="text-lg font-bold">{session.user.name}</p>
          </div>
        </div>
        <hr></hr>
      </div>
      <div className="space-y-10 flex flex-col justify-center items-center">
        {flashcards.map((x, i) => {
          return (
            <Flashcard
              img={
                "https://storage.cloud.google.com/my-ai-image-bucket/" +
                imgs[i].URL
              }
              question={x.key}
              value={x.value}
              key={i}
            ></Flashcard>
          );
        })}
        <Flashcard />
      </div>
    </div>
  );
};

export default page;
