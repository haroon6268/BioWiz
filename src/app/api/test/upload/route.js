import { NextResponse } from "next/server";
import { DocumentProcessorServiceClient } from "@google-cloud/documentai";
import fs from "fs/promises";
import ImageModel from "@/app/models/image";
import sharp from "sharp";
import { uploadFile } from "@/app/lib/cloudStorage";

export async function GET(request) {
  const imgPath = "public/test.png";
  const result = await ImageModel.findById("66f2c988465ebd1b739793d2");
  //const boundingBox =
  //result.result.document.pages[0].blocks[0].layout.boundingPoly.vertices;
  const pages = result.result.document.pages;
  let boxes = [];
  pages.forEach((x) => {
    x.blocks.forEach((y) => {
      boxes.push(y.layout.boundingPoly.vertices);
    });
  });
  const bufferArray = await Promise.all(
    boxes.map(async (z) => {
      let topLeft = z[0];
      let topRight = z[1];
      let bottomRight = z[2];
      let bottomLeft = z[3];
      let height = bottomLeft.y - topLeft.y;
      let width = bottomRight.x - bottomLeft.x;
      const { x, y } = topLeft;
      if (height == 0) {
        height = 10;
      }
      if (width == 0) {
        width = 10;
      }
      const output = await sharp(imgPath)
        .clone()
        .extract({
          left: x,
          top: y,
          width: width,
          height: height,
        })
        .blur(20)
        .toBuffer();
      return { input: output, top: y, left: x };
    })
  );
  // let topLeft = boundingBox[0];
  // let topRight = boundingBox[1];
  // let bottomRight = boundingBox[2];
  // let bottomLeft = boundingBox[3];
  // const height = bottomLeft.y - topLeft.y;
  // const width = bottomRight.x - bottomLeft.x;

  // const { x, y } = topLeft;

  // const output = await sharp(imgPath)
  //   .clone()
  //   .extract({
  //     left: x,
  //     top: y,
  //     width: width,
  //     height: height,
  //   })
  //   .blur(20)
  //   .toBuffer();
  const imgOutput = await sharp(imgPath).composite(bufferArray).toBuffer();
  uploadFile(imgOutput);
  return NextResponse.json({ status: 200 });
}
