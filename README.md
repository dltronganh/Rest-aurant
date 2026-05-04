# Rest-aurant

Minimal store management website for drinks, built with TypeScript, Next.js, Prisma, and PostgreSQL.

## Features

- Add, edit, delete, and list drinks.
- Store drink name, description, price, and a locally uploaded image.
- Create unpaid orders from one or more drinks.
- Automatically calculate order totals from selected drinks and quantities.
- Mark an order as paid, storing the payment completion time in `paidAt`.
- List orders with payment status, item snapshots, quantities, and totals.

## Tech Stack

- Frontend and backend: TypeScript with Next.js App Router
- Database: PostgreSQL
- ORM: Prisma
- Node package manager: pnpm
- Node version management on Ubuntu: nvm

Python and `uv` are not used in this MVP because there are no Python dependencies.

## Ubuntu Setup

Install `nvm`, Node.js LTS, and pnpm:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts
corepack enable
corepack prepare pnpm@latest --activate
```

Install PostgreSQL:

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl enable --now postgresql
```

Create a local database and user:

```bash
sudo -u postgres psql
```

```sql
CREATE USER restaurant_user WITH PASSWORD 'restaurant_password';
CREATE DATABASE restaurant_db OWNER restaurant_user;
\q
```

Configure the app:

```bash
cp .env.example .env
pnpm install
pnpm prisma migrate dev
pnpm dev
```

Open http://localhost:3000.

## Useful Commands

```bash
pnpm dev
pnpm build
pnpm prisma migrate dev
pnpm prisma studio
```

## Data Model

- `Drink`: `id`, `name`, `description`, `price`, `imagePath`
- `Order`: `id`, `paidAt`, `totalPrice`
- `OrderItem`: `id`, `orderId`, `drinkId`, `drinkNameSnapshot`, `unitPriceSnapshot`, `quantity`, `lineTotal`

`paidAt` is nullable. A null value means the order has not been paid yet; a timestamp means payment was completed at that time.
