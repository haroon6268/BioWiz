import { getRequest } from "@/app/lib/fetcher";
import { getSet } from "@/app/lib/getSet";
import React from "react";

const page = async ({ params }) => {
  const data = await getSet(params["id"]);
  const flashcards = data.flashcards;
  const title = data.title;
  const description = data.description;
  const img = await prisma.image.findUnique({
    where: { id: flashcards[0].imageId },
  });
  console.log(img);

  return (
    <div>
      <h1>Set Title: {title}</h1>
      <p>Set Description: {description}</p>
      {flashcards.map((x, i) => {
        return (
          <div className="bg-white m-2" key={i}>
            <h1>{x.key}</h1>
            <h1>{x.value}</h1>
            <img
              src={
                "https://storage.cloud.google.com/my-ai-image-bucket/" +
                img.postProcessUrl
              }
            ></img>
          </div>
        );
      })}
    </div>
  );
};

export default page;
