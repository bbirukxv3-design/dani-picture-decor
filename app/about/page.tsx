"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import {
  Camera,
  Heart,
  MapPin,
  Award,
  Sparkles,
  Users,
  ShieldCheck,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-neutral-950">
      <Navbar />

      {/* 1. PAGE HEADER WITH BACKGROUND IMAGE */}
      <section className="relative py-24 px-4 border-b border-neutral-800 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
          src="/dani16.jpg"
            alt="Background Decor"
            fill
            priority
            className="object-cover opacity-20 filter blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/40" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-amber-500 bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full text-xs font-semibold inline-block mb-4 backdrop-blur-md">
            ስለ እኛ | ABOUT US
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-neutral-100 mb-4 tracking-tight">
            ዳኒ ፒክቸር <span className="text-amber-500">እና</span> በርኖስ ኦርጋናይዘር
          </h1>
          <p className="text-amber-400 font-medium text-lg md:text-2xl flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-amber-500 fill-amber-500/20" />
            <span>"የልባሞች ጅምር"</span>
          </p>
        </div>
      </section>

      {/* 2. PHOTO MOSAIC & BRAND STORY */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo Collage / Mosaic */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative h-80 rounded-2xl overflow-hidden border border-neutral-800 shadow-xl group">
                <Image
                 src="/dani25.jpg"
                  alt="Studio Shooting"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="relative h-40 rounded-2xl overflow-hidden border border-neutral-800 shadow-xl group">
                <Image
                 src="/dani24.jpg"
                  alt="Frames & Prints"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative h-40 rounded-2xl overflow-hidden border border-neutral-800 shadow-xl group">
                <Image
                  src="/dani2.jpg"
                  alt="Video Shooting"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="relative h-79 rounded-2xl overflow-hidden border border-neutral-800 shadow-xl group">
                <Image
                  src="/dani4.jpg"
                  alt="Wedding Decor"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-800 text-neutral-300 px-3 py-1 rounded-lg text-xs font-medium mb-4">
              <MapPin className="w-3.5 h-3.5 text-amber-500" /> መሃል ሜዳ | Mehal Meda
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-neutral-100 mb-6 leading-tight">
              ጥበብና ጥራትን ያስተናገደ የደስታዎ አጋር!
            </h2>
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-4">
              **ዳኒ ፒክቸር** እና **በርኖስ ኦርጋናይዘር** በመሃል ሜዳ ከተማ የሚገኝ፣ የፎቶ ስቱዲዮ፣ የላቀ ጥራት ያለው የፎቶ ህትመትና ፍሬም፣ የ4K Cinematic ቪዲዮ ቀረጻ እንዲሁም የሰርግ፣ የልደት እና የልዩ ፕሮግራሞች ዲኮር አዘጋጅ ተቋም ነው።
            </p>
            <p className="text-neutral-400 text-sm leading-relaxed mb-8">
              እያንዳንዱ የሰርግ፣ የልደት እና የምርቃት በዓል ለደንበኞቻችን የማይደገም አፍታ መሆኑን እንረዳለን። ስለሆነም የስራዎቻችንን ጥራት እና ውበት በመጠበቅ በዘመናዊ የካሜራ እና የዲኮር እቃዎች እውነታውን በጥበብ እንቀርጻለን።
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 border-t border-neutral-800 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center shrink-0">
                  <Camera className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-neutral-200">ስቱዲዮ & መስክ ፎቶ</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-neutral-200">በርኖስ ዲኮር & ሳውንድ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISUAL SHOWCASE BANNER */}
      <section className="py-16 px-4 bg-neutral-900/50 border-y border-neutral-800">
        <div className="max-w-1400 mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-black text-neutral-100">የአገልግሎቶቻችን ምስላዊ ማሳያ</h3>
            <p className="text-neutral-400 text-xs mt-1">በመሃል ሜዳ በጥራት የምናቀርባቸው ዋና ዋና ስራዎች</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden group">
              <div className="relative h-125 w-full">
                <Image
                  src="/dani23.jpg"
                  alt="Studio Portraits"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
              </div>
              <div className="p-4">
                <h4 className="text-sm font-bold text-neutral-100">የስቱዲዮ ፎቶ ቀረጻ</h4>
                <p className="text-xs text-neutral-400 mt-1">በዘመናዊ መብራቶች የተዘጋጀ የቁም ፎቶ ቀረጻ</p>
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden group">
              <div className="relative h-125 w-full">
                <Image
                  src="/dani18.jpg"
                  alt="Wedding Decor"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
              </div>
              <div className="p-4">
                <h4 className="text-sm font-bold text-neutral-100">የሚያምር የፎቶ ስራዎች</h4>
                <p className="text-xs text-neutral-400 mt-1">ለሚያምሩ የሚያምር</p>
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden group">
              <div className="relative h-125 w-full">
                <Image
                  src="/dani11.jpg"
                  alt="Custom Frames"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
              </div>
              <div className="p-4">
                <h4 className="text-sm font-bold text-neutral-100">የመስክ ላይ ፎቶ</h4>
                <p className="text-xs text-neutral-400 mt-1">ዘመን ተሻጋሪ ጥራት ያላቸው የመስክ ፎቶዎች</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SLOGAN & VALUES SECTION */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <div className="text-center">
          <span className="text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold">
         ራዕይ
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-amber-500 mt-4 mb-6">
            "ይመርጡናል እንጂ አያወዳድሩንም!"
          </h2>
          

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl text-left">
              <Award className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="text-lg font-bold text-neutral-100 mb-2">ከፍተኛ ጥራት</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                በላቁ የፎቶ ህትመቶች፣ ረጅም ዘመን በሚቆዩ ፍሬሞችና በ4K ቪዲዮ ኤዲቲንግ ጥራትን ማስቀደም።
              </p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl text-left">
              <Users className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="text-lg font-bold text-neutral-100 mb-2">ደንበኛ ተኮር</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                የእያንዳንዱን ደንበኛ ፍላጎትና ምርጫ በመረዳት ለየት ያለና የተቀናጀ አገልግሎት መስጠት።
              </p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl text-left">
              <ShieldCheck className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="text-lg font-bold text-neutral-100 mb-2">የጊዜ እቅድና ታማኝነት</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                በተባለበት ሰዓትና ቀን ስራዎችን በጥራት አጠናቆ ማስረከብ የዕለት ተዕለት መመሪያችን ማድረግ።
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="border-t border-neutral-800 bg-neutral-950 py-10 text-neutral-500 text-xs">
        <div className="max-w-8xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div className="font-bold text-neutral-200 text-sm mb-1">
              ዳኒ Pictures & በርኖስ ኦርጋናይዘር
            </div>
            <p className="text-amber-500/80 mb-1">"የልባሞች ጅምር"</p>
            <p>መሃል ሜዳ | Mehal Meda, Ethiopia</p>
          </div>
          <div className="text-center md:text-right">
          </div>
        </div>
      </footer>
    </div>
  );
}