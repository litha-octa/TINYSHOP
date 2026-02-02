import { Space_Mono, Crimson_Text } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const crimsonText = Crimson_Text({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TINYSHOP — Curated Product Catalog",
  description: "Discover premium products with refined taste",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${crimsonText.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
