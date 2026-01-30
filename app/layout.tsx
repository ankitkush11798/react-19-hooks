import { Sidebar } from "@/components/navigation/Sidebar";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "React Observatory",
  description: "Interactive React Hooks & APIs Documentation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="antialiased flex min-h-screen bg-[var(--bg-deep)] text-[var(--text-primary)]">
        <Sidebar />
        <main className="flex-1 ml-64 min-h-screen relative z-0">
          <div className="p-8 max-w-7xl mx-auto md:p-12 lg:p-16">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
