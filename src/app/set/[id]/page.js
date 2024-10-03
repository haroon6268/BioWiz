import Flashcard from "@/app/components/Flashcard";
import { getRequest } from "@/app/lib/fetcher";
import { getSet } from "@/app/lib/getSet";
import React from "react";

const page = async ({ params }) => {
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
        <div className="space-y-10 flex flex-col justify-center items-center w-full">
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
    );
};

export default page;
