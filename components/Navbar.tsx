"use client";

import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation } from "@/constants/navigation";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    /* =========================================================
       SCROLL STATE
    ========================================================= */
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    /* =========================================================
       ACTIVE SECTION OBSERVER
    ========================================================= */
    const sectionIds = navigation
      .map((item) => item.href.replace("#", ""))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-18% 0px -58% 0px",
        threshold: [0.05, 0.1, 0.25],
      }
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavigationClick = (href: string) => {
    const id = href.replace("#", "");
    const target = document.getElementById(id);
    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`ref-site-header ${scrolled ? "ref-header-scrolled" : ""}`}>
      <div className="ref-navbar-container">
        <nav className="ref-navbar-glass" aria-label="Main navigation">
          {/* =====================================================
              LEFT: LOGO + DEVANARAYANAN V S
          ====================================================== */}
          <Link
            href="#home"
            className="ref-navbar-brand"
            aria-label="Devanarayanan V S Portfolio Home"
            onClick={() => handleNavigationClick("#home")}
          >
            {/* Stylized Glowing Orange "D" Monogram */}
            <div className="ref-brand-logo-box" aria-hidden="true">
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ref-brand-svg"
              >
                <defs>
                  <linearGradient id="brandOrange" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff8c38" />
                    <stop offset="100%" stopColor="#e54704" />
                  </linearGradient>
                  <filter id="brandGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#ff7a18" floodOpacity="0.6" />
                  </filter>
                </defs>
                <rect
                  x="1.5"
                  y="1.5"
                  width="31"
                  height="31"
                  rx="9"
                  fill="#11141e"
                  stroke="rgba(255, 122, 24, 0.35)"
                  strokeWidth="1.2"
                />
                <path
                  d="M10 8.5H17.5C22.1944 8.5 25.5 12 25.5 17C25.5 22 22.1944 25.5 17.5 25.5H10V8.5Z"
                  fill="url(#brandOrange)"
                  filter="url(#brandGlow)"
                />
                <path
                  d="M14.5 12.5H17C19.5 12.5 21.2 14.3 21.2 17C21.2 19.7 19.5 21.5 17 21.5H14.5V12.5Z"
                  fill="#11141e"
                />
                <circle cx="17.2" cy="17" r="1.8" fill="#ff8c38" />
              </svg>
            </div>
            <span className="ref-brand-title">DEVANARAYANAN V S</span>
          </Link>

          {/* =====================================================
              CENTER: NAVIGATION LINKS
          ====================================================== */}
          <ul className="ref-nav-menu" aria-label="Primary navigation">
            {navigation.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;

              return (
                <li key={item.name} className="ref-nav-item">
                  <Link
                    href={item.href}
                    className={`ref-nav-link ${isActive ? "active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigationClick(item.href);
                    }}
                  >
                    <span className="ref-nav-text">{item.name}</span>
                    {isActive && (
                      <span className="ref-nav-indicator" aria-hidden="true">
                        <span className="ref-nav-indicator-dot" />
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* =====================================================
              RIGHT: RESUME BUTTON & MOBILE TOGGLE
          ====================================================== */}
          <div className="ref-navbar-right">
            <a
              href="/resume.pdf"
              download="Devanarayanan_Resume.pdf"
              className="ref-resume-btn"
              aria-label="Download Resume"
            >
              <Download size={14} strokeWidth={2.4} aria-hidden="true" />
              <span>Resume</span>
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              className="ref-mobile-toggle"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* =====================================================
            MOBILE SLIDE-DOWN DRAWER
        ====================================================== */}
        {mobileMenuOpen && (
          <div className="ref-mobile-drawer" role="dialog" aria-label="Mobile Navigation">
            <ul className="ref-mobile-menu">
              {navigation.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = activeSection === id;

                return (
                  <li key={item.name} className="ref-mobile-item">
                    <Link
                      href={item.href}
                      className={`ref-mobile-link ${isActive ? "active" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigationClick(item.href);
                      }}
                    >
                      <span>{item.name}</span>
                      {isActive && <span className="ref-mobile-dot" aria-hidden="true" />}
                    </Link>
                  </li>
                );
              })}
              <li className="ref-mobile-resume-item">
                <a
                  href="/resume.pdf"
                  download="Devanarayanan_Resume.pdf"
                  className="ref-resume-btn w-full justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Download size={14} strokeWidth={2.4} aria-hidden="true" />
                  <span>Download Resume</span>
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
