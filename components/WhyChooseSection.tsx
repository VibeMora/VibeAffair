'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Award, Heart, Eye } from 'lucide-react';

const slides = [
  {
    src: '/Founder/Image4.jpeg',
    alt: 'Bespoke celebratory moment by Vibe Affair',
    caption: 'Curated Grandeur',
  },
  {
    src: '/Testimonial Thumbnails/06.png',
    alt: 'Cathedral Courtyard Mandap ceremony',
    caption: 'Heritage & Rituals',
  },
  {
    src: '/Founder/Image2.jpeg',
    alt: 'Royal Bridal Veil and intimate portrait',
    caption: 'Intimate Elegance',
  },
  {
    src: '/Testimonial Thumbnails/01.png',
    alt: 'Soulful celebration by Vibe Affair',
    caption: 'Joy in Motion',
  },
  {
    src: '/Testimonial Thumbnails/02.png',
    alt: 'Vibrant wedding memories',
    caption: 'Unfiltered Emotion',
  },
  {
    src: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Timeless love story frame',
    caption: 'Timeless Frames',
  },
];

const whyPoints = [
  {
    title: 'Creative minds',
    description: 'Ideas with a point of view — not a moodboard everyone else is also using.',
    icon: Sparkles,
  },
  {
    title: 'Calm execution',
    description: "The chaos still happens; it just doesn't reach you.",
    icon: ShieldCheck,
  },
  {
    title: 'Complete ownership',
    description: 'One team answerable for the whole thing, start to last dance.',
    icon: Award,
  },
  {
    title: 'Family-like involvement',
    description: 'We learn your people: who needs looking after, who needs convincing.',
    icon: Heart,
  },
  {
    title: 'An obsessive eye',
    description: 'We sweat the napkin fold and the exit route with equal seriousness.',
    icon: Eye,
  },
];

export default function WhyChooseSection() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered, handleNext]);

  return (
    <section
      id="why-choose-us"
      className="website-bg py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column: Portrait Image Carousel */}
          <motion.div
            className="lg:col-span-5 w-full flex flex-col items-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Portrait Carousel Card */}
            <div
              className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[400px] aspect-[3/4] sm:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.08)] border border-[#e4dcce] bg-zinc-200/50 group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={slides[current].src}
                    alt={slides[current].alt}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-3.5 left-4 sm:bottom-4 sm:left-5 pointer-events-none">
                    <span className="font-sans text-xs sm:text-sm text-white/90 tracking-wide drop-shadow-sm">
                      {slides[current].caption}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/80 hover:bg-white text-zinc-800 flex items-center justify-center shadow-md backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95"
                aria-label="Previous slide"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/80 hover:bg-white text-zinc-800 flex items-center justify-center shadow-md backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95"
                aria-label="Next slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2 mt-4 sm:mt-5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === current
                      ? 'w-7 bg-zinc-800'
                      : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Column: Header & Points */}
          <div className="lg:col-span-7 w-full flex flex-col justify-center">
            {/* Header: "Why Vibe Affair?" + Substatement */}
            <div className="mb-6 sm:mb-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-heading font-normal text-3xl sm:text-4xl lg:text-5xl text-lilac-900 leading-tight mb-2 tracking-tight"
              >
                Why Vibe Affair?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-heading font-light text-xl sm:text-2xl text-zinc-600 leading-snug"
              >
                Because someone has to{' '}
                <span className="italic text-lilac-900">actually hold it all.</span>
              </motion.p>
            </div>

            {/* Vertically Stacked Points with Icons & Light Grey Separators Between Points */}
            <div className="divide-y divide-zinc-200">
              {whyPoints.map((point, index) => {
                const IconComponent = point.icon;
                return (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.08 + index * 0.07 }}
                    className="flex items-start gap-3.5 sm:gap-4.5 py-3.5 sm:py-4 group"
                  >
                    {/* Icon Badge */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/70 border border-zinc-200 flex items-center justify-center shrink-0 text-lilac-900 shadow-sm mt-0.5 group-hover:scale-105 group-hover:border-lilac-900/40 group-hover:bg-white transition-all duration-300">
                      <IconComponent size={18} strokeWidth={1.75} />
                    </div>

                    {/* Text content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-normal text-lg sm:text-xl text-zinc-900 group-hover:text-lilac-900 transition-colors duration-300 leading-snug">
                        {point.title}
                      </h3>
                      <p className="font-sans text-sm text-zinc-600 leading-relaxed mt-1 group-hover:text-zinc-800 transition-colors duration-300">
                        {point.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { WhyChooseSection as WhyChooseUs };
