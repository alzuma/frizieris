"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

type NavItem = {
  label: string;
  href: string;
};

const CUSTOMER_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Book an appointment", href: "/book" },
  { label: "My bookings", href: "/bookings" },
];

const ADMIN_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "Services", href: "/admin/services" },
  { label: "Specialists", href: "/admin/specialists" },
  { label: "Working hours", href: "/admin/working-hours" },
  { label: "Bookings", href: "/admin/bookings" },
];

function NavLink({ item, pathname, onNavigate }: { item: NavItem; pathname: string; onNavigate: () => void }) {
  const active = pathname === item.href;
  return (
    <Link
      href={item.href}
      className={`nav-link${active ? " active" : ""}`}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
    >
      <span className="dot" aria-hidden="true" />
      {item.label}
    </Link>
  );
}

/**
 * The app shell: the sidebar with the main navigation for the customer and
 * admin areas, the mobile topbar, and the content column every page renders into.
 */
export function Navigation({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <div
        className={`scrim${open ? " show" : ""}`}
        aria-hidden="true"
        onClick={closeMenu}
      />
      <div className="shell">
        <aside className={`sidebar${open ? " open" : ""}`} aria-label="Main navigation">
          <div className="brand">
            <div className="brand-mark" aria-hidden="true">
              F
            </div>
            <div>
              <div className="brand-name">Frizieris</div>
              <div className="brand-sub">Booking</div>
            </div>
          </div>

          <nav className="nav-section" aria-label="Customer area">
            <div className="nav-title">Customer</div>
            {CUSTOMER_ITEMS.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} onNavigate={closeMenu} />
            ))}
          </nav>

          <nav className="nav-section" aria-label="Admin area">
            <div className="nav-title">Admin</div>
            {ADMIN_ITEMS.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} onNavigate={closeMenu} />
            ))}
          </nav>

          <div className="sidebar-foot">
            <div className="db-status">
              <span className="pulse" aria-hidden="true" />
              <span>Database connected</span>
            </div>
          </div>
        </aside>

        <div className="main">
          <header className="topbar">
            <button
              type="button"
              className="menu-btn"
              aria-label="Open navigation"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              &#9776;
            </button>
            <div className="topbar-brand">Frizieris</div>
          </header>

          <main className="content">{children}</main>
        </div>
      </div>
    </>
  );
}
