import { NextResponse } from "next/server";
import { DocumentProcessorServiceClient } from "@google-cloud/documentai";
import fs from "fs/promises";
import ImageModel from "@/app/models/image";
import { uploadFile } from "@/app/lib/cloudStorage";

export async function GET(request) {
  const client = new DocumentProcessorServiceClient();
  const name = "projects/832593823455/locations/us/processors/79eb62ab2e02cbd1";
  const imgPath = "public/test.png";
  const mimeTypes = {
    png: "image/png",
    jpg: "image/jpeg",
    pdf: "application/pdf",
  };
  const file = await fs.readFile(imgPath);
  const buffer = Buffer.from(file).toString("base64");
  const mimeType = mimeTypes["png"];

  const req = {
    name,
    rawDocument: {
      content: buffer,
      mimeType: mimeType,
    },
  };
  const [result] = await client.processDocument(req);
  const image = new ImageModel({
    URI: "placeHolder",
    result: result,
    mimeType: "png",
  });
  await image.save();
  console.log(result);
  return NextResponse.json({ status: 200 });
}
