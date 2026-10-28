"use client";

import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

import { navigation } from "@/constants/navigation";

export default function Navbar() {
  const [activeSection, setActiveSection] =
    useState("home");

  const [scrolled, setScrolled] =
    useState(false);

  useEffect(() => {
    /* =========================================================
       SCROLL STATE
    ========================================================= */

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    handleScroll();

    /* =========================================================
       ACTIVE SECTION OBSERVER
    ========================================================= */

    const sectionIds = navigation
      .map((item) =>
        item.href.replace("#", "")
      )
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        /*
         * Sort intersecting sections by their
         * position in the document so the active
         * navigation state remains predictable.
         */
        const visibleSections = entries
          .filter(
            (entry) =>
              entry.isIntersecting
          )
          .sort(
            (a, b) =>
              a.boundingClientRect.top -
              b.boundingClientRect.top
          );

        if (
          visibleSections.length > 0
        ) {
          setActiveSection(
            visibleSections[0].target.id
          );
        }
      },
      {
        root: null,

        /*
         * Activates a section when it enters
         * the upper-middle area of the viewport.
         */
        rootMargin:
          "-18% 0px -58% 0px",

        threshold: [0.05, 0.1, 0.25],
      }
    );

    /* =========================================================
       OBSERVE SECTIONS
    ========================================================= */

    sectionIds.forEach((id) => {
      const section =
        document.getElementById(id);

      if (section) {
        observer.observe(section);
      }
    });

    /* =========================================================
       CLEANUP
    ========================================================= */

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      observer.disconnect();
    };
  }, []);

  /* =========================================================
     NAVIGATION CLICK
  ========================================================= */

  const handleNavigationClick = (
    href: string
  ) => {
    const id =
      href.replace("#", "");

    const target =
      document.getElementById(id);

    if (!target) {
      return;
    }

    /*
     * Manually scroll so the browser uses
     * the portfolio's smooth scrolling behavior.
     */
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    /*
     * Update immediately instead of waiting
     * for IntersectionObserver.
     */
    setActiveSection(id);
  };

  return (
    <header
      className={`site-header ${
        scrolled
          ? "header-scrolled"
          : ""
      }`}
    >
      <div className="container">
        <nav
          className="navbar-glass"
          aria-label="Main navigation"
        >
          {/* =====================================================
              LOGO
          ===================================================== */}

          <Link
            href="#home"
            className="logo"
            aria-label="Go to Home"
            onClick={() =>
              handleNavigationClick(
                "#home"
              )
            }
          >
            <Image
              src="/file.svg"
              alt="DV Logo"
              width={40}
              height={40}
              priority
              className="navbar-logo-img"
            />
          </Link>

          {/* =====================================================
              NAVIGATION
          ===================================================== */}

          <ul
            className="nav-menu"
            aria-label="Primary navigation"
          >
            {navigation.map(
              (item) => {
                const id =
                  item.href.replace(
                    "#",
                    ""
                  );

                const isActive =
                  activeSection === id;

                return (
                  <li
                    key={item.name}
                    className="nav-item"
                  >
                    <Link
                      href={item.href}
                      className={`nav-link ${
                        isActive
                          ? "active"
                          : ""
                      }`}
                      aria-current={
                        isActive
                          ? "page"
                          : undefined
                      }
                      onClick={() =>
                        handleNavigationClick(
                          item.href
                        )
                      }
                    >
                      <span className="nav-link-text">
                        {item.name}
                      </span>

                      {isActive && (
                        <span
                          className="nav-active-indicator"
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </li>
                );
              }
            )}
          </ul>

          {/* =====================================================
              RIGHT SIDE
          ===================================================== */}

          <div className="navbar-right">
            <a
              href="/resume.pdf"
              download
              className="resume-btn"
              aria-label="Download Resume"
            >
              <Download
                size={15}
                strokeWidth={2}
                aria-hidden="true"
              />

              <span>
                Resume
              </span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}