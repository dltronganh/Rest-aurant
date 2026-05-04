import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type Params = {
  params: Promise<{ id: string }>;
};

export async function POST(_request: Request, { params }: Params) {
  const { id } = await params;
  const orderId = Number(id);

  if (!Number.isInteger(orderId)) {
    return NextResponse.json({ error: "Invalid order id." }, { status: 400 });
  }

  const order = await prisma.order.update({
    where: { id: orderId },
    data: {
      paidAt: new Date(),
    },
  });

  return NextResponse.json({
    ...order,
    totalPrice: Number(order.totalPrice),
  });
}
