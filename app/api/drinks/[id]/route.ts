import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type Params = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const drinkId = Number(id);
  const body = await request.json();
  const name = String(body.name ?? "").trim();
  const description = String(body.description ?? "").trim();
  const imagePath = String(body.imagePath ?? "").trim();
  const price = Number(body.price);

  if (!Number.isInteger(drinkId)) {
    return NextResponse.json({ error: "Invalid drink id." }, { status: 400 });
  }

  if (!name || !description || !imagePath || !Number.isFinite(price) || price < 0) {
    return NextResponse.json(
      { error: "Name, description, image, and a valid price are required." },
      { status: 400 },
    );
  }

  const drink = await prisma.drink.update({
    where: { id: drinkId },
    data: {
      name,
      description,
      imagePath,
      price,
    },
  });

  return NextResponse.json({ ...drink, price: Number(drink.price) });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const drinkId = Number(id);

  if (!Number.isInteger(drinkId)) {
    return NextResponse.json({ error: "Invalid drink id." }, { status: 400 });
  }

  await prisma.drink.delete({
    where: { id: drinkId },
  });

  return NextResponse.json({ ok: true });
}
