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
  title: "Devanarayanan V S | AI & ML Engineer",
  description: "Ultra-realistic AI & ML Engineer Portfolio featuring 3D holographic innovations.",
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