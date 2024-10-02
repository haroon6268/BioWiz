import { uploadFile } from "@/app/lib/cloudStorage";
import { Storage } from "@google-cloud/storage";
import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/dbConnect";
import { auth } from "@/auth";
import { scan } from "@/app/lib/OCRscan";
import { toBufferFromFile } from "@/app/lib/toFileBuffer";
import { processImg } from "@/app/lib/process";
import { prisma } from "@/prisma";
import getBoxes from "@/app/lib/uploadProcessing/getBoxes";
import createSet from "@/app/lib/uploadProcessing/createSet";
import createFlashcards from "@/app/lib/uploadProcessing/createFlashcards";

const storage = new Storage();

export async function POST(request) {
  //TO DO
  //ADD MIME TYPES
  //Create Image Database Objects
  //Add Image to user object

  //Check if session exists
  const session = await auth();
  if (!session) {
    return NextResponse.json({ redirect: "/" });
  }

  //Grab Data From Form
  const data = await request.formData();
  // const mime = data.get("mime");
  const file = await data.get("img");
  let setTitle = await data.get("setTitle");
  let setDescription = await data.get("setDescription");

  //If File Doesn't exist
  if (!file) {
    return new NextResponse.json({
      status: 400,
      message: "You must send a file",
    });
  }

  if (!setTitle) {
    setTitle = "Test";
  }
  if (!setDescription) {
    setDescription = "Test";
  }

  const set = await createSet(setTitle, setDescription);
  if (!set) {
    return NextResponse.json({ redirect: "/" });
  }
  const setId = set.id;

  //Upload first file to gcs
  const preProccessBuffer = await toBufferFromFile(file);
  const response = await uploadFile(preProccessBuffer);

  //Get URI from response
  let uri = "gs://my-ai-image-bucket/" + response;

  //Scan the image
  const result = await scan(uri, "image/png");

  //Upload the image once again now that you have bounding boxes
  const proccessedBuffer = await processImg(
    await toBufferFromFile(file),
    result
  );

  //Upload proccessed image
  const response2 = await uploadFile(proccessedBuffer);
  const postProcessUri = "gs://my-ai-image-bucket/" + response;

  //Bounding Box Object List
  let boxes = await getBoxes(result);

  //Image Object
  const returnedImage = await prisma.Image.create({
    data: {
      preProcessUri: uri,
      postProcessUri,
      preProcessUrl: response2,
      postProcessUrl: response2,
    },
  });

  const imageId = returnedImage.id;

  //Create All BoundingBox Objects and flashCards
  const cards = await createFlashcards(boxes, imageId, setId);

  return NextResponse.json({ status: 200, redirect: "/set/" + setId });
  /*
    This is the general flow of uploading to the database
    1. Begin by creating the set of flashcards
    2. with creating an array of BoundingBoxes
    3. Create image object and upload the image object. Ignore flashcards
    4. now create a list of flashcards. Do this by iterating through the bounding box array
    5. add all these flashcards to a flashcard set
    5.add the flashcard set to the user


    */
  // }
  // model Flashcard{
  //   id String @id @default(auto()) @map("_id") @db.ObjectId
  //   key String
  //   value String
  //   image Image @relation(fields: [imageId], references: [id])
  //   imageId String @db.ObjectId
  //   boundingBox BoundingBox @relation(fields:[boxId], references: [id])
  //   boxId String @db.ObjectId @unique
  //   flashCardSet FlashCardSet @relation(fields:[setId], references: [id])
  //   setId String @db.ObjectId
}
