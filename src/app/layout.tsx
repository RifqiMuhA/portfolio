import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Senior Frontend Engineer",
  description: "High-end portfolio website showcasing Next.js, Tailwind CSS, and Framer Motion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-neutral-200 bg-neutral-100 text-neutral-900 flex min-h-screen`}
      >
        <Sidebar />
        <MobileNav />
        {/* Main Content Area */}
        <main className="flex-1 w-full lg:ml-52 mt-16 lg:mt-0 p-4 min-h-screen box-border">
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm w-full h-full min-h-[calc(100vh-2rem)] overflow-y-auto overflow-x-hidden relative">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
