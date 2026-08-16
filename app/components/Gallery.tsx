"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageItem {
  id: string;
  url: string;
  title?: string;
  category?: string;
}

interface GalleryProps {
  images: ImageItem[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    ...Array.from(
      new Set(images.map((img) => img.category).filter(Boolean))
    ) as string[],
  ];

  const filteredImages =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);

  const shareOnFacebook = (url: string) => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareOnTwitter = (url: string, title?: string) => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title || "Check this out!")}`,
      "_blank"
    );
  };

  const shareOnTelegram = (url: string, title?: string) => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title || "Check this out!")}`,
      "_blank"
    );
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Category Filter Buttons */}
      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "bg-amber-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Image
              src={image.url}
              alt={image.title || "Gallery image"}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              {image.title && (
                <p className="text-white font-medium text-sm translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {image.title}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-transparent flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-amber-400 p-2 text-xl font-bold transition-colors"
            >
              ✕ Close
            </button>

            <div className="relative w-full h-[65vh] rounded-lg overflow-hidden">
              <Image
                src={selectedImage.url}
                alt={selectedImage.title || "Selected gallery image"}
                fill
                className="object-contain"
                priority
              />
            </div>

            {selectedImage.title && (
              <p className="text-white text-center mt-3 text-lg font-medium">
                {selectedImage.title}
              </p>
            )}

            {/* Social Sharing */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-gray-300 text-sm font-medium">Share:</span>
              <button
                onClick={() => shareOnFacebook(selectedImage.url)}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md transition-colors"
              >
                Facebook
              </button>
              <button
                onClick={() => shareOnTwitter(selectedImage.url, selectedImage.title)}
                className="px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold rounded-md transition-colors"
              >
                Twitter (X)
              </button>
              <button
                onClick={() => shareOnTelegram(selectedImage.url, selectedImage.title)}
                className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded-md transition-colors"
              >
                Telegram
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}