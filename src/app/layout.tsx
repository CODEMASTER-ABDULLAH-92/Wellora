import type { Metadata } from "next";
import "./globals.css";
import ReactLenis from "lenis/react";
import ReduxProvider from "../app/StoreProvider";
import 'lenis/dist/lenis.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Algo.Design — Master DSA & System Design",
  description: "Master data structures, algorithms, and system design with expert-curated content, AI-powered feedback, and a community of top-tier engineers.",
  keywords: "DSA, system design, algorithms, data structures, coding interview, FAANG, tech interview preparation",
  openGraph: {
    title: "Algo.Design — Master DSA & System Design",
    description: "Master data structures, algorithms, and system design with expert-curated content, AI-powered feedback, and a community of top-tier engineers.",
    type: "website",
    url: "https://algodesign.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Algo.Design — Master DSA & System Design",
    description: "Master data structures, algorithms, and system design with expert-curated content, AI-powered feedback, and a community of top-tier engineers.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <ReduxProvider>
          <Navbar />
          <main className="flex-1 pt-[76px] sm:pt-[76px]">
            {children}
          </main>
          <Footer />
        </ReduxProvider>
        <ReactLenis root />
      </body>
    </html>
  );
}