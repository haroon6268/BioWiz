import { DocumentProcessorServiceClient } from "@google-cloud/documentai";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import { dbConnect } from "@/app/lib/dbConnect";
import ImageModel from "@/app/models/image";
import { scan } from "@/app/lib/OCRscan";
import { toBufferFromFile } from "@/app/lib/toFileBuffer";
import { uploadFile } from "@/app/lib/cloudStorage";
import { processImg } from "@/app/lib/process";
import dotenv from "dotenv/config";

/*
Description: The purpose of this post request is to process the given file to identify text
Params:
  gcsUri: this is the google cloud storage uri
  mimeType: mime type of the file
*/
export async function POST(request) {
  await dbConnect();

  const data = await request.formData();
  //const mime = data.get("mime");
  const file = await data.get("img");

  if (!file) {
    return NextResponse.json({ status: 400, message: "You must send a file" });
  }

  // //if (mime != "png" && mime != "jpg" && mime != "pdf") {
  //   return NextResponse.json({
  //     status: 400,
  //     message: "incorrect mime type given",
  //   });
  // }

  const preProccessBuffer = await toBufferFromFile(file);

  const response = await uploadFile(preProccessBuffer);

  let uri = "gs://my-ai-image-bucket/" + response;

  const result = await scan(uri, "image/png");

  //From the result, you have to loop through the pages to get each page
  //loop through each block within each page
  //from each block, you can grab the vertices in layout.boundingPoly.vertices

  const proccessedBuffer = await processImg(
    await toBufferFromFile(file),
    result
  );
  const response2 = await uploadFile(proccessedBuffer);
  //console.log(result.document.pages[0].blocks[0].layout.boundingPoly);
  return NextResponse.json({ status: 200 });
}

export async function GET() {
  console.log(process.env.GCP_PROJECT_ID);
  return NextResponse.json({ status: 200 });
}
