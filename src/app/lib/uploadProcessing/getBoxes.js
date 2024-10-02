const getBoxes = (result) => {
  const pages = result.document.pages;
  const text = result.document.text;
  let boxes = [];
  pages.forEach((x) => {
    x.blocks.forEach((z) => {
      let textSegments = z.layout.textAnchor.textSegments[0];
      const substring = text.substring(
        textSegments.startIndex,
        textSegments.endIndex
      );
      const box = z.layout.boundingPoly.vertices;
      const x = box[0].x;
      const y = box[0].y;
      let topLeft = box[0];
      let bottomRight = box[2];
      let bottomLeft = box[3];
      let height = bottomLeft.y - topLeft.y;
      let width = bottomRight.x - bottomLeft.x;
      height += 10;
      width += 10;
      boxes.push({
        x,
        y,
        text: substring.replace(/\n/g, ""),
        height,
        width,
      });
    });
  });
  return boxes;
};

export default getBoxes;
