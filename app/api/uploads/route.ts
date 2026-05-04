import { NextResponse } from "next/server";
import { saveUpload } from "@/lib/uploads";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Image file is required." }, { status: 400 });
    }

    const imagePath = await saveUpload(file);

    return NextResponse.json({ imagePath });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to upload image.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
