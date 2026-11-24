# frizieris
Frizieru rezervācijas sistēma

Booking system for one barber shop: Next.js (App Router) and TypeScript, with a SQLite database and a responsive base layout for desktop and mobile.

## Start

Node.js 22.13.0 or newer is required (the application uses the built-in `node:sqlite`).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Database

SQLite, opened through `lib/db.ts` using Node's built-in `node:sqlite`. The database file is created automatically on first start at `data/frizieris.db`; override its location with the `FRIZIERIS_DB_PATH` environment variable. The database file is not committed to version control.

## Tests

```bash
npm test
```

Runs the Vitest suite in `tests/`: `app-start` boots the application and requests the home page, `db-connection` opens a fresh database file, `layout` renders the base layout with the customer and admin navigation.
