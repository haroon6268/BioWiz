import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
    const userId = req.nextUrl.searchParams.get("id");
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { flashCardSets: true },
    });
    console.log(user);
    return NextResponse.json({ status: 200, user });
}
