import { NextResponse } from "next/server";
import { DocumentProcessorServiceClient } from "@google-cloud/documentai";
import fs from "fs/promises";
import ImageModel from "@/app/models/image";
import { uploadFile } from "@/app/lib/cloudStorage";
import { dbConnect } from "@/app/lib/dbConnect";
import { getGCPCredentials } from "@/app/lib/getGcpCredentials";
import createSet from "@/app/lib/uploadProcessing/createSet";
import createFlashcards from "@/app/lib/uploadProcessing/createFlashcards";

export async function POST() {
  const user = await prisma.FlashCardSet.findUnique({
    where: { id: "66fac669bcc5b61462fa368a" },
    include: {
      flashcards: true,
    },
  });

  console.log(user);

  return NextResponse.json({ status: 200 });
}

//x,y,width,height,text
