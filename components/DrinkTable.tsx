"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { DrinkForm, type DrinkView } from "@/components/DrinkForm";
import { formatMoney } from "@/lib/format";

type DrinkTableProps = {
  drinks: DrinkView[];
};

export function DrinkTable({ drinks }: DrinkTableProps) {
  const router = useRouter();
  const [editingDrink, setEditingDrink] = useState<DrinkView | null>(null);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  async function deleteDrink(drink: DrinkView) {
    const confirmed = window.confirm(`Delete ${drink.name}?`);

    if (!confirmed) {
      return;
    }

    setError("");

    const response = await fetch(`/api/drinks/${drink.id}`, {
      method: "DELETE",
    });
    const payload = await response.json();

    if (!response.ok) {
      setError(payload.error ?? "Unable to delete drink.");
      return;
    }

    if (editingDrink?.id === drink.id) {
      setEditingDrink(null);
    }

    startTransition(() => router.refresh());
  }

  return (
    <section className="grid">
      <div className="panel">
        <h2>{editingDrink ? "Edit Drink" : "Add Drink"}</h2>
        <DrinkForm
          key={editingDrink?.id ?? "new"}
          editingDrink={editingDrink}
          onCancelEdit={() => setEditingDrink(null)}
        />
      </div>

      <div className="panel">
        <h2>Drink Catalog</h2>
        {error ? <div className="notice">{error}</div> : null}
        {drinks.length === 0 ? (
          <p className="muted">No drinks yet. Add your first drink to start taking orders.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Drink</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {drinks.map((drink) => (
                  <tr key={drink.id}>
                    <td>
                      <div className="drink-cell">
                        <img className="thumb" src={drink.imagePath} alt="" />
                        <strong>{drink.name}</strong>
                      </div>
                    </td>
                    <td>{drink.description}</td>
                    <td className="price">{formatMoney(drink.price)}</td>
                    <td>
                      <div className="actions">
                        <button
                          className="button secondary"
                          disabled={isPending}
                          type="button"
                          onClick={() => setEditingDrink(drink)}
                        >
                          Edit
                        </button>
                        <button
                          className="button danger"
                          disabled={isPending}
                          type="button"
                          onClick={() => deleteDrink(drink)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
