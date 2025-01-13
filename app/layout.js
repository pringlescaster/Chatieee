"use client"; // This line needs to be at the top of your layout

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // List of routes where the Sidebar should NOT appear
  const routesToExcludeSidebar = ["/", "/signup"]; // Add more routes as needed

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex">
          {!routesToExcludeSidebar.includes(pathname) && <Sidebar />}
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
