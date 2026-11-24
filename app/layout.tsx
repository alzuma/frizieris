import type { Metadata } from "next";
import { checkDatabase } from "@/lib/db";
import { Navigation } from "@/components/navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frizieris",
  description: "Frizieru rezervācijas sistēma",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // A failed database connection throws here and stops the page rendering:
  // the error is reported, never silent.
  checkDatabase();

  return (
    <html lang="en">
      <body>
        <Navigation>{children}</Navigation>
      </body>
    </html>
  );
}
