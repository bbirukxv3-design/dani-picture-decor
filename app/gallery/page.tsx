"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { Camera, Sparkles, Image as ImageIcon, Heart, X, ZoomIn } from "lucide-react";

const galleryItems = [
  { id: 1, title: "ፎቶ 1", category: "photo", image: "/dani10.jpg", desc: "የጥበብ ስራን ከመረጠ ገጽታ ጋር በማቀናጀት የተሰራ ማራኪ ፎቶ" },
  { id: 2, title: "ፎቶ 2", category: "photo", image: "/dani8.jpg", desc: "የጓደኝነትን እና የወዳጅነትን እሴት የሚያንጸባርቅ የማይረሳ ቅጽበት" },
  { id: 3, title: "ፎቶ 3", category: "photo", image: "/dani19.jpg", desc: "የከተማ ዘመናዊ ፋሽንን እና ደስ የሚል የመዝናኛ ስሜትን የሚያንጸባርቅ ፎቶ" },
  { id: 4, title: "ፎቶ 4", category: "photo", image: "/dani6.jpg", desc: "ከተፈጥሮ ጋር የተዋሃደ ውብ የፎቶ ስራ" },
  { id: 5, title: "ፎቶ 5", category: "photo", image: "/dani21.jpg", desc: "ከእግርኳስ ጨዋታ ጋር የተያያዘ ደስ የሚል ቅጽበት እና ከልብ የሚወጣ ፈገግታ" },
  { id: 6, title: "ፎቶ 6", category: "photo", image: "/dani17.jpg", desc: "በለመለመ ተፈጥሮ እና በትልልቅ ዛፎች ጥላ ስር የተነሳ ማራኪ ፎቶ" },
  { id: 7, title: "ፎቶ 7", category: "photo", image: "/dani9.jpg", desc: "ከተፈጥሮ ወይም ከባህል ዝግጅት ውጪ፣ በቤት ውስጥ ጸጥታ ውስጥ መጽሐፍን በማንበብ ትኩስ እና ሰላማዊ ጊዜን የሚያሳይ ፎቶ" },
  { id: 8, title: "ፎቶ 8", category: "photo", image: "/dani7.jpg", desc: "ጥልቅ ሐሳብን እና ሰላማዊ ስሜትን በጸጥታ የሚያሳይ ፎቶ" },
  { id: 9, title: "ፎቶ 9", category: "photo", image: "/dani3.jpg", desc: "ከልብ የሚወጣ ፈገግታን እና ሕያው ስሜትን የሚያንጸባርቅ ውብ ፎቶ" },
  { id: 10, title: "ፎቶ 10", category: "photo", image: "/dani16.jpg", desc: "የጥንታዊ ዘይቤን ከመጽሐፍ ንባብ እና ከባህላዊ እቃዎች ጋር በማቀናጀት የተሰራ ልዩ ፎቶ" },
  { id: 11, title: "ፎቶ 11", category: "photo", image: "/dani23.jpg", desc: "ማራኪ መነጽር እና ዘመናዊ አቀማመጥን በመጠቀም የተሰራ ውብ የስታዲዮ ፎቶ" },
  { id: 12, title: "ፎቶ 12", category: "photo", image: "/dani12.jpg", desc: "የራሱን ልዩ ስሜት እና ጥልቅ ትርጉም የሚያንጸባርቅ ፎቶ" },
  { id: 13, title: "ፎቶ 13", category: "photo", image: "/dani13.jpg", desc: "ጥልቅ የሃይማኖት እና የባህል መገለጫዎችን በታላቅ ድምቀት የሚያሳይ ውብ ፎቶ" },
  { id: 14, title: "ፎቶ 14", category: "photo", image: "/dani1.jpg", desc: "የኢትዮጵያን ባህላዊ ልብስ እና የተፈጥሮ ውበት በድምቀት የሚያሳይ ማራኪ ፎቶ" },
  { id: 15, title: "ፎቶ 15", category: "photo", image: "/dani20.jpg", desc: "በለሊት ውበት ውስጥ የተረጋጋ ስሜትን እና ጥልቅ ስብዕናን የሚያሳይ የቁም ፎቶ" },
  { id: 16, title: "ፎቶ 16", category: "photo", image: "/dani14.jpg", desc: "የህብረተሰቡን ስብሰባዎች እና ባህላዊ ድምቀቶች የሚያሳይ ህያው ፎቶ" },
  { id: 17, title: "ፎቶ 17", category: "photo", image: "/dani25.jpg", desc: "ከተፈጥሮ አካባቢ ጋር የተዋሃደ እና ልዩ ፋሽንን የሚያሳይ ፎቶ" },
  { id: 18, title: "ፎቶ 18", category: "decor", image: "/dani27.jpg", desc: "በደማቅ አበቦች እና በልደት ኬክ የተዋበ ዲኮር" },
  { id: 19, title: "ፎቶ 19", category: "decor", image: "/dani28.jpg", desc: "በሰማያዊ እና በሮዝ ቀለማት የተዋበ ውብ የልደት ዲኮር" },
  { id: 20, title: "ፎቶ 20", category: "decor", image: "/dani29.jpg", desc: "በሚያምሩ ብርሃናት እና በፊኛዎች የተሞላ ማራኪ የክብረ በዓል ዲኮር" },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  const filteredItems =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-neutral-950">
      <Navbar />

      {/* MODERN VIBRANT HERO HEADER */}
      <section className="relative py-32 px-4 border-b border-neutral-800/80 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/15 blur-[120px] rounded-full pointer-events-none z-0" />

        {/* Crisp Header Background Image */}
        <div className="absolute inset-0 z-0 opacity-80 scale-105 transition-transform duration-1000 ease-out">
          <Image
            src="/dani29.jpg"
            alt="Gallery Highlight Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Vignette Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/60 z-0" />
        <div className="absolute inset-0 bg-neutral-950/30 backdrop-brightness-90 z-0" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-amber-300 bg-neutral-900/90 border border-amber-500/40 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold mb-6 shadow-xl shadow-amber-500/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>የስራዎቻችን ጋላሪ | GALLERY</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
            ዳኒ ፒክቸር <span className="text-amber-400">&</span> በርኖስ ኦርጋናይዘር
          </h1>

          <p className="text-amber-300 font-medium text-sm sm:text-base flex items-center justify-center gap-2 drop-shadow-md bg-neutral-950/70 backdrop-blur-md py-2 px-6 rounded-full max-w-fit mx-auto border border-neutral-800">
            <Heart className="w-4 h-4 text-amber-500 fill-amber-500/30 animate-pulse" />
            <span>"የልባሞች ጅምር" - በመሃል ሜዳ የተሰሩ ጥራት ያላቸው ስራዎች</span>
          </p>
        </div>
      </section>

      {/* FILTER BUTTONS */}
      <section className="py-10 px-4 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              filter === "all"
                ? "bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20"
                : "bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-700"
            }`}
          >
            ሁሉንም አሳይ ({galleryItems.length})
          </button>
          <button
            onClick={() => setFilter("photo")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              filter === "photo"
                ? "bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20"
                : "bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-700"
            }`}
          >
            <Camera className="w-3.5 h-3.5" /> የስቱዲዮ ፎቶ
          </button>
          <button
            onClick={() => setFilter("decor")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              filter === "decor"
                ? "bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20"
                : "bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-700"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> በርኖስ ዲኮር
          </button>
          <button
            onClick={() => setFilter("frames")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              filter === "frames"
                ? "bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20"
                : "bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-700"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" /> ፎቶ ህትመት & ፍሬም
          </button>
        </div>

        {/* EXPANDED MASONRY/GRID SHOWCASE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden cursor-pointer hover:border-amber-500/50 transition duration-300 shadow-md hover:shadow-xl hover:shadow-amber-500/5"
            >
              <div className="relative h-110 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent opacity-80 group-hover:opacity-90 transition duration-300" />

                {/* Zoom Icon overlay */}
                <div className="absolute top-3 right-3 bg-neutral-950/70 backdrop-blur-md p-2 rounded-full border border-neutral-700 text-amber-400 opacity-0 group-hover:opacity-100 transition duration-300">
                  <ZoomIn className="w-4 h-4" />
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded uppercase tracking-wider backdrop-blur-xs">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold text-neutral-100 mt-2">{item.title}</h3>
                  <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-neutral-950/80 text-neutral-300 hover:text-white p-2 rounded-full border border-neutral-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative h-[60vh] w-full">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="p-6 bg-neutral-950 border-t border-neutral-800">
              <h3 className="text-xl font-bold text-neutral-100">{selectedImage.title}</h3>
              <p className="text-sm text-neutral-400 mt-1">{selectedImage.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-neutral-800 bg-neutral-950 py-10 text-neutral-500 text-xs mt-20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div className="font-bold text-neutral-200 text-sm mb-1">
              ዳኒ Pictures & በርኖስ ኦርጋናይዘር
            </div>
            <p className="text-amber-500/80 mb-1">"የልባሞች ጅምር"</p>
            <p>መሃል ሜዳ | Mehal Meda, Ethiopia</p>
          </div>
          <div className="text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} Dani Pictures & Bernos Organizer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}