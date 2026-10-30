"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Maximize2,
  Palette,
  Play,
  Pause,
  X,
  Sparkles,
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
  const [activePosterIndex, setActivePosterIndex] = useState<number | null>(
    null
  );
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const autoSpinTimerRef = useRef<NodeJS.Timeout | null>(null);

  const filteredPosters = useMemo(() => {
    if (selectedCategory === "All Posters") return posters;
    return posters.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const activePoster: PosterItem | null = useMemo(() => {
    if (activePosterIndex === null) return null;
    return filteredPosters[activePosterIndex] || null;
  }, [activePosterIndex, filteredPosters]);

  const openCarousel = useCallback((index: number) => {
    setActivePosterIndex(index);
    setIsAutoSpinning(false);
    document.body.style.overflow = "hidden";
  }, []);

  const closeCarousel = useCallback(() => {
    setActivePosterIndex(null);
    setIsAutoSpinning(false);
    document.body.style.overflow = "";
  }, []);

  const showNext = useCallback(() => {
    if (activePosterIndex === null || filteredPosters.length === 0) return;
    setActivePosterIndex((prev) =>
      prev === null ? 0 : (prev + 1) % filteredPosters.length
    );
  }, [activePosterIndex, filteredPosters.length]);

  const showPrev = useCallback(() => {
    if (activePosterIndex === null || filteredPosters.length === 0) return;
    setActivePosterIndex((prev) =>
      prev === null
        ? 0
        : (prev - 1 + filteredPosters.length) % filteredPosters.length
    );
  }, [activePosterIndex, filteredPosters.length]);

  // Keyboard navigation
  useEffect(() => {
    if (activePosterIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCarousel();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === " ") {
        e.preventDefault();
        setIsAutoSpinning((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePosterIndex, closeCarousel, showNext, showPrev]);

  // Optional auto-spin timer
  useEffect(() => {
    if (!isAutoSpinning || activePosterIndex === null) {
      if (autoSpinTimerRef.current) clearInterval(autoSpinTimerRef.current);
      return;
    }

    autoSpinTimerRef.current = setInterval(() => {
      setActivePosterIndex((prev) =>
        prev === null ? 0 : (prev + 1) % filteredPosters.length
      );
    }, 3000);

    return () => {
      if (autoSpinTimerRef.current) clearInterval(autoSpinTimerRef.current);
    };
  }, [isAutoSpinning, activePosterIndex, filteredPosters.length]);

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
            Beyond code, I craft high-impact visual media in Adobe Photoshop—blending
            digital surrealism, cinematic lighting, brutalist typography, and 3D
            vectors into gallery-grade poster designs.
          </p>
        </div>

        {/* Filter Pills */}
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
                  setActivePosterIndex(null);
                }}
              >
                <span>{cat}</span>
                <span className="poster-pill-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Premium 3:4 Poster Grid */}
        <div className="poster-uniform-grid">
          {filteredPosters.map((poster, index) => {
            const paddedId = String(poster.id).padStart(2, "0");

            return (
              <article
                key={poster.id}
                className="poster-premium-frame group"
                onClick={() => openCarousel(index)}
                tabIndex={0}
                role="button"
                aria-label={`Open 3D Carousel for ${poster.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openCarousel(index);
                  }
                }}
              >
                {/* Precision Cyber Corner Brackets */}
                <span className="premium-bracket bracket-tl" aria-hidden="true" />
                <span className="premium-bracket bracket-tr" aria-hidden="true" />
                <span className="premium-bracket bracket-bl" aria-hidden="true" />
                <span className="premium-bracket bracket-br" aria-hidden="true" />

                {/* Top Glass Micro-Bar */}
                <div className="premium-frame-top">
                  <div className="premium-frame-id">
                    <span className="premium-dot" />
                    <span>ART #{paddedId}</span>
                  </div>
                  <span className="premium-category-tag">{poster.category}</span>
                </div>

                {/* 3:4 Aspect Ratio Image Wrap */}
                <div className="premium-image-wrap">
                  <Image
                    src={poster.src}
                    alt={poster.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw"
                    className="premium-poster-img"
                    loading="lazy"
                  />

                  {/* Hover Scanline Sheen */}
                  <div className="premium-hover-overlay" aria-hidden="true">
                    <div className="premium-zoom-pill">
                      <Sparkles size={15} />
                      <span>View in 3D</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Acrylic Caption Scrim */}
                <div className="premium-frame-bottom">
                  <div className="premium-caption-info">
                    <h3 className="premium-caption-title">{poster.title}</h3>
                    <p className="premium-caption-desc">
                      {poster.description}
                    </p>
                  </div>

                  <span className="premium-expand-icon" aria-hidden="true">
                    <Maximize2 size={15} />
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Section Footer Meta */}
        <div className="posters-footer-meta">
          <div className="posters-tooling">
            <span className="tooling-label">DESIGN STACK</span>
            <span className="tooling-pill">Adobe Photoshop CC</span>
            <span className="tooling-pill">Adobe Illustrator</span>
            <span className="tooling-pill">Cinema 4D Passes</span>
            <span className="tooling-pill">Camera Raw Color Grading</span>
          </div>
          <p className="posters-note">
            Available for visual identity, album keyart, event branding, and creative poster commissions.
          </p>
        </div>
      </div>

      {/* ========================================================
          IMMERSIVE 3D CAROUSEL MODAL (Highlight Middle, Blur Rest)
      ======================================================== */}
      {activePoster !== null && activePosterIndex !== null && (
        <div
          className="carousel-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`Viewing ${activePoster.title} in 3D Carousel`}
          onClick={closeCarousel}
        >
          {/* Top Control HUD */}
          <div
            className="carousel-top-hud"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="carousel-counter-badge">
              <span className="hud-accent-dot" />
              <span className="counter-current">
                {String(activePosterIndex + 1).padStart(2, "0")}
              </span>
              <span className="counter-sep">/</span>
              <span className="counter-total">
                {String(filteredPosters.length).padStart(2, "0")}
              </span>
            </div>

            <div className="carousel-title-hud">
              <span className="carousel-active-label">CURRENTLY VIEWING</span>
              <h4 className="carousel-active-title">{activePoster.title}</h4>
            </div>

            <div className="carousel-actions-hud">
              <button
                type="button"
                className={`hud-btn ${isAutoSpinning ? "active-spin" : ""}`}
                onClick={() => setIsAutoSpinning((prev) => !prev)}
                title={isAutoSpinning ? "Pause 3D rotation" : "Auto rotate 3D carousel"}
                aria-label={isAutoSpinning ? "Pause 3D rotation" : "Auto rotate 3D carousel"}
              >
                {isAutoSpinning ? <Pause size={17} /> : <Play size={17} />}
                <span className="hud-btn-text">
                  {isAutoSpinning ? "Pause" : "Spin 3D"}
                </span>
              </button>

              <a
                href={activePoster.fullSrc}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="hud-btn"
                title="Download full resolution print artwork"
                aria-label="Download full resolution print artwork"
              >
                <Download size={17} />
                <span className="hud-btn-text">Original</span>
              </a>

              <button
                type="button"
                className="hud-btn hud-close-btn"
                onClick={closeCarousel}
                aria-label="Close 3D Carousel (Esc)"
                title="Close (Esc)"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* 3D Scene Viewport */}
          <div
            className="carousel-scene"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left / Right Nav Arrows */}
            <button
              type="button"
              className="carousel-nav-arrow carousel-nav-prev"
              onClick={showPrev}
              aria-label="Previous artwork"
              title="Previous (Left Arrow)"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              type="button"
              className="carousel-nav-arrow carousel-nav-next"
              onClick={showNext}
              aria-label="Next artwork"
              title="Next (Right Arrow)"
            >
              <ChevronRight size={32} />
            </button>

            {/* 3D Cylindrical Perspective Carousel */}
            <div className="carousel-a3d">
              {filteredPosters.map((poster, i) => {
                const total = filteredPosters.length;
                let diff = i - activePosterIndex;
                if (diff > total / 2) diff -= total;
                if (diff < -total / 2) diff += total;

                const isCurrent = diff === 0;
                const absDiff = Math.abs(diff);

                // 3D positioning parameters
                // Center card at 0, immediate neighbors shifted along X and tilted in Y
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
                  scale = 1.08;
                  blurPx = 0;
                  brightness = 1;
                  opacity = 1;
                } else if (absDiff === 1) {
                  tx = diff * 295;
                  tz = -170;
                  ry = diff * -24;
                  scale = 0.88;
                  blurPx = 4;
                  brightness = 0.58;
                  opacity = 0.78;
                } else if (absDiff === 2) {
                  tx = diff * 270;
                  tz = -320;
                  ry = diff * -36;
                  scale = 0.75;
                  blurPx = 7;
                  brightness = 0.4;
                  opacity = 0.48;
                } else if (absDiff === 3) {
                  tx = diff * 255;
                  tz = -460;
                  ry = diff * -46;
                  scale = 0.63;
                  blurPx = 10;
                  brightness = 0.25;
                  opacity = 0.25;
                } else {
                  tx = diff * 240;
                  tz = -600;
                  ry = diff * -52;
                  scale = 0.5;
                  blurPx = 14;
                  brightness = 0.15;
                  opacity = 0;
                }

                const isVisible = absDiff <= 3;

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
                      if (!isCurrent) {
                        setActivePosterIndex(i);
                        setIsAutoSpinning(false);
                      }
                    }}
                    title={isCurrent ? poster.title : `Click to view ${poster.title}`}
                  >
                    <div className="carousel-card-inner">
                      <Image
                        src={poster.src}
                        alt={poster.title}
                        fill
                        sizes="380px"
                        priority={isCurrent}
                        className="carousel-card-img"
                      />

                      {/* Active Center Card Highlight Frame */}
                      {isCurrent && (
                        <div className="carousel-active-badge">
                          <span className="badge-pulse-dot" />
                          <span>ART #{String(poster.id).padStart(2, "0")} • {poster.category}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Caption HUD */}
          <div
            className="carousel-bottom-hud"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="hud-info-left">
              <span className="hud-category-pill">{activePoster.category}</span>
              <h3 className="hud-title">{activePoster.title}</h3>
              <p className="hud-desc">{activePoster.description}</p>
            </div>

            <div className="hud-info-right">
              <span className="hud-dim-pill">
                Print Resolution: {activePoster.width} &times; {activePoster.height} px
              </span>
              <span className="hud-nav-hint">
                Use Left / Right Arrows or click any background card to rotate
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
