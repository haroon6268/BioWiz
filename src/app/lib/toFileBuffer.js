export async function toBufferFromFile(file) {
  const arrayBuffer = await file.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);
  return fileBuffer;
}
