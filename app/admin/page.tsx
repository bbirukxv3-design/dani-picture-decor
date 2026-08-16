"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  Trash2, 
  Calendar, 
  Phone, 
  Mail, 
  Clock, 
  Sparkles,
  LogOut,
} from "lucide-react";

interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  package_type: string;
  custom_notes: string | null;
  general_notes: string | null;
  date: string;
  time: string;
  status: string;
  created_at: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("ሁሉም");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // መረጃዎችን ከ Supabase ማምጣት
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (err) {
      console.error("መረጃ ማምጣት አልተቻለም፦", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ⏱️ የ 5 ደቂቃ ስራ ፈት (Inactivity) ቆጣሪ - Auto-logout
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const handleLogoutDueToInactivity = async () => {
      await supabase.auth.signOut();
      router.replace("/admin/login");
    };

    const resetTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      // 5 ደቂቃ = 5 * 60 * 1000 ሚሊሰከንድ (300,000 ms)
      inactivityTimer = setTimeout(handleLogoutDueToInactivity, 5 * 60 * 1000);
    };

    // ተጠቃሚው የሚያደርጋቸው እንቅስቃሴዎች (Events)
    const events = ["mousemove", "keydown", "mousedown", "scroll", "touchstart"];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // ሲከፈት ቆጣሪውን መጀመር
    resetTimer();

    // ገጹ ሲዘጋ ወይም ሲቀየር ሊስነሮቹን ማጽዳት (Cleanup)
    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [router]);

  // Logout Function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  // Status መቀየሪያ እና ኢሜይል መላኪያ (API Call)
  const handleStatusChange = async (booking: Booking, newStatus: string) => {
    if (booking.status === newStatus) return;

    setUpdatingId(booking.id);
    try {
      const res = await fetch("/api/admin/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: booking.id,
          status: newStatus,
          name: booking.name,
          email: booking.email,
          service: booking.service,
          date: booking.date,
          time: booking.time,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Status መቀየር አልተቻለም");
      }

      setBookings((prev) =>
        prev.map((b) => (b.id === booking.id ? { ...b, status: newStatus } : b))
      );

      alert(`✅ የቀጠሮው ሁኔታ ወደ "${newStatus}" ተቀይሯል፤ ለደንበኛውም ኢሜይል ተልኳል!`);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Status መቀየር አልተቻለም!";
      alert(`❌ ስህተት፦ ${errorMessage}`);
    } finally {
      setUpdatingId(null);
    }
  };

  // መረጃ ማጥፊያ
  const handleDeleteBooking = async (id: string) => {
    if (!confirm("ይህንን መረጃ በእርግጥ ማጥፋት ይፈልጋሉ?")) return;
    try {
      const { error } = await supabase.from("bookings").delete().eq("id", id);
      if (error) throw error;
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      alert("መረጃውን ማጥፋት አልተቻለም");
    }
  };

  // የሰዓት አቀራረብ ማስተካከያ
  const formatDateTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  // Stats
  const totalCount = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === "በሂደት ላይ").length;
  const confirmedCount = bookings.filter((b) => b.status === "የተረጋገጠ" || b.status === "ተቀብለናል").length;
  const canceledCount = bookings.filter((b) => b.status === "የተሰረዘ").length;

  // Filtering & Searching
  const filteredBookings = bookings.filter((item) => {
    const matchesFilter = activeFilter === "ሁሉም" || item.status === activeFilter;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm) ||
      item.service.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <h1 className="text-3xl font-black text-white flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-amber-400" />
              የአስተዳዳሪ ዳሽቦርድ (Admin Dashboard)
            </h1>
            <p className="text-slate-400 text-sm mt-1">የገቡትን ቀጠሮዎች፣ መልእክቶች እና ሙሉ መረጃዎች እዚህ ይከታተሉ። (ለ 5 ደቂቃ ስራ ፈት ከሆኑ በራሱ ይዘጋል)</p>
          </div>
          
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button 
              onClick={fetchBookings}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-700/60 px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 cursor-pointer"
            >
              🔄 አድስ
            </button>
            <button 
              onClick={handleLogout}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> ውጣ (Logout)
            </button>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div onClick={() => setActiveFilter("ሁሉም")} className={`bg-slate-900/80 border p-4 rounded-2xl cursor-pointer transition ${activeFilter === "ሁሉም" ? 'border-amber-500 shadow-lg shadow-amber-500/10' : 'border-slate-800'}`}>
            <div className="text-slate-400 text-xs font-medium">ጠቅላላ መረጃዎች</div>
            <div className="text-2xl font-extrabold mt-1">{totalCount}</div>
          </div>
          <div onClick={() => setActiveFilter("የተረጋገጠ")} className={`bg-emerald-950/20 border p-4 rounded-2xl cursor-pointer transition ${activeFilter === "የተረጋገጠ" || activeFilter === "ተቀብለናል" ? 'border-emerald-500 shadow-lg shadow-emerald-500/10' : 'border-emerald-900/30'}`}>
            <div className="text-emerald-400 text-xs font-medium">የተረጋገጡ</div>
            <div className="text-2xl font-extrabold text-emerald-400 mt-1">{confirmedCount}</div>
          </div>
          <div onClick={() => setActiveFilter("በሂደት ላይ")} className={`bg-amber-950/20 border p-4 rounded-2xl cursor-pointer transition ${activeFilter === "በሂደት ላይ" ? 'border-amber-500 shadow-lg shadow-amber-500/10' : 'border-amber-900/30'}`}>
            <div className="text-amber-400 text-xs font-medium">በሂደት ላይ ያሉ</div>
            <div className="text-2xl font-extrabold text-amber-400 mt-1">{pendingCount}</div>
          </div>
          <div onClick={() => setActiveFilter("የተሰረዘ")} className={`bg-red-950/20 border p-4 rounded-2xl cursor-pointer transition ${activeFilter === "የተሰረዘ" ? 'border-red-500 shadow-lg shadow-red-500/10' : 'border-red-900/30'}`}>
            <div className="text-red-400 text-xs font-medium">የተሰረዙ</div>
            <div className="text-2xl font-extrabold text-red-400 mt-1">{canceledCount}</div>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="flex items-center bg-slate-900/80 border border-slate-800 rounded-2xl px-4 py-3">
          <input 
            type="text"
            placeholder="በደንበኛ ስም፣ በስልክ ቁጥር ወይም በሰርቪስ ፈልግ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none"
          />
        </div>

        {/* BOOKINGS LIST */}
        {loading ? (
          <div className="text-center py-24 text-slate-500 animate-pulse">መረጃዎች በመጫን ላይ ናቸው...</div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-24 bg-slate-900/40 border border-slate-800/80 rounded-2xl text-slate-500">
            ምንም መረጃ አልተገኘም!
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredBookings.map((item) => (
              <div 
                key={item.id} 
                className="bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 transition p-6 rounded-2xl shadow-xl flex flex-col gap-6"
              >
                {/* Top Row: Name, Status & Delete */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-lg">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white flex items-center gap-2">
                        {item.name}
                      </h3>
                      <div className="text-xs text-slate-400 flex items-center gap-3 mt-1 flex-wrap">
                        <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-slate-500" /> {item.phone}</span>
                        <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-slate-500" /> {item.email || "ኢሜል የለም"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-auto">
                    <select
                      disabled={updatingId === item.id}
                      value={item.status}
                      onChange={(e) => handleStatusChange(item, e.target.value)}
                      className={`text-xs font-bold rounded-xl px-4 py-2 border outline-none cursor-pointer transition disabled:opacity-50 ${
                        item.status === 'የተረጋገጠ' || item.status === 'ተቀብለናል' ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30' :
                        item.status === 'የተሰረዘ' ? 'bg-red-950/40 text-red-400 border-red-500/30' :
                        'bg-amber-950/40 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      <option value="በሂደት ላይ" className="bg-slate-900 text-amber-400">⏳ በሂደት ላይ</option>
                      <option value="የተረጋገጠ" className="bg-slate-900 text-emerald-400">✅ የተረጋገጠ / ተቀብለናል</option>
                      <option value="የተሰረዘ" className="bg-slate-900 text-red-400">❌ የተሰረዘ</option>
                    </select>

                    <button 
                      onClick={() => handleDeleteBooking(item.id)} 
                      className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-red-950/40 text-slate-400 hover:text-red-400 border border-slate-700/60 transition cursor-pointer"
                      title="መረጃውን አጥፋ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Middle Grid: Detailed Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/50 p-4 rounded-xl border border-slate-800/40">
                  <div>
                    <span className="text-xs text-slate-500 block">የተመረጠው አገልግሎት</span>
                    <span className="text-sm font-semibold text-slate-200">{item.service}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">የፓኬጅ አይነት</span>
                    <span className="text-sm font-semibold text-amber-400">{item.package_type}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">የቀጠሮ ቀን እና ሰዓት</span>
                    <span className="text-sm font-semibold text-slate-200 flex items-center gap-1.5 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" /> {item.date || "አልተወሰነም"} 
                      <Clock className="w-3.5 h-3.5 text-amber-400 ml-2" /> {item.time || ""}
                    </span>
                  </div>
                </div>

                {/* Bottom Section: Notes */}
                {(item.custom_notes || item.general_notes) && (
                  <div className="space-y-2">
                    {item.custom_notes && (
                      <div className="bg-amber-950/10 border border-amber-500/20 p-3.5 rounded-xl text-xs">
                        <span className="font-bold text-amber-400 block mb-1">የደንበኛው ልዩ ማስታወሻ (Custom Notes):</span>
                        <p className="text-slate-300 leading-relaxed">{item.custom_notes}</p>
                      </div>
                    )}
                    {item.general_notes && (
                      <div className="bg-slate-950/40 border border-slate-800 p-3.5 rounded-xl text-xs">
                        <span className="font-bold text-slate-400 block mb-1">አጠቃላይ ማስታወሻ (General Notes):</span>
                        <p className="text-slate-300 leading-relaxed">{item.general_notes}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Footer of Card */}
                <div className="text-xs text-slate-400 flex items-center justify-end gap-1.5 pt-2 border-t border-slate-800/40">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>የተላከበት ሰዓት፦ <strong className="text-slate-200">{formatDateTime(item.created_at)}</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}