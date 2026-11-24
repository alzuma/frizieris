// T2: starting the application in a fresh environment with no database
// file present opens the SQLite database and reports no connection error
// (FR2); a database that cannot be opened is reported, never silent.
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, rmSync, existsSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { checkDatabase, closeDb } from "../lib/db";

let dir: string;

beforeEach(() => {
  closeDb();
  dir = mkdtempSync(path.join(tmpdir(), "frizieris-db-"));
});

afterEach(() => {
  closeDb();
  delete process.env.FRIZIERIS_DB_PATH;
  rmSync(dir, { recursive: true, force: true });
});

describe("database connection", () => {
  it("opens a database file that does not exist yet, without error", () => {
    const file = path.join(dir, "nested", "fresh.db");
    process.env.FRIZIERIS_DB_PATH = file;

    expect(() => checkDatabase()).not.toThrow();
    expect(existsSync(file)).toBe(true);
  });

  it("reports an error when the database cannot be opened", () => {
    const blocked = path.join(dir, "blocked");
    mkdirSync(blocked); // a directory cannot be a SQLite file
    process.env.FRIZIERIS_DB_PATH = blocked;

    expect(() => checkDatabase()).toThrow();
  });
});
