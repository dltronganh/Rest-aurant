"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { T, useLanguage } from "@/components/LanguageProvider";
import { formatMoney } from "@/lib/format";

export type OrderView = {
  id: number;
  paidAt: string | null;
  totalPrice: number;
  items: {
    id: number;
    drinkNameSnapshot: string;
    unitPriceSnapshot: number;
    quantity: number;
    lineTotal: number;
  }[];
};

type OrderListProps = {
  orders: OrderView[];
};

export function OrderList({ orders }: OrderListProps) {
  const router = useRouter();
  const { language, text } = useLanguage();
  const [isPending, startTransition] = useTransition();

  async function markPaid(orderId: number) {
    const response = await fetch(`/api/orders/${orderId}/pay`, {
      method: "POST",
    });

    if (response.ok) {
      startTransition(() => router.refresh());
    }
  }

  if (orders.length === 0) {
    return (
      <p className="muted">
        <T id="noOrders" />
      </p>
    );
  }

  return (
    <div className="order-list">
      {orders.map((order) => (
        <article className="order-card" key={order.id}>
          <div className="order-heading">
            <div>
              <strong>Order #{order.id}</strong>
              <div className="muted">
                {order.paidAt
                  ? `${text("paidAt")} ${new Date(order.paidAt).toLocaleString(
                      language === "vi" ? "vi-VN" : "en-US",
                    )}`
                  : text("paymentPending")}
              </div>
            </div>
            <span className={`status ${order.paidAt ? "paid" : "unpaid"}`}>
              {order.paidAt ? <T id="paid" /> : <T id="unpaid" />}
            </span>
          </div>

          <div>
            {order.items.map((item) => (
              <div className="item-row" key={item.id}>
                <span>
                  {item.drinkNameSnapshot} x {item.quantity}
                  <span className="muted">
                    {" "}
                    <T id="at" /> {formatMoney(item.unitPriceSnapshot, language)}
                  </span>
                </span>
                <strong className="price">{formatMoney(item.lineTotal, language)}</strong>
              </div>
            ))}
          </div>

          <div className="order-heading">
            <span className="total">{formatMoney(order.totalPrice, language)}</span>
            {!order.paidAt ? (
              <button
                className="button"
                disabled={isPending}
                type="button"
                onClick={() => markPaid(order.id)}
              >
                <T id="markPaid" />
              </button>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
