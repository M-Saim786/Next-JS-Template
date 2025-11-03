// app/(dashboard)/layout.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  CalendarDays,
  FileUp,
  HeartPulse,
  LogOut,
  Menu,
  BarChart3,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

// ──────────────────────────────────────────────────────────────
// DUMMY USER (safe fallback – never crashes)
// ──────────────────────────────────────────────────────────────
const DUMMY_USER = {
  email: "john.doe@example.com",
  role: "Patient",
};

// ──────────────────────────────────────────────────────────────
// NAVIGATION CONFIG (easy to extend)
// ──────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/dashboard/page2", icon: CalendarDays, label: "Page 2" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // ───── Logout (clears nothing – just redirects) ─────
  const handleLogout = () => {
    router.push("/auth");
  };

  // ───── Current page title ─────
  const pageTitle =
    NAV_ITEMS.find((item) => pathname.startsWith(item.href))?.label ??
    "Dashboard";

  return (
    <div className="flex h-screen bg-background">
      {/* ───── Mobile Sidebar ───── */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent
            onNavClick={() => setMobileOpen(false)}
            onLogout={handleLogout}
          />
        </SheetContent>
      </Sheet>

      {/* ───── Desktop Sidebar ───── */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-card">
        <SidebarContent onNavClick={() => {}} onLogout={handleLogout} />
      </aside>

      {/* ───── Main Area ───── */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-card px-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          <h1 className="text-xl font-semibold">{pageTitle}</h1>

          <div className="w-10" /> {/* spacer */}
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Reusable Sidebar (desktop + mobile)
// ──────────────────────────────────────────────────────────────
function SidebarContent({
  onNavClick,
  onLogout,
}: {
  onNavClick: () => void;
  onLogout: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold">
          <HeartPulse className="h-7 w-7 text-primary" />
          <span>Brand Name</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} onClick={onNavClick}>
            <Button
              variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}
              className="w-full justify-start gap-3"
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
            {DUMMY_USER.email[0].toUpperCase()}
          </div>
          <div className="text-sm">
            <p className="font-medium">{DUMMY_USER.email}</p>
            <p className="text-muted-foreground">{DUMMY_USER.role}</p>
          </div>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}