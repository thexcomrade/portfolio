"use client";

import Image from "next/image";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { navigation } from "@/constants/navigation";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const sectionIds = navigation
      .map((item) => item.href.replace("#", ""))
      .filter(Boolean);

    let rafId: number | null = null;

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // If user clicked a nav link, let smooth scroll finish without jittering
      if (isClickScrollingRef.current) return;

      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        // At the very top
        if (scrollY < 80) {
          setActiveSection("home");
          return;
        }

        // At the very bottom
        if (windowHeight + scrollY >= docHeight - 60) {
          setActiveSection("contact");
          return;
        }

        // Calculate which section is active based on viewport reading zone
        const triggerPoint = scrollY + Math.min(windowHeight * 0.35, 300);
        let currentActive = "home";

        for (const id of sectionIds) {
          const section = document.getElementById(id);
          if (section) {
            const top = section.offsetTop;
            if (triggerPoint >= top) {
              currentActive = id;
            }
          }
        }

        setActiveSection(currentActive);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [mobileMenuOpen]);

  const handleNavigationClick = (href: string) => {
    const id = href.replace("#", "");
    const target = document.getElementById(id);

    if (!target) {
      setMobileMenuOpen(false);
      return;
    }

    // Set immediate active section so the indicator glides seamlessly
    setActiveSection(id);
    setMobileMenuOpen(false);

    // Prevent scroll spy from fighting with smooth click scroll
    isClickScrollingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 900);

    const isHome = id === "home";
    const yOffset = isHome ? 0 : -72;
    const targetY = isHome
      ? 0
      : target.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <header
      className={`ref-site-header ${
        scrolled ? "ref-header-scrolled" : ""
      }`}
    >
      <div className="ref-navbar-container">
        <nav className="ref-navbar-glass" aria-label="Main navigation">
          {/* BRAND: LOGO + PREMIUM TYPOGRAPHY */}
          <Link
            href="#home"
            className="ref-navbar-brand"
            aria-label="Devanarayanan V S — Home"
            onClick={(event) => {
              event.preventDefault();
              handleNavigationClick("#home");
            }}
          >
            <span className="ref-brand-logo-box" aria-hidden="true">
              <Image
                src="/file.png"
                alt=""
                width={38}
                height={38}
                priority
                className="ref-brand-logo-image"
                sizes="38px"
              />
            </span>

            <span className="ref-brand-title">
              DEVANARAYANAN <span className="ref-brand-initials">V S</span>
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <ul className="ref-nav-menu" aria-label="Primary navigation">
            {navigation.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;

              return (
                <li key={item.name} className="ref-nav-item">
                  <Link
                    href={item.href}
                    className={`ref-nav-link ${
                      isActive ? "active" : ""
                    }`}
                    aria-current={isActive ? "location" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      handleNavigationClick(item.href);
                    }}
                  >
                    <span className="ref-nav-text">{item.name}</span>

                    {isActive && (
                      <motion.span
                        layoutId="ref-nav-indicator"
                        className="ref-nav-indicator"
                        transition={{
                          type: "spring",
                          stiffness: 340,
                          damping: 28,
                          mass: 0.75,
                        }}
                        aria-hidden="true"
                      >
                        <span className="ref-nav-indicator-glow" />
                        <span className="ref-nav-indicator-bar" />
                        <span className="ref-nav-indicator-dot" />
                      </motion.span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* RESUME + MOBILE MENU */}
          <div className="ref-navbar-right">
            <a
              href="/resume.pdf"
              download="Devanarayanan_Resume.pdf"
              className="ref-resume-btn"
              aria-label="Download resume"
            >
              <Download
                size={15}
                strokeWidth={2.2}
                aria-hidden="true"
              />
              <span>Resume</span>
            </a>

            <button
              type="button"
              className="ref-mobile-toggle"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="ref-mobile-navigation"
              onClick={() => setMobileMenuOpen((previous) => !previous)}
            >
              {mobileMenuOpen ? (
                <X size={21} aria-hidden="true" />
              ) : (
                <Menu size={21} aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {/* MOBILE NAVIGATION */}
        {mobileMenuOpen && (
          <div
            id="ref-mobile-navigation"
            className="ref-mobile-drawer"
          >
            <ul className="ref-mobile-menu">
              {navigation.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = activeSection === id;

                return (
                  <li key={item.name} className="ref-mobile-item">
                    <Link
                      href={item.href}
                      className={`ref-mobile-link ${
                        isActive ? "active" : ""
                      }`}
                      aria-current={isActive ? "location" : undefined}
                      onClick={(event) => {
                        event.preventDefault();
                        handleNavigationClick(item.href);
                      }}
                    >
                      <span>{item.name}</span>
                      {isActive && (
                        <span
                          className="ref-mobile-indicator-dot"
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="ref-mobile-actions">
              <a
                href="/resume.pdf"
                download="Devanarayanan_Resume.pdf"
                className="ref-mobile-resume"
              >
                <Download size={16} aria-hidden="true" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
