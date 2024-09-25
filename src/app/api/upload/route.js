import { uploadFile } from "@/app/lib/cloudStorage";
import { Storage } from "@google-cloud/storage";
import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/dbConnect";

const storage = new Storage();
export async function GET(request) {
  await dbConnect();
  //await uploadFile("public/test.png", "test.jpg");
  //await fs.unlink("public/test.png");
  return new NextResponse({ status: 200 });
}
export async function POST(request) {
  const data = await request.formData();
  const file = await data.get("img");
  const response = await uploadFile(file);
  console.log(response);
  if (response) {
    return NextResponse.json({
      status: 200,
      URI: "gs://my-ai-image-bucket/" + response,
    });
  } else {
    return NextResponse.json({ status: 500, message: "something went wrong" });
  }
}
