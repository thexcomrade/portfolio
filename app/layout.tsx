import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SpaceBackground from "@/components/SpaceBackground";
import WelcomePopup from "@/components/WelcomePopup";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "Devanarayanan | AI & ML Engineer",
  description: "Modern AI & ML Engineer Portfolio featuring cutting-edge artificial intelligence, machine learning, and deep learning engineering solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <SpaceBackground />
        <WelcomePopup />
        {children}
      </body>
    </html>
  );
}