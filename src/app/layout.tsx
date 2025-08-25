import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "testy project",
  description: "create test project nextjs",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="fa">
      <body>
        <Navbar />

        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
