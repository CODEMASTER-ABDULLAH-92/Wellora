import type { Metadata } from "next";
import "./globals.css";
import ReactLenis from "lenis/react";
import ReduxProvider from "../app/StoreProvider"
import 'lenis/dist/lenis.css'




export const metadata: Metadata = {
  title: "Orva — AI Health Platform",
  description: "Your health journey, guided by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` h-full antialiased`}
    >

      <body className="">
        <ReduxProvider>
        {children}

        </ReduxProvider>

        <ReactLenis root />

      </body>
    </html>
  );
}







