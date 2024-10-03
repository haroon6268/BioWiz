import overlay from "./overlay";

const createFlashcards = async (boxes, imageId, setId, imageBuffer) => {
    //Create array of Flashcards
    let flashcards = await Promise.all(
        boxes.map(async (z) => {
            let url = await overlay(imageBuffer, z);

            return {
                key: "What is the highlighted region?",
                value: z.text,
                image: { connect: { id: imageId } },
                flashCardSet: {
                    connect: { id: setId },
                },
                boundingBox: {
                    create: {
                        x: z.x,
                        y: z.y,
                        width: z.width,
                        height: z.height,
                        text: z.text,
                        image: {
                            connect: { id: imageId },
                        },
                    },
                },
                cardImage: {
                    create: {
                        URL: url,
                    },
                },
            };
        })
    );

    //Create Output Array for flashcards
    let output = [];

    //Create each flashcard in DB, then add to output
    for (const card of flashcards) {
        const cur = await prisma.flashcard.create({ data: card });
        output.push(cur);
    }

    //return flashcards
    return output;
};

export default createFlashcards;
