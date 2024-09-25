import sharp from "sharp";

export async function processImg(fileBuffer, result) {
  const pages = result.document.pages;
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
      const output = await sharp(fileBuffer)
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
  const imgOutput = await sharp(fileBuffer).composite(bufferArray).toBuffer();
  return imgOutput;
}
