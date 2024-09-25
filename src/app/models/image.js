import mongoose from "mongoose";
const { Schema } = mongoose;

const imageSchema = new Schema({
  URI: String,
  mimeType: String,
  result: Object,
});

const ImageModel =
  mongoose.models.Image || mongoose.model("Image", imageSchema);
export default ImageModel;
