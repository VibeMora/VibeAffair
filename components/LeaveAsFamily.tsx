'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export interface LeaveAsFamilyProps {
  /** First line of main heading */
  headlineLine1?: string;
  /** Second line of main heading */
  headlineLine2?: string;
  /** Third line of main heading (italicized in brand plum) */
  headlineLine3?: string;
  /** Subheading text below divider */
  subheading?: string;
  /** Action link text */
  ctaText?: string;
  /** Action link URL target */
  ctaHref?: string;
  /** Optional custom container class name */
  className?: string;
}

export default function LeaveAsFamily({
  headlineLine1 = 'We may enter as your',
  headlineLine2 = 'event planners.',
  headlineLine3 = 'We leave as family.',
  subheading = "Let's create something that feels like you.",
  ctaText = 'START A CONVERSATION',
  ctaHref = '/contact-us',
  className = '',
}: LeaveAsFamilyProps) {
  return (
    <section
      className={`website-bg relative py-8 pb-8 px-6 sm:px-8 lg:px-12 overflow-hidden text-center select-none ${className}`}
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-normal text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] leading-[1.16] sm:leading-[1.14] tracking-[-0.015em] text-lilac-900"
        >
          <span className="block text-zinc-500">{headlineLine1}</span>
          <span className="block mt-1 sm:mt-1.5 text-zinc-500">{headlineLine2}</span>
          <span className="block italic text-lilac-900 mt-1 sm:mt-2 font-serif">
            {headlineLine3}
          </span>
        </motion.h2>

        {/* Delicate Center Divider Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
          className="w-24 sm:w-28 h-[1px] bg-[#d6c6ac] my-8 sm:my-10"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="font-sans text-sm sm:text-base text-zinc-500 font-normal tracking-wide max-w-xl mx-auto"
        >
          {subheading}
        </motion.p>

        {/* Call to Action Link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.55, ease: 'easeOut' }}
          className="mt-7 sm:mt-9 "
        >
          <Link
            href={ctaHref}
            className="group inline-flex flex-col items-center cursor-pointer focus:outline-none"
          >
            <span className="font-sans text-xs sm:text-sm uppercase tracking-[0.20em] text-zinc-900 hover:text-lilac-900 transition-colors duration-300 flex items-center gap-2">
              <span>{ctaText}</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                &rarr;
              </span>
            </span>
            {/* Underline matching the champagne tone with hover expansion */}
            {/* <span className="w-full h-[1px] bg-[#d6c6ac] mt-2 group-hover:bg-[#221e2a] transition-colors duration-300" /> */}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
