import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type OrderItemInput = {
  drinkId: unknown;
  quantity: unknown;
};

export async function GET() {
  const orders = await prisma.order.findMany({
    orderBy: { id: "desc" },
    include: {
      items: {
        orderBy: { id: "asc" },
      },
    },
  });

  return NextResponse.json(
    orders.map((order) => ({
      ...order,
      totalPrice: Number(order.totalPrice),
      items: order.items.map((item) => ({
        ...item,
        unitPriceSnapshot: Number(item.unitPriceSnapshot),
        lineTotal: Number(item.lineTotal),
      })),
    })),
  );
}

export async function POST(request: Request) {
  const body = await request.json();
  const rawItems = Array.isArray(body.items) ? (body.items as OrderItemInput[]) : [];
  const requestedItems = rawItems
    .map((item) => ({
      drinkId: Number(item.drinkId),
      quantity: Number(item.quantity),
    }))
    .filter(
      (item) =>
        Number.isInteger(item.drinkId) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    );

  if (requestedItems.length === 0) {
    return NextResponse.json(
      { error: "At least one drink with quantity is required." },
      { status: 400 },
    );
  }

  const drinks = await prisma.drink.findMany({
    where: {
      id: {
        in: requestedItems.map((item) => item.drinkId),
      },
    },
  });

  if (drinks.length !== new Set(requestedItems.map((item) => item.drinkId)).size) {
    return NextResponse.json({ error: "One or more drinks were not found." }, { status: 400 });
  }

  const drinkById = new Map(drinks.map((drink) => [drink.id, drink]));
  const items = requestedItems.map((item) => {
    const drink = drinkById.get(item.drinkId);

    if (!drink) {
      throw new Error("Drink lookup failed.");
    }

    const unitPrice = Number(drink.price);
    const lineTotal = unitPrice * item.quantity;

    return {
      drinkId: drink.id,
      drinkNameSnapshot: drink.name,
      unitPriceSnapshot: unitPrice,
      quantity: item.quantity,
      lineTotal,
    };
  });
  const totalPrice = items.reduce((sum, item) => sum + item.lineTotal, 0);

  const order = await prisma.order.create({
    data: {
      paidAt: null,
      totalPrice,
      items: {
        create: items,
      },
    },
    include: {
      items: true,
    },
  });

  return NextResponse.json(
    {
      ...order,
      totalPrice: Number(order.totalPrice),
      items: order.items.map((item) => ({
        ...item,
        unitPriceSnapshot: Number(item.unitPriceSnapshot),
        lineTotal: Number(item.lineTotal),
      })),
    },
    { status: 201 },
  );
}
