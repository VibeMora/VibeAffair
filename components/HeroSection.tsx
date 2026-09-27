"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    images: [
      "https://images.pexels.com/photos/167703/pexels-photo-167703.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  {
    images: [
      "https://images.pexels.com/photos/13959262/pexels-photo-13959262.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/390057/pexels-photo-390057.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
];

export default function HeroSection() {
  const [imageIndex, setImageIndex] = useState(0);
  const [toggled, setToggled] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const texts = ["MAKE IT FUN", "BOOOOM"];
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(overlayRef.current, { y: "100%" });
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      );

      gsap.to(overlayRef.current, {
        y: "0%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleButtonClick = () => {
    const nextIndex = (imageIndex + 1) % slides.length;

    setToggled((prev) => !prev);
    setImageIndex(nextIndex);

    if (overlayRef.current) {
      gsap.set(overlayRef.current, { y: "100%" });
      gsap.to(overlayRef.current, {
        y: "0%",
        duration: 0.45,
        ease: "power2.out",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[140vh] pt-16 bg-[#faf9f6] text-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        {/* Base Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[imageIndex].images[0]})` }}
        />

        {/* Overlay Image */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[imageIndex].images[1]})` }}
        />

        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative">
        <div className="sticky top-16 h-screen z-20 flex items-center justify-center px-6 lg:px-12">
          <div
            ref={contentRef}
            className="max-w-4xl text-center space-y-8 z-30"
          >
            <p className="font-subtitle text-xs uppercase tracking-[0.45em] text-[#f4d24a]">
              THE GSAP FIELD™
            </p>

            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-tight tracking-tight">
              The Sellers
            </h1>

            <p className="font-subtitle text-sm md:text-base uppercase tracking-[0.28em] text-white/80">
              Started with a business plan. Ended with crumbs.
            </p>

            <button
              onClick={handleButtonClick}
              className="group relative mx-auto w-full max-w-[340px] overflow-hidden rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] transition-none"
            >
              {/* Sliding Circle */}
              <span
                className={`absolute top-1/2 left-2 h-10 w-10 -translate-y-1/2 rounded-full transition-all duration-300 ease-in-out ${
                  toggled
                    ? "translate-x-[260px] bg-red-500"
                    : "translate-x-0 bg-[#f4d24a]"
                }`}
              />

              {/* Text Wrapper */}
              <div className="relative flex items-center justify-center h-6 overflow-hidden">
                <span
                  className={`absolute transition-all duration-300 ease-in-out ${
                    toggled
                      ? "-translate-x-10 opacity-0"
                      : "translate-x-0 opacity-100"
                  }`}
                >
                  {texts[0]}
                </span>

                <span
                  className={`absolute transition-all duration-300 ease-in-out ${
                    toggled
                      ? "translate-x-0 opacity-100"
                      : "translate-x-10 opacity-0"
                  }`}
                >
                  {texts[1]}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
