"use client";

import { FormEvent, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { DrinkView } from "@/components/DrinkForm";
import { formatMoney } from "@/lib/format";

type OrderFormProps = {
  drinks: DrinkView[];
};

export function OrderForm({ drinks }: OrderFormProps) {
  const router = useRouter();
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const total = useMemo(
    () =>
      drinks.reduce((sum, drink) => {
        const quantity = quantities[drink.id] ?? 0;

        return sum + drink.price * quantity;
      }, 0),
    [drinks, quantities],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const items = Object.entries(quantities)
      .map(([drinkId, quantity]) => ({
        drinkId: Number(drinkId),
        quantity,
      }))
      .filter((item) => item.quantity > 0);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to create order.");
      }

      setQuantities({});
      startTransition(() => router.refresh());
    } catch (createError) {
      setError(
        createError instanceof Error ? createError.message : "Unable to create order.",
      );
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {drinks.length === 0 ? (
        <p className="muted">Add drinks before creating an order.</p>
      ) : (
        drinks.map((drink) => (
          <div className="item-row" key={drink.id}>
            <div>
              <strong>{drink.name}</strong>
              <div className="muted">{formatMoney(drink.price)}</div>
            </div>
            <div className="field">
              <label htmlFor={`quantity-${drink.id}`}>Qty</label>
              <input
                id={`quantity-${drink.id}`}
                min="0"
                step="1"
                type="number"
                value={quantities[drink.id] ?? 0}
                onChange={(event) =>
                  setQuantities((current) => ({
                    ...current,
                    [drink.id]: Number(event.target.value),
                  }))
                }
              />
            </div>
          </div>
        ))
      )}

      <div className="total">Total: {formatMoney(total)}</div>
      {error ? <div className="notice">{error}</div> : null}
      <button className="button" disabled={drinks.length === 0 || total <= 0 || isPending} type="submit">
        Create Unpaid Order
      </button>
    </form>
  );
}
