import { dbConnect } from "@/app/lib/dbConnect";
import ImageModel from "@/app/models/image";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
    const session = await auth();
    console.log(request);
    console.log(session);
    if (!session) {
        return NextResponse.json({ redirect: "/" });
    }
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { flashCardSets: true },
    });
    const sets = user.flashCardSets;
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
        return NextResponse.json({ status: 400, message: "Id is needed" });
    }
    let set = sets.find((x) => x.id == id);
    if (!set) {
        console.log("here");
        return NextResponse.json({ redirect: "/" });
    }

    const data = await prisma.flashCardSet.findUnique({
        where: { id: id },
        include: {
            flashcards: true,
        },
    });
    return NextResponse.json({ status: 200, data });
}
