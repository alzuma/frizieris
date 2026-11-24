// T1: starting the application and requesting its home page returns a
// rendered page without an error (FR1).
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { spawn, type ChildProcess } from "node:child_process";

const ROOT = process.cwd();
const PORT = 3111;
const BASE = `http://127.0.0.1:${PORT}`;
const READY_TIMEOUT_MS = 180_000;

let server: ChildProcess | null = null;
let serverLog = "";

function startServer(): ChildProcess {
  const child = spawn(
    "npx",
    ["--no-install", "next", "dev", "--port", String(PORT)],
    { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"], detached: true },
  );
  child.stdout?.on("data", (chunk) => {
    serverLog += String(chunk);
  });
  child.stderr?.on("data", (chunk) => {
    serverLog += String(chunk);
  });
  return child;
}

function stopServer(): Promise<void> {
  return new Promise((resolve) => {
    if (!server || !server.pid) {
      resolve();
      return;
    }
    const pid = server.pid;
    server = null;
    const killGroup = (signal: NodeJS.Signals) => {
      try {
        process.kill(-pid, signal);
      } catch {
        // already gone
      }
    };
    killGroup("SIGTERM");
    setTimeout(() => {
      killGroup("SIGKILL");
      resolve();
    }, 2000);
  });
}

async function waitForHomePage(timeoutMs: number): Promise<Response> {
  const deadline = Date.now() + timeoutMs;
  let lastError = "no response yet";
  for (;;) {
    try {
      const res = await fetch(`${BASE}/`);
      if (res.status === 200) {
        return res;
      }
      lastError = `HTTP ${res.status}`;
    } catch (err) {
      lastError = String(err);
      if (server?.exitCode !== null) {
        break;
      }
    }
    if (Date.now() > deadline) {
      break;
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(
    `Home page did not come up at ${BASE} (${lastError})\n--- server log ---\n${serverLog.slice(-4000)}`,
  );
}

describe("application skeleton", () => {
  beforeAll(async () => {
    server = startServer();
    await waitForHomePage(READY_TIMEOUT_MS);
  }, READY_TIMEOUT_MS + 10_000);

  afterAll(async () => {
    await stopServer();
  }, 15_000);

  it("starts and serves the home page without an error", async () => {
    const res = await fetch(`${BASE}/`);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type") ?? "").toContain("text/html");
    const html = await res.text();
    expect(html).toContain("Frizieris");
  });
});
