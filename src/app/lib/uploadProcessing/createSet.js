import { auth } from "@/auth";

const createSet = async (setTitle, setDescription) => {
  const session = await auth();
  if (!session) {
    return null;
  }
  const userId = session.user.id;
  const returned = await prisma.FlashCardSet.create({
    data: {
      title: setTitle,
      description: setDescription,
      user: {
        connect: { id: userId },
      },
    },
  });

  return returned;
};

export default createSet;
