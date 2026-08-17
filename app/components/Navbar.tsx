"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "መነሻ", href: "/" },
    { name: "ስለ እኛ", href: "/about" },
    { name: "አገልግሎቶች", href: "/services" },
    { name: "ጋላሪ", href: "/gallery" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black text-white tracking-wider">
              ዳኒ <span className="text-amber-500">PICTURES</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-sm shadow-amber-500/10"
                      : "text-slate-300 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Link
              href="/booking"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm transition duration-200 shadow-md shadow-amber-500/10"
            >
              ቀጠሮ ይያዙ
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 text-white hover:bg-slate-900"
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-950 p-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <Link
                href="/booking"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-amber-500 px-4 py-3 text-center text-sm font-bold text-slate-950 hover:bg-amber-600"
              >
                ቀጠሮ ይያዙ
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}