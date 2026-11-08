"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Palette,
  X,
  Sparkles,
  Maximize2,
  LayoutGrid,
  Layers,
} from "lucide-react";
import {
  posters,
  posterCategories,
  type PosterCategory,
  type PosterItem,
} from "@/data/posters";

export default function Posters() {
  const [selectedCategory, setSelectedCategory] =
    useState<PosterCategory>("All Posters");
  const [activePosterIndex, setActivePosterIndex] = useState(0);
  const [lightboxPoster, setLightboxPoster] = useState<PosterItem | null>(null);
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const [isMobile, setIsMobile] = useState(false);

  // Touch tracking for mobile swipe gestures
  const touchStartX = useRef<number | null>(null);
  const touchCurrentX = useRef<number | null>(null);

  // Screen width detection for responsive 3D transforms
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredPosters = useMemo(() => {
    if (selectedCategory === "All Posters") return posters;
    return posters.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const safeActiveIndex =
    activePosterIndex < filteredPosters.length ? activePosterIndex : 0;
  const activePoster: PosterItem =
    filteredPosters[safeActiveIndex] || filteredPosters[0] || posters[0];

  const showNext = useCallback(() => {
    if (filteredPosters.length <= 1) return;
    setActivePosterIndex((prev) => (prev + 1) % filteredPosters.length);
  }, [filteredPosters.length]);

  const showPrev = useCallback(() => {
    if (filteredPosters.length <= 1) return;
    setActivePosterIndex(
      (prev) => (prev - 1 + filteredPosters.length) % filteredPosters.length
    );
  }, [filteredPosters.length]);

  // Touch swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchCurrentX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchCurrentX.current === null) return;
    const diff = touchStartX.current - touchCurrentX.current;
    const threshold = 40; // minimum swipe distance

    if (diff > threshold) {
      showNext();
    } else if (diff < -threshold) {
      showPrev();
    }

    touchStartX.current = null;
    touchCurrentX.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxPoster) {
        if (e.key === "Escape") setLightboxPoster(null);
        if (e.key === "ArrowRight") {
          const curIdx = filteredPosters.findIndex(
            (p) => p.id === lightboxPoster.id
          );
          if (curIdx !== -1) {
            const nextIdx = (curIdx + 1) % filteredPosters.length;
            setLightboxPoster(filteredPosters[nextIdx]);
          }
        }
        if (e.key === "ArrowLeft") {
          const curIdx = filteredPosters.findIndex(
            (p) => p.id === lightboxPoster.id
          );
          if (curIdx !== -1) {
            const prevIdx =
              (curIdx - 1 + filteredPosters.length) % filteredPosters.length;
            setLightboxPoster(filteredPosters[prevIdx]);
          }
        }
        return;
      }

      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxPoster, filteredPosters, showNext, showPrev]);

  // Lock body scroll when lightbox modal is open
  useEffect(() => {
    if (lightboxPoster) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxPoster]);

  return (
    <section id="designs" className="page-section posters-section">
      <div className="section-inner">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Palette size={14} className="badge-icon" aria-hidden="true" />
            <span>VISUAL ARTS &amp; POSTER DESIGN</span>
          </div>

          <h2 className="section-title">
            Creative <span>Photoshop &amp; Keyart</span>
          </h2>

          <p className="section-subtitle">
            Beyond code, I craft high-impact visual media in Adobe Photoshop — blending
            digital surrealism, cinematic lighting, brutalist typography, and 3D
            vectors into poster designs.
          </p>
        </div>

        {/* Controls Bar: Category Filters & Desktop View Switcher */}
        <div className="posters-controls-bar">
          {/* Category Filter Pills */}
          <div
            className="posters-filter-bar"
            role="tablist"
            aria-label="Filter poster categories"
          >
            {posterCategories.map((cat) => {
              const isActive = selectedCategory === cat;
              const count =
                cat === "All Posters"
                  ? posters.length
                  : posters.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`poster-filter-pill ${isActive ? "active" : ""}`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setActivePosterIndex(0);
                  }}
                >
                  <span>{cat}</span>
                  <span className="poster-pill-count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop View Switcher (Hidden on Mobile) */}
          <div className="posters-view-switcher" role="group" aria-label="Gallery view mode">
            <button
              type="button"
              className={`view-switch-btn ${viewMode === "carousel" ? "active" : ""}`}
              onClick={() => setViewMode("carousel")}
              aria-label="Switch to 3D Carousel view"
              title="3D Carousel View"
            >
              <Layers size={14} aria-hidden="true" />
              <span>3D Carousel</span>
            </button>
            <button
              type="button"
              className={`view-switch-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              aria-label="Switch to Grid Gallery view"
              title="Grid Gallery View"
            >
              <LayoutGrid size={14} aria-hidden="true" />
              <span>Grid</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            VIEW MODE 1: THE INLINE 3D CAROUSEL (Default on mobile)
        ======================================================== */}
        {(viewMode === "carousel" || isMobile) && (
          <div
            className="posters-carousel-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="region"
            aria-roledescription="carousel"
            aria-label="3D Creative Posters Carousel"
          >
            {/* Nav Arrows */}
            <button
              type="button"
              className="carousel-nav-arrow carousel-nav-prev"
              onClick={showPrev}
              aria-label="Previous poster"
              title="Previous Poster (Left Arrow)"
            >
              <ChevronLeft size={24} aria-hidden="true" />
            </button>

            <button
              type="button"
              className="carousel-nav-arrow carousel-nav-next"
              onClick={showNext}
              aria-label="Next poster"
              title="Next Poster (Right Arrow)"
            >
              <ChevronRight size={24} aria-hidden="true" />
            </button>

            {/* 3D Perspective Scene */}
            <div className="carousel-scene">
              <div className="carousel-a3d">
                {filteredPosters.map((poster, i) => {
                  const total = filteredPosters.length;
                  let diff = i - activePosterIndex;
                  if (diff > total / 2) diff -= total;
                  if (diff < -total / 2) diff += total;

                  const isCurrent = diff === 0;
                  const absDiff = Math.abs(diff);

                  // Responsive spacing constants
                  const spacing = isMobile ? 170 : 260;
                  const zStep = isMobile ? -110 : -155;
                  const rotStep = isMobile ? -22 : -25;

                  let tx = 0;
                  let tz = 0;
                  let ry = 0;
                  let scale = 1;
                  let blurPx = 0;
                  let brightness = 1;
                  let opacity = 1;

                  if (isCurrent) {
                    tx = 0;
                    tz = 0;
                    ry = 0;
                    scale = 1.05;
                    blurPx = 0;
                    brightness = 1;
                    opacity = 1;
                  } else if (absDiff === 1) {
                    tx = diff * spacing;
                    tz = zStep;
                    ry = diff * rotStep;
                    scale = 0.86;
                    blurPx = 3;
                    brightness = 0.6;
                    opacity = 0.8;
                  } else if (absDiff === 2) {
                    tx = diff * (spacing * 0.92);
                    tz = zStep * 1.9;
                    ry = diff * (rotStep * 1.4);
                    scale = 0.72;
                    blurPx = 6;
                    brightness = 0.38;
                    opacity = 0.45;
                  } else {
                    tx = diff * (spacing * 0.85);
                    tz = -450;
                    ry = diff * -45;
                    scale = 0.55;
                    blurPx = 10;
                    brightness = 0.15;
                    opacity = 0;
                  }

                  const isVisible = absDiff <= 2;

                  return (
                    <div
                      key={poster.id}
                      className={`carousel-3d-card ${isCurrent ? "is-center" : "is-blurred"}`}
                      style={{
                        transform: `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
                        filter: `blur(${blurPx}px) brightness(${brightness})`,
                        opacity: isVisible ? opacity : 0,
                        pointerEvents: isVisible ? "auto" : "none",
                        zIndex: isCurrent ? 50 : Math.max(1, 30 - absDiff),
                      }}
                      onClick={() => {
                        if (isCurrent) {
                          setLightboxPoster(poster);
                        } else {
                          setActivePosterIndex(i);
                        }
                      }}
                      role="button"
                      tabIndex={isCurrent ? 0 : -1}
                      aria-label={`${poster.title} - ${poster.category} (${isCurrent ? "Click to view full size" : "Click to select"})`}
                      title={isCurrent ? "Click to inspect full resolution" : `Jump to ${poster.title}`}
                    >
                      <div className="carousel-card-inner">
                        <Image
                          src={poster.src}
                          alt={poster.title}
                          fill
                          sizes="(max-width: 640px) 240px, (max-width: 1024px) 300px, 340px"
                          priority={isCurrent && activePosterIndex === 0}
                          className="carousel-card-img"
                        />

                        {/* Active Center Card Highlight & Tap Hint */}
                        {isCurrent && (
                          <>
                            <div className="carousel-active-badge">
                              <span className="badge-pulse-dot" />
                              <span>ART #{String(poster.id).padStart(2, "0")}</span>
                            </div>

                            <div className="carousel-expand-hint" aria-hidden="true">
                              <Maximize2 size={13} />
                              <span>Tap to expand</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Caption HUD & Pagination Scrubber */}
            <div className="carousel-bottom-hud">
              <div className="hud-info-left">
                <span className="hud-category-pill">{activePoster.category}</span>
                <h3 className="hud-title">{activePoster.title}</h3>
                <p className="hud-desc">{activePoster.description}</p>
              </div>

              {/* Pagination Counter */}
              <div className="carousel-pagination-badge" aria-live="polite">
                <span className="hud-accent-dot" />
                <span className="counter-current">
                  {String(activePosterIndex + 1).padStart(2, "0")}
                </span>
                <span className="counter-sep">/</span>
                <span className="counter-total">
                  {String(filteredPosters.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Quick-Jump Dot Track */}
            <div className="carousel-dots-track" role="tablist" aria-label="Jump to poster">
              {filteredPosters.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === activePosterIndex}
                  className={`carousel-dot ${idx === activePosterIndex ? "active" : ""}`}
                  onClick={() => setActivePosterIndex(idx)}
                  aria-label={`Go to poster ${idx + 1}: ${p.title}`}
                  title={p.title}
                />
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW MODE 2: THE DESKTOP GRID (Available when toggled)
        ======================================================== */}
        {viewMode === "grid" && !isMobile && (
          <div className="poster-uniform-grid">
            {filteredPosters.map((poster) => {
              const paddedId = String(poster.id).padStart(2, "0");

              return (
                <article
                  key={poster.id}
                  className="poster-premium-frame group"
                  onClick={() => setLightboxPoster(poster)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Inspect ${poster.title} in full resolution`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setLightboxPoster(poster);
                    }
                  }}
                >
                  <span className="premium-bracket bracket-tl" aria-hidden="true" />
                  <span className="premium-bracket bracket-tr" aria-hidden="true" />
                  <span className="premium-bracket bracket-bl" aria-hidden="true" />
                  <span className="premium-bracket bracket-br" aria-hidden="true" />

                  <div className="premium-frame-top">
                    <div className="premium-frame-id">
                      <span className="premium-dot" />
                      <span>ART #{paddedId}</span>
                    </div>
                    <span className="premium-category-tag">{poster.category}</span>
                  </div>

                  <div className="premium-image-wrap">
                    <Image
                      src={poster.src}
                      alt={poster.title}
                      fill
                      sizes="(max-width: 1440px) 33vw, 25vw"
                      className="premium-poster-img"
                      loading="lazy"
                    />

                    <div className="premium-hover-overlay" aria-hidden="true">
                      <div className="premium-zoom-pill">
                        <Sparkles size={15} />
                        <span>View Art</span>
                      </div>
                    </div>
                  </div>

                  <div className="premium-frame-bottom">
                    <div className="premium-caption-info">
                      <h3 className="premium-caption-title">{poster.title}</h3>
                      <p className="premium-caption-desc">{poster.description}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Section Footer Meta */}
        <div className="posters-footer-meta">
          <div className="posters-tooling">
            <span className="tooling-label">DESIGN STACK</span>
            <span className="tooling-pill">Adobe Photoshop CC</span>
            <span className="tooling-pill">Adobe Lightroom</span>
            <span className="tooling-pill">Picsart</span>
            <span className="tooling-pill">Snapseed</span>
          </div>
          <p className="posters-note">
            Available for visual identity, album keyart, event branding, and creative poster commissions.
          </p>
        </div>
      </div>

      {/* ========================================================
          ACCESSIBLE FULL-RESOLUTION LIGHTBOX MODAL
      ======================================================== */}
      {lightboxPoster !== null && (
        <div
          className="poster-lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`Viewing ${lightboxPoster.title} in full resolution`}
          onClick={() => setLightboxPoster(null)}
        >
          {/* Lightbox Shell */}
          <div
            className="poster-lightbox-shell"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="poster-lightbox-header">
              <div className="poster-lightbox-meta">
                <span className="lightbox-category">{lightboxPoster.category}</span>
                <h3 className="lightbox-title">{lightboxPoster.title}</h3>
              </div>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={() => setLightboxPoster(null)}
                aria-label="Close full size view (Escape)"
                title="Close (Esc)"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Image Stage */}
            <div className="poster-lightbox-stage">
              <Image
                src={lightboxPoster.fullSrc || lightboxPoster.src}
                alt={lightboxPoster.title}
                width={lightboxPoster.width}
                height={lightboxPoster.height}
                className="poster-lightbox-img"
                priority
              />
            </div>

            {/* Footer Caption */}
            <div className="poster-lightbox-footer">
              <p className="lightbox-desc">{lightboxPoster.description}</p>
              <span className="lightbox-counter">
                ART #{String(lightboxPoster.id).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
