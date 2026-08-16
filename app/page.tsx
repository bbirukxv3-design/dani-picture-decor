"use client";

import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Image as ImageIconLucide,
  Video,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Heart,
  Send,
  Phone,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-neutral-950">
      <Navbar />

      {/* 1. HERO SECTION - Big Visual Impact */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-neutral-800">
        <div className="absolute inset-0 z-0">
          <Image
            src="/dani17.jpg"
            alt="Dani Pictures & Bernos Organizer"
            fill
            priority
            className="object-cover opacity-25 filter blur-[1px] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 backdrop-blur-md">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span>መሃል ሜዳ, ኢትዮጵያ | Mehal Meda</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-neutral-100 tracking-tight leading-tight mb-4">
            ዳኒ ፒክቸር <span className="text-amber-500">እና</span> በርኖስ ኦርጋናይዘር
          </h1>
          <p className="text-neutral-300 text-base md:text-xl max-w-3xl mx-auto font-light leading-relaxed mb-10">
            የእርስዎን ድንቅና የማይረሱ አፍታዎች በከፍተኛ ጥራት በፎቶና ቪዲዮ እንቀርጻለን፤ የሰርግ፣ የልደት እና የልዩ ፕሮግራሞችን ዲኮር በዘመናዊ መልኩ እንተገብራለን።
          </p>
            <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 border border-amber-400/40 px-6 py-2.5 rounded-full text-amber-300 font-extrabold text-lg md:text-2xl mb-8 tracking-wide shadow-lg shadow-amber-500/10 backdrop-blur-md">
  <Heart className="w-6 h-6 text-amber-400 fill-amber-400" />
  <span className="font-black text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
    "ይመርጡናል እንጂ አያወዳድሩንም!"
  </span>
</div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/booking"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-8 py-4 rounded-2xl text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              BOOK NOW <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-neutral-800/80 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-amber-500">100%</div>
              <div className="text-xs text-neutral-400 mt-1">የጥራት ዋስትና</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-amber-500">4K</div>
              <div className="text-xs text-neutral-400 mt-1">Cinematic ቪዲዮ</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-amber-500">መሃል ሜዳ</div>
              <div className="text-xs text-neutral-400 mt-1">ኢትዮጵያ</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-amber-500">24/7</div>
              <div className="text-xs text-neutral-400 mt-1">የቀጠሮ ዝግጅት</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT & BRAND INTRODUCTION */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-3xl overflow-hidden border border-neutral-800 group">
            <Image
             src="/dani5.jpg"
              alt="Studio Photography"
              fill
              className="object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 bg-neutral-950/80 backdrop-blur-md border border-neutral-800 p-4 rounded-2xl">
              <p className="text-amber-500 font-bold text-xs uppercase tracking-wider">ለማንኛውም ፕሮግራም</p>
              <h4 className="text-neutral-100 font-bold text-sm mt-1">ፕሮፌሽናል የፎቶና የዲኮር አደረጃጀት</h4>
            </div>
          </div>

          <div>
            <span className="text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold">
              ስ ስለ ዳኒ PICTURES & በርኖስ
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-neutral-100 mt-4 mb-3 leading-tight">
              ደንበኞቻችንን ማስደሰት የሁልጊዜ ቅድሚያ ተግባራችን ነው!
            </h2>
            <p className="text-amber-500 font-semibold text-sm mb-4">
              "የልባሞች ጅምር"
            </p>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6">
              **ዳኒ Pictures** እና **በርኖስ ኦርጋናይዘር** በመሃል ሜዳ የሚገኝ፣ የፎቶ ስቱዲዮ፣ የፎቶ ህትመትና ፍሬም፣ የ4K ቪዲዮ ቀረጻ እንዲሁም የሰርግና ልደት ዲኮር ስራዎችን በአንድ ቦታ የሚያቀርብ ዘመናዊ ተቋም ነው።
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                <span>በመሃል ሜዳ ምቹና ዘመናዊ የስቱዲዮ ቦታ</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                <span>ለሰርግ፣ ልደትና ምርቃት የሚሆኑ ውብ የዲኮር ዲዛይኖች</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                <span>ጥራት ያላቸው የካንቫስ፣ የላሚኔትና የእንጨት ፍሬም ህትመቶች</span>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-amber-500 font-bold text-sm hover:underline"
            >
              ተጨማሪ ... <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

     {/* 3. MAIN SERVICES SHOWCASE */}
      <section className="py-20 px-4 bg-neutral-900/40 border-y border-neutral-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold">
              ዋና ዋና አገልግሎቶች
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-neutral-100 mt-4 mb-3">
              ምን እንሰራለን?
            </h2>
            <p className="text-neutral-400 text-sm max-w-lg mx-auto">
              ለእርስዎ የደስታ ቀን የሚያስፈልጉ ሙሉ የፎቶ፣ ቪዲዮ እና የዲኮር ስራዎች በመሃል ሜዳ።
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden group hover:border-amber-500/40 transition duration-300 flex flex-col">
              <div className="relative h-[300px] w-full shrink-0">
                <Image
                  src="/dani15.jpg"
                  alt="Photo Print & Frame"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="w-10 h-10 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center mb-4">
                    <ImageIconLucide className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-neutral-100">ፎቶ</h3>
                  <p className="text-neutral-400 text-xs leading-relaxed mb-6">
                    በተለያየ ቦታዎች ፎቶ ማንሳት በከፍተኛ ጥራት።
                  </p>
                </div>
                <Link href="/services" className="text-amber-500 text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all mt-auto">
                  የዋጋ ዝርዝር <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden group hover:border-amber-500/40 transition duration-300 flex flex-col">
              <div className="relative h-[300px] w-full shrink-0">
                <Image
                  src="/dani7.jpg"
                  alt="Bernos Event Decor"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="w-10 h-10 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center mb-4">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-neutral-100">በርኖስ ኦርጋናይዘር</h3>
                  <p className="text-neutral-400 text-xs leading-relaxed mb-6">
                    ለሰርግ፣ ልደትና ልዩ ፕሮግራሞች ዘመናዊ የመድረክ እና የመኪና አሸንዳ ዲኮር ስራዎች።
                  </p>
                </div>
                <Link href="/services" className="text-amber-500 text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all mt-auto">
                  የዋጋ ዝርዝር <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden group hover:border-amber-500/40 transition duration-300 flex flex-col">
              <div className="relative h-[300px] w-full shrink-0">
                <Image
                  src="/dani22.jpg"
                  alt="የዳኒ ፒክቸር ስቱዲዮ አገልግሎት ምስል"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="w-10 h-10 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center mb-4">
                    <Video className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-neutral-100">የስቱዲዮ ሹቲንግ</h3>
                  <p className="text-neutral-400 text-xs leading-relaxed mb-6">
                    የሰርግና የልደት ቀረጻ በ Cinematic 4K ካሜራዎች እና በፕሮፌሽናል ኤዲቲንግ በቀለም ቅንብር።
                  </p>
                </div>
                <Link href="/services" className="text-amber-500 text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all mt-auto">
                  የዋጋ ዝርዝር <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BRAND & SOCIAL FOOTER SECTION */}
      <footer className="bg-neutral-950 border-t border-neutral-800 py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          
          {/* Logo & Brand Name */}
          <h2 className="text-2xl md:text-3xl font-black text-neutral-100 tracking-tight mb-2">
            ዳኒ Pictures <span className="text-amber-500">&</span> በርኖስ ኦርጋናይዘር
          </h2>

          {/* Slogan */}
          <div className="inline-flex items-center gap-2 text-amber-400 font-medium text-base md:text-lg mb-6">
            <Heart className="w-4 h-4 text-amber-500 fill-amber-500/20" />
            <span>"የልባሞች ጅምር"</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-neutral-400 text-sm mb-8">
            <MapPin className="w-4 h-4 text-amber-500" />
            <span>መሃል ሜዳ | Mehal Meda, Ethiopia</span>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-4 mb-10">
            <a
              href="https://t.me/@Cobra4th" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 text-neutral-300 hover:text-amber-400 rounded-2xl flex items-center justify-center transition-all shadow-sm"
              title="Telegram"
            >
              <Send className="w-5 h-5" />
            </a>
            {/* Facebook Custom SVG Icon */}
            <a
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 text-neutral-300 hover:text-amber-400 rounded-2xl flex items-center justify-center transition-all shadow-sm"
              title="Facebook"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="tel:+251976326260" 
              className="w-12 h-12 bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 text-neutral-300 hover:text-amber-400 rounded-2xl flex items-center justify-center transition-all shadow-sm"
              title="Phone"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>

          <div className="w-full border-t border-neutral-900 pt-8 text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} ዳኒ Pictures & በርኖስ ኦርጋናይዘር. መብቱ በህግ የተጠበቀ ነው።</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-amber-400 transition-colors">የግላዊነት ፖሊሲ</Link>
              <Link href="/terms" className="hover:text-amber-400 transition-colors">የአገልግሎት ደንቦች</Link>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}