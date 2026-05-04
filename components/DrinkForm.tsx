"use client";

import { FormEvent, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export type DrinkView = {
  id: number;
  name: string;
  description: string;
  price: number;
  imagePath: string;
};

type DrinkFormProps = {
  editingDrink: DrinkView | null;
  onCancelEdit: () => void;
};

export function DrinkForm({ editingDrink, onCancelEdit }: DrinkFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("/api/uploads", {
      method: "POST",
      body: formData,
    });
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.error ?? "Image upload failed.");
    }

    return String(payload.imagePath);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const image = formData.get("image");
    let imagePath = editingDrink?.imagePath ?? "";

    try {
      if (image instanceof File && image.size > 0) {
        imagePath = await uploadImage(image);
      }

      const response = await fetch(
        editingDrink ? `/api/drinks/${editingDrink.id}` : "/api/drinks",
        {
          method: editingDrink ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.get("name"),
            description: formData.get("description"),
            price: formData.get("price"),
            imagePath,
          }),
        },
      );
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to save drink.");
      }

      formRef.current?.reset();
      onCancelEdit();
      startTransition(() => router.refresh());
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save drink.");
    }
  }

  return (
    <form ref={formRef} className="form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          required
          defaultValue={editingDrink?.name ?? ""}
          placeholder="Iced coffee"
        />
      </div>
      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          required
          defaultValue={editingDrink?.description ?? ""}
          placeholder="Short drink description"
        />
      </div>
      <div className="field">
        <label htmlFor="price">Price</label>
        <input
          id="price"
          min="0"
          name="price"
          required
          step="0.01"
          type="number"
          defaultValue={editingDrink?.price ?? ""}
          placeholder="3.50"
        />
      </div>
      <div className="field">
        <label htmlFor="image">Image</label>
        <input
          id="image"
          name="image"
          required={!editingDrink}
          type="file"
          accept="image/*"
        />
        {editingDrink ? <span className="muted">Leave empty to keep current image.</span> : null}
      </div>
      {error ? <div className="notice">{error}</div> : null}
      <div className="actions">
        <button className="button" disabled={isPending} type="submit">
          {editingDrink ? "Save Drink" : "Add Drink"}
        </button>
        {editingDrink ? (
          <button className="button secondary" type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
