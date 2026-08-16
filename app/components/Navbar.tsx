"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "መነሻ", href: "/" },
    { name: "ስለ እኛ", href: "/about" },
    { name: "አገልግሎቶች", href: "/services" },
    { name: "ጋላሪ", href: "/gallery" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black text-white tracking-wider">
              ዳኒ <span className="text-amber-500">PICTURES</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              // ያለህበትን ገጽ ማረጋገጫ (Active Check)
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

          {/* Quick Action Button */}
          <div className="hidden md:block">
            <Link
              href="/booking"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm transition duration-200 shadow-md shadow-amber-500/10"
            >
              ቀጠሮ ይያዙ
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}