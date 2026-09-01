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
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const sectionIds = navigation.map((n) => n.href.replace("#", ""));
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -50% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
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