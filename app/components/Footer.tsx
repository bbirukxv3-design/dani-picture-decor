import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-gray-300 py-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="text-sm font-medium">
            © {new Date().getFullYear()} Dani Photo Decor. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-sm font-semibold text-slate-400">እኛን ይከተሉ፦</span>
          
          {/* TikTok Link */}
          <a
            href="https://www.tiktok.com/@brightpictuer"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors p-2"
            aria-label="TikTok"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.525 0h3.08c.12 1.056.68 2.012 1.545 2.68 1.037.802 2.308 1.157 3.595 1.125V6.9a7.023 7.023 0 01-3.62-1.025v6.52c0 4.032-3.268 7.301-7.3 7.301-4.033 0-7.301-3.269-7.301-7.301 0-4.032 3.268-7.301 7.301-7.301 1.052 0 2.062.227 2.98.636V8.818a4.237 4.237 0 00-2.98-.636c-2.35 0-4.252 1.902-4.252 4.252 0 2.35 1.902 4.252 4.252 4.252 2.35 0 4.252-1.902 4.252-4.252V0z" />
            </svg>
          </a>

          {/* Instagram Link */}
          <a
            href="https://instagram.com/biruk.__________"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors p-2"
            aria-label="Instagram"
          >
            <svg
              className="w-5 h-5 fill-none stroke-current stroke-2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>

          {/* Telegram Link */}
          <a
            href="https://t.me/Bright_Pictures"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors p-2"
            aria-label="Telegram"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.099.155.232.171.326.016.094.036.309.02.476z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}