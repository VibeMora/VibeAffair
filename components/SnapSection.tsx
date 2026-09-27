"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3765114/pexels-photo-3765114.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1667849/pexels-photo-1667849.jpeg?auto=compress&cs=tinysrgb&w=800",
];

const ringImages = [...images, ...images, ...images, ...images]; // 10 images, ~120px gap each
const RADIUS = 420;
const IMG_W = 150;
const IMG_H = 210;
const RING_SIZE = 1100;

export default function SnapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%", // 200vh of scroll budget — GSAP adds space, no blank screen
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Scale from 1→4 anchored at top-center: ring zooms up and fills screen
      tl.fromTo(
        scaleRef.current,
        { scale: 1 },
        { scale: 4, ease: "none" },
        0
      );

      // Ring rotates 540° (1.5 turns) in sync with the zoom
      tl.fromTo(
        ringRef.current,
        { rotation: 0 },
        { rotation: 540, ease: "none" },
        0
      );

      // Text fades out in the first 30% of the scroll so the ring takes over
      tl.fromTo(
        textRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -80,
          ease: "none",
          duration: 0.3, // 30% of scroll
        },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="snap"
      className="relative bg-white overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* Scale container — transformOrigin top-center so ring zooms upward like the reference */}
      <div
        ref={scaleRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ transformOrigin: "50% 15%" }}
      >
        {/* Rotating ring */}
        <div
          ref={ringRef}
          style={{ width: RING_SIZE, height: RING_SIZE, position: "relative", flexShrink: 0 }}
        >
          {ringImages.map((src, i) => {
            const angle = (i / ringImages.length) * 360;
            const opacityRaw = Math.cos((angle * Math.PI) / 180);
            const opacity = 0.4 + 0.6 * Math.max(0, opacityRaw);

            return (
              <div
                key={i}
                className="absolute"
                style={{
                  width: IMG_W,
                  height: IMG_H,
                  left: "50%",
                  top: "50%",
                  opacity,
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${RADIUS}px)`,
                }}
              >
                {/* Colour glow halo */}
                <div
                  className="absolute rounded-3xl overflow-hidden"
                  style={{ inset: "-14px", filter: "blur(20px)", opacity: 0.3, zIndex: 0 }}
                >
                  <img src={src} className="w-full h-full object-cover" alt="" draggable={false} />
                </div>
                {/* Sharp photo */}
                <div
                  className="relative w-full h-full rounded-2xl overflow-hidden shadow-md"
                  style={{ zIndex: 1 }}
                >
                  <img src={src} className="w-full h-full object-cover" alt="" draggable={false} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Center text */}
      <div
        ref={textRef}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
      >
        <p className="text-sm tracking-[0.25em] uppercase text-zinc-500 font-semibold mb-4 font-subtitle">
          Start a fire
        </p>
        <h2 className="text-5xl md:text-7xl lg:text-[7rem] leading-none font-heading text-zinc-900 mb-8 tracking-tight">
          We'll see
          <br />
          the smoke
        </h2>
        <button className="bg-zinc-900 hover:bg-zinc-800 transition-colors text-white px-8 py-3 text-sm font-bold tracking-widest uppercase rounded pointer-events-auto shadow-sm">
          Send Smoke
        </button>
      </div>
    </section>
  );
}
