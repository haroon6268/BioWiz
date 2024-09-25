import mongoose from "mongoose";

let isConnected = false;

export async function dbConnect() {
  if (isConnected) {
    return;
  } else {
    const conString =
      "mongodb+srv://halmadanidev:haroon2003@cluster0.52ggmj2.mongodb.net/Biology";
    const promise = mongoose.connect(conString);
    isConnected = true;
    console.log("db has been connected");
    return await promise;
  }
}
