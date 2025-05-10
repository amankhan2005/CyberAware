import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
// import PrelineScript from "@/components/PrelineScript";
// import ImageSlider from "@/components/ImageSlider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CyberAware - Stay Safe Online",
  description: "CyberAware educates and empowers you to fight cybercrime and stay secure online.",
  icons: {
    icon: "/favicon.ico ",   // ✅ added favicon here
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-black`}
      >
        <Toaster position="top-center" />
        {/* <ImageSlider /> */}
        {/* <Navbar /> */}
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
