'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Play, X } from 'lucide-react';

export interface TestimonialItem {
  id: string | number;
  name: string;
  role: string;
  company: string;
  /**
   * Placeholder image / thumbnail for the video card.
   * Replace with your desired image path or poster.
   */
  thumbnail: string;
  /**
   * Video href / link:
   * Point this to your choice of video (e.g. '/Testimonial videos/your-video.mov', YouTube link, Vimeo, etc.)
   */
  videoUrl: string;
  /**
   * Optional direct HTML5 video source if you want an inline <video> element
   */
  videoSrc?: string;
}

/**
 * Normalizes video URLs so that if 'public/' is passed, it is correctly mapped to '/' for Next.js
 */
export const normalizeMediaUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('public/')) {
    return '/' + url.slice(7);
  }
  return url;
};

/**
 * Extracts YouTube embed URL if applicable
 */
const getYouTubeEmbedUrl = (url: string) => {
  try {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=1`
      : null;
  } catch {
    return null;
  }
};

/**
 * Default testimonials matching the attached reference design.
 * Video 1 references your local video in public/Testimonial videos/Bride & Groom Dads_YRWedding.mov
 */
export const defaultTestimonials: TestimonialItem[] = [
  {
    id: 6,
    name: 'Rohan Bairat & Madhu Palkar',
    role: 'Founder',
    company: 'NextGen Creative',
    thumbnail: '/Testimonial Thumbnails/06.png',
    videoUrl: '/Testimonial videos/VIDEO-2026-04-27-12-55-59 (1).mp4',
    videoSrc: '/Testimonial videos/VIDEO-2026-04-27-12-55-59 (1).mp4',
    // 
  },
  {
    id: 8,
    name: 'Rucha Vaidya & Yash Kirkire',
    role: 'Founder',
    company: 'NextGen Creative',
    thumbnail: '/Testimonial Thumbnails/08.png',
    videoUrl: '/Testimonial videos//Yash&Rucha.mov',
    videoSrc: '/Testimonial videos/Yash&Rucha.mov',
  



// 


  },
  {
    id: 5,
    name: 'Ms. Upasana Roy',
    role: 'VP Marketing',
    company: 'Horizon Media',
    thumbnail: '/Testimonial Thumbnails/05.png',
    videoUrl: '/Testimonial videos/Sula Vibeyards Wedding.mp4',
    videoSrc: '/Testimonial videos/Sula Vibeyards Wedding.mp4',
  },
  //// 
  {
    id: 1,
    name: ' Dr.Sandesh Kirkire & Mr.Ajit Vaidya',
    role: 'COO',
    company: 'Prime Inc.',
    thumbnail: '/Testimonial Thumbnails/01.png',
    // Reference to your local video in public/Testimonial videos/
    videoUrl: '/Testimonial videos/Bride & Groom Dads_YRWedding.mov',
    videoSrc: '/Testimonial videos/Bride & Groom Dads_YRWedding.mov',
    //  //
  },
  {
    id: 4,
    name: 'Mr. Lav Chaturvedi ',
    role: 'CEO',
    company: 'Insinious Inc.',
    thumbnail: '/Testimonial Thumbnails/04.png',
    videoUrl: '/Testimonial videos/Luv Chaturvedi_AAWedding.mov',
    videoSrc: '/Testimonial videos/Luv Chaturvedi_AAWedding.mov',
    // - Executive Director & CEO ( Reliance Securities )

  },
  {
    id: 3,
    name: 'Mrs. Kanchan Vaidya',
    role: 'COO',
    company: 'Prime Inc.',
    thumbnail: '/Testimonial Thumbnails/03.png',
    videoUrl: '/Testimonial videos/Groom_Mom_RMWedding.MP4',
    videoSrc: '/Testimonial videos/Groom_Mom_RMWedding.MP4',
    //// 
  },
  {
    id: 7,
    name: 'Mrs. Chitra Shinde ',
    role: 'Founder',
    company: 'NextGen Creative',
    thumbnail: '/Testimonial Thumbnails/07.png',
    videoUrl: '/Testimonial videos/VIDEO-2026-04-27-12-55-59 (2).mp4',
    videoSrc: '/Testimonial videos/VIDEO-2026-04-27-12-55-59 (2).mp4',
  },
  {
    id: 2,
    name: 'Mrs.Rupali Chitnis',
    role: 'COO',
    company: 'Prime Inc.',
    thumbnail: '/Testimonial Thumbnails/02.png',
    videoUrl: '/Testimonial videos/Bride_Mom_RMWedding.MP4',
    videoSrc: '/Testimonial videos/Bride_Mom_RMWedding.MP4',
  },
  // 
  
 //// 
];

interface TestimonialsProps {
  /**
   * Title for the testimonials section. Defaults to "Hear what our customers are saying"
   */
  title?: string;
  /**
   * Custom list of testimonial cards. Defaults to `defaultTestimonials`
   */
  testimonials?: TestimonialItem[];
  /**
   * Optional custom CSS class for the section wrapper
   */
  className?: string;
}

export default function Testimonials({
  title = "Words We'll Always Treasure!",
  testimonials = defaultTestimonials,
  className = '',
}: TestimonialsProps) {
  const [activeVideo, setActiveVideo] = useState<TestimonialItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setActiveVideo(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [activeVideo]);

  // Ensure enough items to smoothly fill wide screens and loop seamlessly
  const trackItems = useMemo(() => {
    if (!testimonials || testimonials.length === 0) return [];
    let items = [...testimonials];
    while (items.length < 12) {
      items = [...items, ...testimonials];
    }
    return items;
  }, [testimonials]);

  const renderCard = (item: TestimonialItem, uniqueKey: string, isAriaHidden = false) => {
    const resolvedUrl = normalizeMediaUrl(item.videoUrl);

    return (
      <article
        key={uniqueKey}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="testimonial-card flex-none w-[240px] sm:w-[260px] md:w-[275px] lg:w-[285px] flex flex-col select-none"
      >
        {/* VIDEO THUMBNAIL CARD / ANCHOR TAG 
            Clicking opens the video in a high-fidelity modal player,
            while href directly references your chosen video URL. */}
        <a
          href={resolvedUrl}
          target={resolvedUrl.startsWith('http') ? '_blank' : undefined}
          rel={resolvedUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
          tabIndex={isAriaHidden ? -1 : undefined}
          onClick={(e) => {
            if (resolvedUrl) {
              e.preventDefault();
              setActiveVideo(item);
            }
          }}
          className="group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:ring-offset-2"
          aria-label={`Watch testimonial from ${item.name}, ${item.role} at ${item.company}`}
        >
          {/* VIDEO OR POSTER IMAGE PLACEHOLDER */}
          {item.videoSrc ? (
            <video
              src={normalizeMediaUrl(item.videoSrc)}
              poster={item.thumbnail}
              playsInline
              muted
              preload="metadata"
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src={item.thumbnail}
              alt={`${item.name} video testimonial`}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />
          )}

          {/* Subtle scrim overlay so play icon always has contrast */}
          <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" />

          {/* PLAY BUTTON (FROSTED GLASS PILL / CIRCLE) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white/40 backdrop-blur-md border border-white/50 shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-300 group-hover:scale-110 group-hover:bg-white/60">
              <Play className="h-6 w-6 fill-slate-800 text-slate-800 translate-x-0.5 opacity-80" />
            </div>
          </div>
        </a>

        {/* AUTHOR INFO ROW */}
        <div className="mt-3.5 min-w-0">
          <p className="text-zinc-500 text-center font-medium text-sm sm:text-base">
            {item.name}
          </p>
        </div>
      </article>
    );
  };

  return (
    <section className={`w-full website-bg mb-8 overflow-hidden ${className}`}>
      {/* SECTION TITLE */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-8 sm:mb-10 text-center">
        <h3 className="header-css pb-4">
          {title}
        </h3>
      </div>

      {/* CONTINUOUS HORIZONTAL MARQUEE */}
      <div
        className="testimonial-marquee-wrapper relative w-full overflow-hidden py-2"
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Soft edge gradient fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-28 bg-gradient-to-r from-[rgb(255,251,246)] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-28 bg-gradient-to-l from-[rgb(255,251,246)] to-transparent z-10" />

        {/* Scrolling tracks container */}
        <div className="flex w-max">
          {/* Primary Track */}
          <div
            className="flex shrink-0 gap-5 sm:gap-6 pr-5 sm:pr-6 animate-testimonial-marquee"
            style={{
              animationPlayState: isPaused || activeVideo ? 'paused' : 'running',
            }}
          >
            {trackItems.map((item, index) => renderCard(item, `track1-${item.id}-${index}`, false))}
          </div>

          {/* Duplicate Track for seamless infinite loop */}
          <div
            aria-hidden="true"
            className="flex shrink-0 gap-5 sm:gap-6 pr-5 sm:pr-6 animate-testimonial-marquee"
            style={{
              animationPlayState: isPaused || activeVideo ? 'paused' : 'running',
            }}
          >
            {trackItems.map((item, index) => renderCard(item, `track2-${item.id}-${index}`, true))}
          </div>
        </div>
      </div>

      {/* INTERACTIVE VIDEO MODAL PLAYER */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-black rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              aria-label="Close video player"
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player or YouTube Embed */}
            {getYouTubeEmbedUrl(activeVideo.videoUrl) ? (
              <div className="w-full aspect-video">
                <iframe
                  src={getYouTubeEmbedUrl(activeVideo.videoUrl)!}
                  title={`${activeVideo.name} testimonial video`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="w-full flex items-center justify-center bg-black">
                <video
                  src={normalizeMediaUrl(activeVideo.videoUrl || activeVideo.videoSrc || '')}
                  controls
                  autoPlay
                  playsInline
                  className="w-full max-h-[75vh] object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {/* Bottom info banner */}
            <div className="w-full bg-zinc-900 px-5 py-3 flex items-center justify-between border-t border-zinc-800">
              <div>
                <p className="text-white text-sm font-semibold leading-tight">
                  {activeVideo.name}
                </p>
                <p className="text-zinc-400 text-xs leading-tight font-subtitle">
                  {activeVideo.role}, {activeVideo.company}
                </p>
              </div>
              <a
                href={normalizeMediaUrl(activeVideo.videoUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#a78bfa] hover:text-[#c4b5fd] underline underline-offset-2"
              >
                Open directly ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// Named alias export for flexibility
export { Testimonials as TestimonialSection };
