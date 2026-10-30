"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { navigation } from "@/constants/navigation";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-container">
      <div className="section-inner footer-inner">
        {/* Top Footer Row */}
        <div className="footer-top-row">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <Link href="#home" className="footer-logo">
              <Image
                src="/file.png"
                alt="DV Logo"
                width={36}
                height={36}
              />
              <span className="footer-brand-name">DEVANARAYANAN</span>
            </Link>
            <p className="footer-brand-tagline">
              Artificial Intelligence &amp; Machine Learning Engineer building intelligent, scalable, and impactful solutions.
            </p>
          </div>

          {/* Horizontal Navigation Links */}
          <div className="footer-nav-col">
            <ul className="footer-links-horizontal">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-divider" />

        {/* Bottom Footer Row */}
        <div className="footer-bottom-row">
          <p className="footer-copyright" suppressHydrationWarning>
            © {new Date().getFullYear()} Devanarayanan. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="footer-back-to-top"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
