export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { checkDatabase } = await import("./lib/db");
    // Runs once when the server starts; a failed connection throws here,
    // so the server reports the error instead of starting silently.
    checkDatabase();
  }
}
