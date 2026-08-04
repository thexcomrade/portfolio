"use client";

import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { navigation } from "@/constants/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sectionIds = navigation.map((n) => n.href.replace("#", ""));
      const scrollPos = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-4 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "header-scrolled" : ""}`}>
      <div className="container">
        <nav className="navbar-glass">
          {/* Logo */}
          <Link href="#home" className="logo">
            <Image
              src="/file.svg"
              alt="DV Logo"
              width={40}
              height={40}
              priority
            />
          </Link>

          {/* Navigation */}
          <ul className="nav-menu">
            {navigation.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`nav-link ${isActive ? "active" : ""}`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Resume Button */}
          <div className="navbar-right">
            <a
              href="/resume.pdf"
              download
              className="resume-btn"
              aria-label="Download Resume"
            >
              <Download size={15} />
              <span>Resume</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}