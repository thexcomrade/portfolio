import type { Metadata } from "next";
import "./globals.css";
import SpaceBackground from "@/components/SpaceBackground";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;800;900&family=Montserrat:wght@800;900&family=Space+Grotesk:wght@500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SpaceBackground />
        {children}
      </body>
    </html>
  );
}
