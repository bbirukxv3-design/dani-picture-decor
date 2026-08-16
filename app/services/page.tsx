"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  Sparkles,
  Video,
  Image as ImageIcon,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    id: "photography",
    title: "የስቱዲዮ፣ የመስክ & ፕሮፌሽናል ፎቶ ቀረጻ",
    icon: Camera,
    desc: "በዘመናዊ ካሜራዎች እና የስቱዲዮ ላይቲንግ የተደገፉ የቁም፣ የቤተሰብ፣ የምርቃት እና ከቤት ውጭ የፎቶ ቀረጻዎች።",
    features: [
      "የስቱዲዮ እና የ መስክ ፎቶ ቀረጻ",
      "ከፍተኛ ጥራት ያለው Retouching & Color Grading",
      "የፖርትፎሊዮ እና የሞዴሊንግ ሹቲንግ",
      "የልጆች እና የቤተሰብ ትዝታዎች",
    ],
  },
  {
    id: "decor",
    title: "በርኖስ ኢቨንት & ዲኮር ",
    icon: Sparkles,
    desc: "ለሰርግ፣ ለልደት፣ ለምርቃት እና ለተለያዩ ስነ-ስርዓቶች የሚሆኑ ውብና ዘመናዊ የመድረክ ፣ የመኪና ዲኮር እና እንዲሁም ሙሉ ሳውንድ ሲስተም  ዝግጅቶች።",
    features: [
      "የሰርግ መድረክ (Stage) እና የመግቢያ ዲኮር",
      "የመኪና ዲኮር እና የሆብሊ ዲዛይኖች",
      "የልደት እና የልዩ ልዩ ድግሶች አደረጃጀት",
      "ሙሉ የሳውንድ ሲስተም እና ዲጄ",
    ],
  },
  {
    id: "video",
    title: "4K Cinematic ቪዲዮ ቀረጻ & ኤዲቲንግ",
    icon: Video,
    desc: "የሰርግ፣ የልደት እና የተለያዩ ዝግጅቶች በ-4K ጥራት ቀርጾ በዘመናዊ ሶፍትዌሮች ማቀናበር።",
    features: [
      "4K Ultra HD የሰርግ ፣ የልደት እና የተለያዩ ዝግጅቶች ቪዲዮ ቀረጻ",
      "የአየር ላይ (Drone) ቀረጻዎች",
      "ፕሮፌሽናል የቪዲዮ ኤዲቲንግ እና Color Grading",
      "የተለያዩ ጥራት ባላቸው ካሜራ ቀረጻዎች ",
    ],
  },
  {
    id: "printing",
    title: "የፎቶ ህትመት & የላሚኔት ፍሬሞች",
    icon: ImageIcon,
    desc: "ለረጅም ዘመን የሚቆዩ የካንቫስ፣ የእንጨት፣ የመስታወት እና የላሚኔት ፎቶ ህትመቶች በተለያዩ መጠኖች።",
    features: [
      "የካንቫስ ህትመት እና የእንጨት ፍሬሞች",
      "የባነር ህትመት በተለያዩ ሳይዞች",
      "የሰርግ እና የልደት አልበም ማዘጋጀት",
      "የግድግዳ ፍሬም እና የማስታወሻ ስራዎች",
    ],
  },
];

const photoPackages = [
  {
    name: "ፎቶ",
    price: "Silver",
    desc: "ለግል፣ ለልደት ወይም ለአነስተኛ ፕሮግራሞች የሚሆን የፎቶ ፓኬጅ",
    features: [
      "የስቱዲዮ & የመስክ ፎቶ ቀረጻዎች ",
      "ከፍተኛ ጥራት ያለው Retouching & Color Grading",
      "1 መካከለኛ የታተመ ፎቶ (A4 Size)",
      "Soft Copy (በFlash/Telegram)",
    ],
    highlighted: false,
  },
  {
    name: "ፎቶ",
    price: "Premium",
    desc: "ለሰርግ፣ ለልደትና ለትልልቅ በዓላት የተዘጋጀ ሙሉ የፎቶ እና ቪዲኦ ፓኬጅ",
    features: [
      "ሙሉ ቀን የፎቶ ቀረጻ (ስቱዲዮ + መስክ + ፕሮግራም)",
      "50+ ፕሮፌሽናል Retouched ፎቶዎች",
      "1 ትልቅ የካንቫስ ፍሬም + 2 መካከለኛ ፍሬሞች",
      "ልዩ ዲዛይን የተደረገ የሰርግ/የልደት አልበም",
      "ከፍተኛ ጥራት ያላቸው Soft Copyዎች በሙሉ",
    ],
    highlighted: true,
  },
  {
    name: "ፎቶ",
    price: "VIP",
    desc: "በእርስዎ ፍላጎትና ምርጫ መሰረት የሚዘጋጅ የላቀ አገልግሎት",
    features: [
      "2 ፕሮፌሽናል ፎቶግራፈሮች (ሙሉ ቀን ቀረጻ)",
      "ያልተገደበ የፎቶ ብዛት + ሙሉ ኤዲቲንግ",
      "ትልቅ የካንቫስ ግድግዳ ኮላጅ (3-in-1 Frame Set)",
      "የቅድመ-ሰርግ (Pre-Wedding) ፎቶ ሹቲንግ",
      "VIP ፈጣን ርክክብ (በ3 ቀን ውስጥ)",
      "ሁሉንም ፍልጎቶቾን ማሟላት",
    ],
    highlighted: false,
  },
];

const decorPackages = [
  {
    name: "ዲኮር",
    price: "Silver",
    desc: "ለአነስተኛ የቤት ውስጥ ድግሶችና ለልደት ዝግጅቶች የሚሆን",
    features: [
      "የልደት/የቤት ውስጥ አነስተኛ የመድረክ ዲኮር",
      "የፊኛ እና የጌጣጌጦች ማስተካከያ",
      "የኬክ ጠረጴዛ ማሳመሪያ",
      "የቀለም መረጣ በደንበኛው ፍላጎት",
    ],
    highlighted: false,
  },
  {
    name: "ዲኮር",
    price: "Premium",
    desc: "ለሰርግ እና ለትልልቅ በዓላት የተዘጋጀ ማራኪ የዲኮር ፓኬጅ",
    features: [
      "ሙሉ የሰርግ መድረክ ከአበቦች ጋር",
      "የመኪና ዲኮር እና የሆብሊ ዲዛይን",
      "የመግቢያ በር ማሳመሪያ",
      "የሙሽሮች መቀመጫ ልዩ ወንበሮችና ኤልኢዲ ላይቲንግ",
      "ለተለያዩ ትላልቅ በዓላት የሚሆን ፍላጎቶን የሚያረካ ዲኮር",
    ],
    highlighted: true,
  },
  {
    name: "ዲኮር",
    price: "VIP Custom",
    desc: "አዳራሽንና ሙሉ ቦታን በከፍተኛ ጥራት የሚያስቡበት VIP ፓኬጅ እና ሁሉም ፍላጎቶን የሚሟላ ፓኬጅ",
    features: [
      "የሆቴል(የአዳራሽ) ሙሉ የቦታ ዲኮር ዝግጅት",
      "የመድረክ፣ የመግቢያ እና የቪአይፒ ጠረጴዛዎች ማሳመሪያ",
      "የቀጥታ መድረክ መብራቶች & የጭስ ኢፌክት",
      "ልዩ የሙሽሮች መኪና እና የጋዜቦ ዲዛይን",
    ],
    highlighted: false,
  },
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<"photo" | "decor">("photo");

  // 🎯 ገጹ ሲከፈት ከሊንኩ (#decor ወይም #photography) አይቶ ታቡን የሚቀይር እና ወዲያው ወደ ታች የሚያወርድ ኮድ
  useEffect(() => {
    const handleCheckHash = () => {
      const hash = window.location.hash;

      if (hash === "#decor") {
        setActiveTab("decor");
        setTimeout(() => {
          document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else if (hash === "#photography" || hash === "#photo") {
        setActiveTab("photo");
        setTimeout(() => {
          document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    };

    handleCheckHash();
    window.addEventListener("hashchange", handleCheckHash);
    return () => window.removeEventListener("hashchange", handleCheckHash);
  }, []);

  const currentPackages = activeTab === "photo" ? photoPackages : decorPackages;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-neutral-950">
      <Navbar />

      {/* HEADER SECTION */}
      <section className="relative py-28 px-4 border-b border-neutral-800 text-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2000&q=80"
          alt="Services Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/50" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-amber-400 bg-neutral-950/80 border border-amber-500/40 px-4 py-1.5 rounded-full text-xs font-semibold inline-block mb-6 shadow-md backdrop-blur-md">
            አገልግሎቶቻችን | OUR SERVICES
          </span>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-neutral-100 mb-6 tracking-tight leading-tight drop-shadow-lg">
            <span className="block text-amber-400 mb-2">የዳኒ Pictures</span>
            <span className="text-neutral-300 font-light text-xl md:text-3xl block my-1">&amp;</span>
            <span className="block text-neutral-100">የበርኖስ ኦርጋናይዘር አገልግሎቶች</span>
          </h1>

          <p className="text-neutral-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mt-4 drop-shadow-md bg-neutral-950/40 backdrop-blur-sm py-2 px-4 rounded-full">
            እርስዎን በሚመጥን መልኩ የተዘጋጁ ልዩ የፎቶ፣ የቪዲዮ እና የዲኮር ፓኬጆችን መርጠው ቦታ ማስያዝ ይችላሉ።
          </p>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.id}
                className="bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 p-8 rounded-3xl transition duration-300"
              >
                <div className="bg-amber-500/10 text-amber-500 border border-amber-500/20 p-4 rounded-2xl w-fit mb-6">
                  <IconComp className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-100 mb-3">{item.title}</h2>
                <p className="text-neutral-400 text-sm mb-6 leading-relaxed">{item.desc}</p>

                <div className="space-y-2.5 border-t border-neutral-800 pt-6">
                  {item.features.map((feat, index) => (
                    <div key={index} className="flex items-center gap-3 text-xs md:text-sm text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PACKAGES SECTION (3ኛው ክፍል) */}
      <section id="packages" className="py-16 px-4 max-w-7xl mx-auto border-t border-neutral-900 scroll-mt-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-black text-neutral-100 mb-3">የአገልግሎት ፓኬጆች</h2>
          <p className="text-neutral-400 text-sm">ለእርስዎ የሚስማማውን ፓኬጅ መርጠው በቀላሉ ቦታ ማስያዝ ይችላሉ።</p>

          {/* TAB SWITCHER */}
          <div className="flex justify-center gap-4 mt-8 bg-neutral-900 p-1.5 rounded-2xl w-fit mx-auto border border-neutral-800">
            <button
              type="button"
              onClick={() => setActiveTab("photo")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all ${
                activeTab === "photo"
                  ? "bg-amber-500 text-neutral-950 shadow-lg"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              <Camera className="w-4 h-4" />
              የፎቶ &amp; ቪዲዮ ፓኬጆች
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("decor")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all ${
                activeTab === "decor"
                  ? "bg-amber-500 text-neutral-950 shadow-lg"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              የዲኮር ፓኬጆች
            </button>
          </div>
        </div>

        {/* PACKAGE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentPackages.map((pkg, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 border relative flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                pkg.highlighted
                  ? "bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 border-amber-500 shadow-xl shadow-amber-500/10"
                  : "bg-neutral-900 border-neutral-800 hover:border-neutral-700"
              }`}
            >
              {pkg.highlighted && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-neutral-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                
                </span>
              )}
              <div>
                <h3 className="text-xl font-bold text-neutral-100 mb-2">{pkg.name}</h3>
                <div className="text-amber-400 text-2xl font-black mb-3">{pkg.price}</div>
                <p className="text-neutral-400 text-xs mb-6 border-b border-neutral-800 pb-4">{pkg.desc}</p>

                <div className="space-y-3 mb-8">
                  {pkg.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/booking"
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-8 py-4 rounded-2xl text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                ቀጠሮ አሁን ይያዙ <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-800 bg-neutral-950 py-10 text-neutral-500 text-xs">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div className="font-bold text-neutral-200 text-sm mb-1">
              ዳኒ ፒክቸር &amp; በርኖስ ኦርጋናይዘር
            </div>
            <p className="text-amber-500/80 mb-1">"የልባሞች ጅምር"</p>
            <p>መሃል ሜዳ | Mehal Meda, Ethiopia</p>
          </div>
          <div className="text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} Dani Pictures &amp; Bernos Organizer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}