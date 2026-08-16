import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ዳኒ Pictures & በርኖስ ኦርጋናይዘር",
  description: "የልባሞች ጅምር - በመሃል ሜዳ የሚገኝ የፎቶ፣ ቪዲዮ እና የዲኮር ማዕከል",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="am" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between selection:bg-amber-500 selection:text-neutral-950 font-sans`}
      >
       

        {/* የገጾቹ ዋና ይዘት */}
        <main className="flex-grow">{children}</main>

        {/* የታችኛው Footer (ሶሻል ሚዲያ እና አድራሻዎችን የያዘው) */}
        <Footer />
      </body>
    </html>
  );
}