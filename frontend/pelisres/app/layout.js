import { Geist, Geist_Mono, Alexandria } from "next/font/google";

import "./globals.css";
import "flowbite";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["latin"],
  weight: "400",
});


export const metadata = {
  title: "PelisRes",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${alexandria.variable} antialiased`}>
          {children}
      </body>
    </html>
  );
}
