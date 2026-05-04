import { mkdir, writeFile } from "fs/promises";
import path from "path";

const uploadDir = path.join(process.cwd(), "public", "uploads");

export async function saveUpload(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image uploads are allowed.");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const extension = path.extname(file.name) || ".jpg";
  const safeName = `${crypto.randomUUID()}${extension.toLowerCase()}`;
  const destination = path.join(uploadDir, safeName);

  await mkdir(uploadDir, { recursive: true });
  await writeFile(destination, buffer);

  return `/uploads/${safeName}`;
}
