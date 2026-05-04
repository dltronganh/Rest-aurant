import { DrinkTable } from "@/components/DrinkTable";
import { T } from "@/components/LanguageProvider";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function DrinksPage() {
  const drinks = await prisma.drink.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <main className="page">
      <section className="page-header">
        <div>
          <h1>
            <T id="drinksTitle" />
          </h1>
          <p>
            <T id="drinksDescription" />
          </p>
        </div>
      </section>
      <DrinkTable
        drinks={drinks.map((drink) => ({
          ...drink,
          price: Number(drink.price),
        }))}
      />
    </main>
  );
}
