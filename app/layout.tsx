import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/sections/root/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ['latin'],       // required
  weight: ['400', '500', '600', '700'], // choose weights you need
  variable: '--font-poppins', // optional, for CSS variable usage
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Think Write",
  description: "A modern blogging platform to write, publish, and share ideas with rich content and a clean reading experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${poppins.className} antialiased bg-dirty text-zinc-700`}
      >

      
      
            {children}
   
       
      </body>
    </html>
  );
}
