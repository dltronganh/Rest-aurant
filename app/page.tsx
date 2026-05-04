import Link from "next/link";
import { Money } from "@/components/Money";
import { T } from "@/components/LanguageProvider";
import { prisma } from "@/lib/db";

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
          <h1>
            <T id="storeManager" />
          </h1>
          <p>
            <T id="storeManagerDescription" />
          </p>
        </div>
        <div className="actions">
          <Link className="button" href="/drinks">
            <T id="manageDrinks" />
          </Link>
          <Link className="button secondary" href="/orders">
            <T id="newOrder" />
          </Link>
        </div>
      </section>

      <section className="grid">
        <div className="panel">
          <h2>
            <T id="todayWorkspace" />
          </h2>
          <p className="muted">
            <T id="todayWorkspaceDescription" />
          </p>
        </div>
        <div className="panel">
          <h2>
            <T id="quickStats" />
          </h2>
          <div className="item-row">
            <span>
              <T id="drinksInCatalog" />
            </span>
            <strong>{drinkCount}</strong>
          </div>
          <div className="item-row">
            <span>
              <T id="unpaidOrders" />
            </span>
            <strong>{unpaidCount}</strong>
          </div>
          <div className="item-row">
            <span>
              <T id="recentOrderValue" />
            </span>
            <strong>
              <Money value={recentTotal} />
            </strong>
          </div>
        </div>
      </section>
    </main>
  );
}
