import type { Metadata } from "next";
import { Placeholder } from "@/components/placeholder";

export const metadata: Metadata = {
  title: "My bookings",
};

export default function MyBookingsPage() {
  return <Placeholder title="My bookings" />;
}
