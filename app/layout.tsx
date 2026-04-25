import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "+Sorriso | Gestão Odontológica",
  description: "Sistema moderno para clínicas odontológicas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full bg-slate-50">
      <body className={`${inter.className} min-h-screen text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
