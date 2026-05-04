import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const drinks = await prisma.drink.findMany({
    orderBy: { id: "desc" },
  });

  return NextResponse.json(
    drinks.map((drink) => ({
      ...drink,
      price: Number(drink.price),
    })),
  );
}

export async function POST(request: Request) {
  const body = await request.json();
  const name = String(body.name ?? "").trim();
  const description = String(body.description ?? "").trim();
  const imagePath = String(body.imagePath ?? "").trim();
  const price = Number(body.price);

  if (!name || !description || !imagePath || !Number.isFinite(price) || price < 0) {
    return NextResponse.json(
      { error: "Name, description, image, and a valid price are required." },
      { status: 400 },
    );
  }

  const drink = await prisma.drink.create({
    data: {
      name,
      description,
      imagePath,
      price,
    },
  });

  return NextResponse.json({ ...drink, price: Number(drink.price) }, { status: 201 });
}
