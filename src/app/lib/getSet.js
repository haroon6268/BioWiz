import { dbConnect } from "@/app/lib/dbConnect";
import ImageModel from "@/app/models/image";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function getSet(id) {
    const session = await auth();

    if (!session) {
        return NextResponse.json({ redirect: "/" });
    }
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { flashCardSets: true },
    });
    const sets = user.flashCardSets;
    if (!id) {
        return NextResponse.json({ status: 400, message: "Id is needed" });
    }
    let set = sets.find((x) => x.id == id);
    if (!set) {
        return NextResponse.json({ redirect: "/" });
    }

    const data = await prisma.flashCardSet.findUnique({
        where: { id: id },
        include: {
            flashcards: true,
        },
    });
    return data;
}
