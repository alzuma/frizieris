// @vitest-environment jsdom
// T4: the home page renders inside the base layout, and the navigation for
// the customer and admin areas is present in the rendered markup (FR3, FR4).
/* eslint-disable react/no-children-prop -- the typed layout props require children in the props object */
import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createElement } from "react";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

let dir: string;

beforeAll(() => {
  dir = mkdtempSync(path.join(tmpdir(), "frizieris-layout-"));
  process.env.FRIZIERIS_DB_PATH = path.join(dir, "layout.db");
});

afterAll(async () => {
  const { closeDb } = await import("../lib/db");
  closeDb();
  delete process.env.FRIZIERIS_DB_PATH;
  rmSync(dir, { recursive: true, force: true });
});

const NAV_LABELS = [
  "Home",
  "Services",
  "Book an appointment",
  "My bookings",
  "Dashboard",
  "Specialists",
  "Working hours",
  "Bookings",
];

describe("base layout", () => {
  it("renders the home page inside the layout, with the customer and admin navigation", async () => {
    const { default: RootLayout } = await import("../app/layout");
    const { default: HomePage } = await import("../app/page");

    render(
      createElement(RootLayout, {
        children: createElement(HomePage),
        params: Promise.resolve({}),
      }),
    );

    expect(screen.getByRole("navigation", { name: "Customer area" })).toBeTruthy();
    expect(screen.getByRole("navigation", { name: "Admin area" })).toBeTruthy();

    for (const label of NAV_LABELS) {
      expect(screen.getAllByRole("link", { name: label }).length).toBeGreaterThan(0);
    }

    expect(screen.getByRole("heading", { name: "Welcome to Frizieris" })).toBeTruthy();
    expect(screen.getByText("Database connected")).toBeTruthy();
  });
});
