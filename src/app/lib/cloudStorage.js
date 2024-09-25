import { Storage } from "@google-cloud/storage";
import { v4 } from "uuid";
import { getGCPCredentials } from "./getGcpCredentials";
const storage = new Storage(getGCPCredentials);
const bucketName = "my-ai-image-bucket";

/*
Description: downloadFile uploads a file to the google cloud bucket
Params:
    filePath: this is the filePath for the image to be downloaded
    downloadPath: this is the filepath for where you'd like the image to be downloaded to
*/
export async function downloadFile(filePath, downloadPath) {
  const fileName = filePath;
  const options = {
    destination: downloadPath,
  };
  let res = await storage.bucket(bucketName).file(fileName).download(options);
  return res;
}

/*
Description: uploadFile uploads a file to the google cloud bucket
Params:
    filePath: this is the filePath for the image to be uploaded
    destination: this is the path for where you'd like the image to be stored in the bucket
*/
export async function uploadFile(fileBuffer) {
  const uuid = v4();
  const bucket = storage.bucket(bucketName);
  const out = await new Promise((res, rej) => {
    const blob = bucket.file(uuid + ".png");
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
    blobStream
      .on("error", (err) => rej(err))
      .on("finish", () => res(uuid + ".png"));

    blobStream.end(fileBuffer);
  });
  return out;
}
