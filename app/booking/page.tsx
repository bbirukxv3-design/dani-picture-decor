"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// 1. የአገልግሎት ፓኬጆች ዝርዝር
const SERVICE_PACKAGES = {
  "ፎቶግራፍ (Photography)": [
    { id: "Standard Photo", title: "Standard Photo", desc: "15 Edited Photos + 2 ሰዓት ሽፋን", icon: "📸" },
    { id: "VIP Photo & Video", title: "⭐ VIP Photo & Video", desc: "ያልተገደበ ፎቶ + 4K Highlight Video", icon: "🎥" },
    { id: "Custom Package", title: "👑 Custom Package", desc: "በእርስዎ ፍላጎትና ባጀት የሚዘጋጅ", icon: "🎨" },
  ],
  "ዲኮር (Decor)": [
    { id: "Standard Decor", title: "Standard Decor", desc: "መሰረታዊ የመድረክ ዲኮር እና የጀርባ አበቦች", icon: "🎈" },
    { id: "VIP Decor", title: "⭐ VIP Decor", desc: "ሙሉ የደመቀ የመድረክ ዲኮር + የመድረክ መብራት (Lighting)", icon: "✨" },
    { id: "Custom Package", title: "👑 Custom Package", desc: "ለየት ያለ ጭብጥ (Theme) ያለው ዲኮር", icon: "🎨" },
  ],
} as const;

type ServiceCategory = keyof typeof SERVICE_PACKAGES;

export default function BookingPage() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [liveClock, setLiveClock] = useState<string>("");
  const [minDate, setMinDate] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "ፎቶግራፍ (Photography)" as ServiceCategory,
    packageType: "Standard Photo",
    customNotes: "",
    generalNotes: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);

    const updateClock = () => {
      const now = new Date();
      setLiveClock(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const getServiceLink = () => {
    return formData.service.includes("ዲኮር")
      ? "/services#decor"
      : "/services#photography";
  };

  const handleServiceChange = (serviceName: ServiceCategory) => {
    const defaultPackage = SERVICE_PACKAGES[serviceName][0].id;
    setFormData((prev) => ({
      ...prev,
      service: serviceName,
      packageType: defaultPackage,
    }));
  };

  const setNowTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    setFormData((prev) => ({ ...prev, time: `${hours}:${minutes}` }));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      // 1. መረጃውን ወደ Supabase ዳታቤዝ ማስገባት
      const { error } = await supabase.from("bookings").insert([
        {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          service: formData.service,
          package_type: formData.packageType,
          custom_notes:
            formData.packageType === "Custom Package"
              ? formData.customNotes.trim()
              : null,
          general_notes: formData.generalNotes
            ? formData.generalNotes.trim()
            : null,
          date: formData.date,
          time: formData.time,
          created_at: new Date().toISOString(),
          status: "በሂደት ላይ",
        },
      ]);

      if (error) throw new Error(error.message);

      // 2. ለደንበኛው በ Resend (API Route) በኩል የማረጋገጫ ኢሜይል መላክ
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          service: formData.service,
          packageType: formData.packageType,
          date: formData.date,
          time: formData.time,
        }),
      });

      if (!emailResponse.ok) {
        console.warn("ኢሜይል መላክ አልተቻለም፤ ነገር ግን ቀጠሮው ዳታቤዝ ውስጥ ገብቷል።");
      }

      // 3. ወደ ቴሌግራም ቦት (API Route) ማሳወቂያ መላክ
      const telegramResponse = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          service: formData.service,
          packageType: formData.packageType,
          date: formData.date,
          time: formData.time,
          customNotes: formData.customNotes.trim(),
          generalNotes: formData.generalNotes.trim(),
        }),
      });

      if (!telegramResponse.ok) {
        console.warn("የቴሌግራም ማሳወቂያ መላክ አልተቻለም።");
      }

      setStatusMessage({
        type: "success",
        text: "✨ ቀጠሮዎ በተሳካ ሁኔታ ተይዟል! የማረጋገጫ ኢሜይል እና የቴሌግራም ማሳወቂያ ተልኳል።",
      });

      // 4. Form Reset
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "ፎቶግራፍ (Photography)",
        packageType: "Standard Photo",
        customNotes: "",
        generalNotes: "",
        date: "",
        time: "",
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "የሆነ ስህተት ተፈጥሯል፤ እባክዎ ደግመው ይሞክሩ።";
      setStatusMessage({
        type: "error",
        text: `ቀጠሮውን መያዝ አልተቻለም፦ ${errorMessage}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-slate-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      {/* Ambient Light Background Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl w-full bg-slate-900/80 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/60 flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 px-4 py-2 rounded-xl border border-amber-500/20 transition duration-200"
          >
            ← መነሻ ገጽ
          </Link>

          <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-full border border-slate-800 text-xs text-amber-400 font-mono shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>አሁን ያለው ሰዓት፦ {liveClock || "00:00:00 AM"}</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 tracking-tight">
            ቀጠሮዎን ያስይዙ
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            ዳኒ ፎቶ & ዲኮር — ውብ እና የማይረሱ ትዝታዎችዎን አብረን እንቀርጻለን
          </p>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div
            className={`p-4 rounded-2xl text-xs sm:text-sm font-medium border mb-8 ${
              statusMessage.type === "success"
                ? "bg-emerald-950/50 border-emerald-500/40 text-emerald-200"
                : "bg-red-950/50 border-red-500/40 text-red-200"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 1. የደንበኛ የግል መረጃ */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
              1. የደንበኛ መረጃ
            </h2>

            <div>
              <label htmlFor="name" className="block text-xs font-medium text-slate-300 mb-1.5">
                ሙሉ ስም *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="ስምዎን ያስገቡ..."
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-amber-400 text-slate-100 rounded-xl px-4 py-3 text-sm outline-none transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-slate-300 mb-1.5">
                  ስልክ ቁጥር *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="09..."
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-amber-400 text-slate-100 rounded-xl px-4 py-3 text-sm outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1.5">
                  ኢሜይል አድራሻ *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-amber-400 text-slate-100 rounded-xl px-4 py-3 text-sm outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* 2. የቀጠሮ ቀን እና ሰዓት */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
              2. የቀጠሮ ቀን እና ሰዓት
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-xs font-medium text-slate-300 mb-1.5">
                  የቀጠሮ ቀን *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  min={minDate}
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-amber-400 text-slate-100 rounded-xl px-4 py-3 text-sm outline-none cursor-pointer transition"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="time" className="text-xs font-medium text-slate-300">
                    የቀጠሮ ሰዓት *
                  </label>
                  <button
                    type="button"
                    onClick={setNowTime}
                    className="text-[10px] text-amber-400 hover:underline cursor-pointer"
                  >
                    ⏱️ አሁን ያለውን ሰዓት ሙላ
                  </button>
                </div>
                <input
                  type="time"
                  id="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-amber-400 text-slate-100 rounded-xl px-4 py-3 text-sm outline-none cursor-pointer transition"
                />
              </div>
            </div>
          </div>

          {/* 3. የአገልግሎት ዓይነት ይምረጡ */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-2">
              3. የአገልግሎት ዓይነት ይምረጡ *
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleServiceChange("ፎቶግራፍ (Photography)")}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer ${
                  formData.service === "ፎቶግራፍ (Photography)"
                    ? "bg-amber-500/15 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div>
                  <h3 className="font-bold text-base text-slate-100">ፎቶግራፍ</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Photography Studio</p>
                </div>
                <span className="text-xl">📸</span>
              </button>

              <button
                type="button"
                onClick={() => handleServiceChange("ዲኮር (Decor)")}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer ${
                  formData.service === "ዲኮር (Decor)"
                    ? "bg-amber-500/15 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div>
                  <h3 className="font-bold text-base text-slate-100">ዲኮር</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Event Decor Design</p>
                </div>
                <span className="text-xl">✨</span>
              </button>
            </div>
          </div>

          {/* 4. የፓኬጅ ዓይነት ይምረጡ */}
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                4. የ{formData.service.split(" ")[0]} ፓኬጅ ይምረጡ *
              </h2>

              <Link
                href={getServiceLink()}
                className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
              >
                👁️ የ{formData.service.split(" ")[0]} ዝርዝር ይመልከቱ →
              </Link>
            </div>

            <div className="space-y-3">
              {SERVICE_PACKAGES[formData.service].map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => setFormData((prev) => ({ ...prev, packageType: pkg.id }))}
                  className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer ${
                    formData.packageType === pkg.id
                      ? "bg-amber-500/15 border-amber-500 text-amber-300 ring-1 ring-amber-500"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3 text-left flex-1">
                    <span className="text-2xl">{pkg.icon}</span>
                    <div>
                      <h3 className="font-bold text-sm text-slate-100">{pkg.title}</h3>
                      <p className="text-xs text-slate-400">{pkg.desc}</p>
                    </div>
                  </div>

                  <Link
                    href={getServiceLink()}
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg border border-amber-500/30 transition shrink-0"
                  >
                    ዝርዝር ይመልከቱ →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Custom Package ሲመረጥ ብቻ የሚመጣ ሳጥን */}
          {formData.packageType === "Custom Package" && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl space-y-2">
              <label htmlFor="customNotes" className="block text-xs font-bold text-amber-300">
                👑 የልዩ ፓኬጅ ፍላጎትዎን ዝርዝር ያስገቡ *
              </label>
              <textarea
                id="customNotes"
                name="customNotes"
                required
                rows={3}
                value={formData.customNotes}
                onChange={handleChange}
                placeholder="ምን ዓይነት ልዩ የዲኮር ዝግጅት ወይም የፎቶ ስራ እንዲሰራሎት ይፈልጋሉ?..."
                className="w-full bg-slate-950/80 border border-amber-500/30 focus:border-amber-400 text-slate-100 placeholder-slate-500 rounded-xl p-3 text-xs sm:text-sm outline-none resize-none"
              />
            </div>
          )}

          {/* 6. ተጨማሪ አጠቃላይ አስተያየት */}
          <div>
            <label htmlFor="generalNotes" className="block text-xs font-medium text-slate-300 mb-1.5">
              ተጨማሪ አስተያየት ወይም ማስታወሻ (ምርጫዊ)
            </label>
            <textarea
              id="generalNotes"
              name="generalNotes"
              rows={2}
              value={formData.generalNotes}
              onChange={handleChange}
              placeholder="ተጨማሪ ማለት የሚፈልጉት ነገር ካለ እዚህ ይፃፉ..."
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-amber-400 text-slate-100 rounded-xl p-3 text-xs sm:text-sm outline-none resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-4 rounded-2xl transition duration-300 shadow-[0_0_25px_rgba(245,158,11,0.3)] disabled:opacity-50 text-sm uppercase tracking-wider cursor-pointer"
          >
            {loading ? "በመላክ ላይ..." : "ቀጠሮ ያዙ (Book Now)"}
          </button>
        </form>
      </div>
    </main>
  );
}