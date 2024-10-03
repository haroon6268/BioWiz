import sharp from "sharp";
import { uploadFile } from "../cloudStorage";

const overlay = async (fileBuffer, box) => {
    let height = box.height;
    let width = box.width;
    const overlay = Buffer.from(
        `<svg width="${width}" height="${height}">
        <rect x="0" y="0" width="${width}" height="${height}"
        style="fill:#fccd2a;fill-opacity:1;stroke-width:5;stroke:#fccd2a" />
     </svg>`
    );

    const buffer = await sharp(fileBuffer)
        .composite([{ input: overlay, top: box.y, left: box.x }]) // Add the overlay at the given position
        .toBuffer();
    const uploadedFile = await uploadFile(buffer);
    console.log(uploadFile);
    return uploadedFile;
};

export default overlay;
