import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";

function defaultDbPath(): string {
  return (
    process.env.FRIZIERIS_DB_PATH ??
    path.join(process.cwd(), "data", "frizieris.db")
  );
}

let db: DatabaseSync | null = null;

/**
 * The single place the application opens its SQLite database.
 * The database file, and its folder, are created on first use if missing.
 */
export function getDb(): DatabaseSync {
  if (db) return db;
  const file = defaultDbPath();
  mkdirSync(path.dirname(file), { recursive: true });
  db = new DatabaseSync(file);
  return db;
}

/**
 * Proves the connection works by running a query.
 * Throws on any database error: a failed connection must surface, never fail silently.
 */
export function checkDatabase(): void {
  getDb().prepare("SELECT 1 AS ok").get();
}

/**
 * Closes the open database, if any. Used by tests to release the file.
 */
export function closeDb(): void {
  db?.close();
  db = null;
}
