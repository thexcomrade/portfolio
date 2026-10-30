"use client";

import Image from "next/image";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { navigation } from "@/constants/navigation";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const sectionIds = navigation
      .map((item) => item.href.replace("#", ""))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );

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

    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches
        ? "auto"
        : "smooth",
      block: "start",
    });

    setActiveSection(id);
    setMobileMenuOpen(false);
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
                          stiffness: 420,
                          damping: 32,
                        }}
                        aria-hidden="true"
                      >
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
                          className="ref-mobile-dot"
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}

              <li className="ref-mobile-resume-item">
                <a
                  href="/resume.pdf"
                  download="Devanarayanan_Resume.pdf"
                  className="ref-resume-btn ref-mobile-resume-btn"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Download
                    size={15}
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
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