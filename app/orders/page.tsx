import { OrderForm } from "@/components/OrderForm";
import { OrderList } from "@/components/OrderList";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const [drinks, orders] = await Promise.all([
    prisma.drink.findMany({
      orderBy: { name: "asc" },
    }),
    prisma.order.findMany({
      orderBy: { id: "desc" },
      include: {
        items: {
          orderBy: { id: "asc" },
        },
      },
    }),
  ]);

  return (
    <main className="page">
      <section className="page-header">
        <div>
          <h1>Orders</h1>
          <p>Create unpaid orders and mark payment when it is complete.</p>
        </div>
      </section>

      <section className="grid">
        <div className="panel">
          <h2>New Order</h2>
          <OrderForm
            drinks={drinks.map((drink) => ({
              ...drink,
              price: Number(drink.price),
            }))}
          />
        </div>
        <div className="panel">
          <h2>Order History</h2>
          <OrderList
            orders={orders.map((order) => ({
              ...order,
              paidAt: order.paidAt ? order.paidAt.toISOString() : null,
              totalPrice: Number(order.totalPrice),
              items: order.items.map((item) => ({
                ...item,
                unitPriceSnapshot: Number(item.unitPriceSnapshot),
                lineTotal: Number(item.lineTotal),
              })),
            }))}
          />
        </div>
      </section>
    </main>
  );
}
