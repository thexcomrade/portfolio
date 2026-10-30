"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Briefcase,
  Cpu,
  Download,
  Home as HomeIcon,
  Mail,
  Menu,
  Palette,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navigation } from "@/constants/navigation";

const navIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  home: HomeIcon,
  about: User,
  skills: Cpu,
  projects: Briefcase,
  designs: Palette,
  experience: Sparkles,
  achievements: Award,
  contact: Mail,
};

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
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

      // When the user scrolls, clear manual hover so scroll-spy actively drives the sliding capsule
      setHoveredSection(null);

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
        if (windowHeight + scrollY >= docHeight - 80) {
          setActiveSection("contact");
          return;
        }

        // Calculate which section is active based on exact viewport reading zone (40% down)
        const midViewport = windowHeight * 0.4;
        let currentActive = "home";

        for (const id of sectionIds) {
          const section = document.getElementById(id);
          if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= midViewport && rect.bottom > midViewport) {
              currentActive = id;
              break;
            } else if (rect.top <= midViewport) {
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
    setHoveredSection(null);
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

          {/* DESKTOP DOCK NAVIGATION (Sliding Fluid Orange Capsule Pill) */}
          <nav
            className="ref-dock-menu"
            role="menubar"
            aria-label="Primary navigation"
            onMouseLeave={() => setHoveredSection(null)}
          >
            {navigation.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              const isCurrent =
                hoveredSection !== null ? hoveredSection === id : isActive;
              const IconComponent = navIcons[id] || HomeIcon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`ref-dock-link ${isActive ? "active" : ""} ${
                    isCurrent ? "current" : ""
                  }`}
                  aria-current={isActive ? "location" : undefined}
                  onMouseEnter={() => setHoveredSection(id)}
                  onFocus={() => setHoveredSection(id)}
                  onBlur={() => setHoveredSection(null)}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavigationClick(item.href);
                  }}
                  title={item.name}
                >
                  {isCurrent && (
                    <motion.div
                      layoutId="activeOrangeCapsule"
                      className="ref-orange-capsule"
                      transition={{
                        type: "spring",
                        stiffness: 460,
                        damping: 32,
                        mass: 0.6,
                      }}
                    />
                  )}

                  <span className="ref-dock-icon" aria-hidden="true">
                    <IconComponent size={15} />
                  </span>

                  <span className="ref-dock-title">{item.name}</span>
                </Link>
              );
            })}
          </nav>

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
