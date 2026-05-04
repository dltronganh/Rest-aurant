CREATE TABLE "Drink" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "imagePath" TEXT NOT NULL,

    CONSTRAINT "Drink_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "paidAt" TIMESTAMP(3),
    "totalPrice" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "drinkId" INTEGER,
    "drinkNameSnapshot" TEXT NOT NULL,
    "unitPriceSnapshot" DECIMAL(10,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "lineTotal" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "OrderItem"
ADD CONSTRAINT "OrderItem_orderId_fkey"
FOREIGN KEY ("orderId") REFERENCES "Order"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "OrderItem"
ADD CONSTRAINT "OrderItem_drinkId_fkey"
FOREIGN KEY ("drinkId") REFERENCES "Drink"("id")
ON DELETE SET NULL ON UPDATE CASCADE;
