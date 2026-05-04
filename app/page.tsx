import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [drinkCount, unpaidCount, orders] = await Promise.all([
    prisma.drink.count(),
    prisma.order.count({ where: { paidAt: null } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { id: "desc" },
      include: { items: true },
    }),
  ]);

  const recentTotal = orders.reduce(
    (sum, order) => sum + Number(order.totalPrice),
    0,
  );

  return (
    <main className="page">
      <section className="page-header">
        <div>
          <h1>Store Manager</h1>
          <p>Manage drink details and record orders from one local dashboard.</p>
        </div>
        <div className="actions">
          <Link className="button" href="/drinks">
            Manage Drinks
          </Link>
          <Link className="button secondary" href="/orders">
            New Order
          </Link>
        </div>
      </section>

      <section className="grid">
        <div className="panel">
          <h2>Today&apos;s workspace</h2>
          <p className="muted">
            Add drink items first, then use Orders to create unpaid orders and
            mark payment when complete.
          </p>
        </div>
        <div className="panel">
          <h2>Quick Stats</h2>
          <div className="item-row">
            <span>Drinks in catalog</span>
            <strong>{drinkCount}</strong>
          </div>
          <div className="item-row">
            <span>Unpaid orders</span>
            <strong>{unpaidCount}</strong>
          </div>
          <div className="item-row">
            <span>Recent order value</span>
            <strong>{formatMoney(recentTotal)}</strong>
          </div>
        </div>
      </section>
    </main>
  );
}
