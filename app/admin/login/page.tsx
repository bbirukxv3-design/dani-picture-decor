// app/admin/login/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // ሎጊን ሲሳካ ወደ አድሚን ዳሽቦርድ ይወስደዋል
      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError("ኢሜይል ወይም የይለፍ ቃል ስህተት ነው፤ እባክዎ እንደገና ይሞክሩ።");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
            አድሚን መግቢያ (Admin Login)
          </h1>
          <p className="text-xs text-slate-400">ዳኒ ፎቶ & ዲኮር — የአስተዳዳሪ ገጽ</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">ኢሜይል</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-amber-400 text-slate-100 rounded-xl px-4 py-3 text-sm outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">የይለፍ ቃል (Password)</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-amber-400 text-slate-100 rounded-xl px-4 py-3 text-sm outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-black py-3.5 rounded-xl transition duration-300 shadow-lg text-sm uppercase tracking-wider cursor-pointer disabled:opacity-50"
          >
            {loading ? " በመግባት ላይ..." : "ግባ (Login)"}
          </button>
        </form>
      </div>
    </main>
  );
}