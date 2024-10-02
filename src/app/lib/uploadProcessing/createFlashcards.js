const createFlashcards = async (boxes, imageId, setId) => {
  let flashcards = boxes.map((z) => {
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
    };
  });
  let output = [];
  for (const card of flashcards) {
    const cur = await prisma.flashcard.create({ data: card });
    output.push(cur);
  }
  return output;
};

export default createFlashcards;
