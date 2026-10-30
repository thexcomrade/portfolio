"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Maximize2,
  Palette,
  X,
} from "lucide-react";
import {
  posters,
  posterCategories,
  type PosterCategory,
} from "@/data/posters";

export default function Posters() {
  const [selectedCategory, setSelectedCategory] =
    useState<PosterCategory>("All Posters");
  const [activePosterIndex, setActivePosterIndex] = useState<number | null>(
    null
  );

  const filteredPosters = useMemo(() => {
    if (selectedCategory === "All Posters") return posters;
    return posters.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const activePoster =
    activePosterIndex !== null ? filteredPosters[activePosterIndex] : null;

  const openLightbox = useCallback((index: number) => {
    setActivePosterIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setActivePosterIndex(null);
    document.body.style.overflow = "";
  }, []);

  const showNext = useCallback(() => {
    if (activePosterIndex === null) return;
    setActivePosterIndex((prev) =>
      prev === null ? null : (prev + 1) % filteredPosters.length
    );
  }, [activePosterIndex, filteredPosters.length]);

  const showPrev = useCallback(() => {
    if (activePosterIndex === null) return;
    setActivePosterIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + filteredPosters.length) % filteredPosters.length
    );
  }, [activePosterIndex, filteredPosters.length]);

  useEffect(() => {
    if (activePosterIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePosterIndex, closeLightbox, showNext, showPrev]);

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
                onClick={() => setSelectedCategory(cat)}
              >
                <span>{cat}</span>
                <span className="poster-pill-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Masonry Collage Grid */}
        <div className="poster-masonry-collage">
          {filteredPosters.map((poster, index) => {
            const paddedId = String(poster.id).padStart(2, "0");

            return (
              <article
                key={poster.id}
                className="poster-card-frame group"
                onClick={() => openLightbox(index)}
              >
                {/* Tech Bracket Accents */}
                <span
                  className="poster-bracket poster-bracket-tl"
                  aria-hidden="true"
                />
                <span
                  className="poster-bracket poster-bracket-tr"
                  aria-hidden="true"
                />
                <span
                  className="poster-bracket poster-bracket-bl"
                  aria-hidden="true"
                />
                <span
                  className="poster-bracket poster-bracket-br"
                  aria-hidden="true"
                />

                {/* Frame Header Micro-bar */}
                <div className="poster-frame-top">
                  <div className="poster-frame-id">
                    <span className="poster-id-dot" />
                    <span>ART #{paddedId}</span>
                  </div>
                  <span className="poster-frame-tag">{poster.category}</span>
                </div>

                {/* Poster Image Container */}
                <div className="poster-image-wrap">
                  <Image
                    src={poster.src}
                    alt={poster.title}
                    width={poster.width}
                    height={poster.height}
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw"
                    className="poster-img"
                  />

                  {/* Hover Overlay with Quick Action */}
                  <div className="poster-hover-overlay" aria-hidden="true">
                    <div className="poster-zoom-btn">
                      <Maximize2 size={18} />
                      <span>Preview Art</span>
                    </div>
                  </div>
                </div>

                {/* Frame Footer Caption */}
                <div className="poster-frame-bottom">
                  <div className="poster-caption-info">
                    <h3 className="poster-caption-title">{poster.title}</h3>
                    <p className="poster-caption-desc">
                      {poster.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label={`Open ${poster.title} in full resolution`}
                    className="poster-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightbox(index);
                    }}
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Section Footer Callout */}
        <div className="posters-footer-meta">
          <div className="posters-tooling">
            <span className="tooling-label">DESIGN STACK</span>
            <span className="tooling-pill">Adobe Photoshop CC</span>
            <span className="tooling-pill">Adobe Illustrator</span>
            <span className="tooling-pill">Cinema 4D Passes</span>
            <span className="tooling-pill">Camera Raw Grading</span>
          </div>
          <p className="posters-note">
            Available for visual identity, album keyart, event branding, and creative poster commissions.
          </p>
        </div>
      </div>

      {/* Cinematic Fullscreen Lightbox Modal */}
      {activePoster !== null && activePosterIndex !== null && (
        <div
          className="poster-lightbox-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`Viewing ${activePoster.title}`}
          onClick={closeLightbox}
        >
          {/* Lightbox Content Container */}
          <div
            className="poster-lightbox-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="lightbox-top-bar">
              <div className="lightbox-counter">
                <span className="counter-current">
                  {String(activePosterIndex + 1).padStart(2, "0")}
                </span>
                <span className="counter-sep">/</span>
                <span className="counter-total">
                  {String(filteredPosters.length).padStart(2, "0")}
                </span>
              </div>

              <div className="lightbox-title-box">
                <span className="lightbox-title">{activePoster.title}</span>
                <span className="lightbox-category">
                  {activePoster.category}
                </span>
              </div>

              <div className="lightbox-actions">
                <a
                  href={activePoster.fullSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="lightbox-action-btn"
                  title="Open full resolution in new tab"
                >
                  <Download size={18} />
                </a>

                <button
                  type="button"
                  className="lightbox-action-btn lightbox-close-btn"
                  onClick={closeLightbox}
                  aria-label="Close poster preview (Esc)"
                  title="Close (Esc)"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Main Stage */}
            <div className="lightbox-stage">
              <button
                type="button"
                className="lightbox-nav-btn lightbox-prev-btn"
                onClick={showPrev}
                aria-label="Previous poster"
              >
                <ChevronLeft size={28} />
              </button>

              <div className="lightbox-image-container">
                <Image
                  src={activePoster.src}
                  alt={activePoster.title}
                  width={activePoster.width}
                  height={activePoster.height}
                  priority
                  className="lightbox-main-img"
                  sizes="90vw"
                />
              </div>

              <button
                type="button"
                className="lightbox-nav-btn lightbox-next-btn"
                onClick={showNext}
                aria-label="Next poster"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="lightbox-bottom-bar">
              <p className="lightbox-desc">{activePoster.description}</p>
              <span className="lightbox-dim">
                Original Print Dimensions: {activePoster.width} &times;{" "}
                {activePoster.height} px
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
