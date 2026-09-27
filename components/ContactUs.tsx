'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Facebook, Instagram, Youtube } from 'lucide-react';
import CTAFooter from './CTAFooter';

interface ContactUsProps {
  /**
   * Background image URL.
   * Defaults to '/contact-bg.png'.
   */
  bgImageUrl?: string;
  /**
   * Opacity class or value for the image. Defaults to 'opacity-20'.
   */
  imageOpacity?: string;
  /**
   * Whether to display the bottom callout banner ("Need event planning wizards...").
   * Defaults to true.
   */
  showBottomBanner?: boolean;
}

const contactCards = [
  {
    id: 'email',
    icon: Mail,
    iconColor: 'text-[#9a719d]', // Vibrant cyan / turquoise
    iconGlow: 'rgb(154 113 157 / var(--tw-text-opacity))',
    title: 'Hop on the email train',
    description: 'We promise to reply faster than you can say \u2018 eventful shenanigans \u2019 !',
    actionText: 'contact@thevibeaffair.com',
    actionHref: 'mailto:contact@thevibeaffair.com',
    ariaLabel: 'Send email to contact@thevibeaffair.com',
  },
  {
    id: 'meet',
    icon: MapPin,
    iconColor: 'text-[#9a719d]', // Vibrant rose / coral red
    iconGlow: 'rgb(154 113 157 / var(--tw-text-opacity))',
    title: 'Meet Us',
    description: 'We are just a Virtual Room away !',
    actionText: 'Schedule a virtual meet',
    actionHref: 'mailto:contact@thevibeaffair.com?subject=Schedule%20a%20Virtual%20Meet',
    ariaLabel: 'Schedule a virtual meet with Vibe Affair',
  },
  {
    id: 'phone',
    icon: Phone,
    iconColor: 'text-[#9a719d]', // Vibrant emerald / neon green
    iconGlow: 'rgb(154 113 157 / var(--tw-text-opacity))',
    title: 'Phone-a-Party',
    description: 'We\u2019re ready with confetti cannons & dancing unicorns !',
    actionText: '+91 9673079768',
    actionHref: 'tel:+919673079768',
    ariaLabel: 'Call +91 9673079768',
  },
];

const socialLinks = [
  {
    id: 'facebook',
    name: 'Facebook',
    href: 'https://www.facebook.com/thevibeaffair/',
    bgClass: 'bg-[#1877F2] hover:bg-[#166fe5]',
    icon: <Facebook className="w-4 h-4 text-white fill-white stroke-none" />,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    href: 'https://www.instagram.com/vibeaffair/',
    bgClass: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-90',
    icon: <Instagram className="w-4 h-4 text-white stroke-[2.2]" />,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    href: 'https://youtube.com/@vibeaffair?si=WIuwdCRp3vKs3ePl',
    bgClass: 'bg-[#FF0000] hover:bg-[#e60000]',
    icon: <Youtube className="w-4 h-4 text-white fill-white stroke-none" />,
  },
];

export default function ContactUs({
  bgImageUrl = '/contact-bg.png',
  imageOpacity = 'opacity-75',
  showBottomBanner = true,
}: ContactUsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' as const },
    },
  };

  return (
    <div className="w-full bg-[#0a0a0a] text-white flex flex-col justify-between selection:bg-amber-400 selection:text-black">
      {/* ==================== MAIN HERO / CONTACT SECTION ==================== */}
      <section
        aria-labelledby="contact-heading"
        className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 px-6 lg:px-12 flex-1 flex flex-col justify-center items-center"
      >
        {/* BACKGROUND PHOTO & CLEAN CONTRAST SCRIM */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          {/* Background image clearly visible */}
          {bgImageUrl && (
            <div
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${imageOpacity} transition-opacity duration-700`}
              style={{ backgroundImage: `url(${bgImageUrl})` }}
            />
          )}

          {/* Clean dark scrim ensuring the photo is vibrant while text is 100% readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/75" />

          {/* Bottom blend into the next section */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </div>

        {/* CONTENT CONTAINER */}
        <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col items-center">
          {/* MAIN HEADING */}
          <motion.h1
            id="contact-heading"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="header-css mb-24"
          >
            Let’s get your
    
            party started !
          </motion.h1>

          {/* THREE CONTACT COLUMNS */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-14 w-full text-center mb-16 md:mb-20"
          >
            {contactCards.map((card) => {
              const IconComponent = card.icon;
              return (
                <motion.div
                  key={card.id}
                  variants={itemVariants}
                  className="flex flex-col items-center justify-between group px-4 py-2"
                >
                  {/* ICON */}
                  <div
                    className="mb-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      filter: `drop-shadow(0 0 14px ${card.iconGlow})`,
                    }}
                  >
                    <IconComponent
                      className={`w-9 h-9 md:w-10 md:h-10 ${card.iconColor}`}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </div>

                  {/* TITLE */}
                  <h2 className="font-heading text-xl md:text-2xl font-bold text-white tracking-wide mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    {card.title}
                  </h2>

                  {/* DESCRIPTION */}
                  <p className="text-zinc-200 text-sm md:text-base leading-relaxed max-w-[280px] mx-auto mb-4 font-body font-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                    {card.description}
                  </p>

                  {/* ACTION LINK */}
                  <a
                    href={card.actionHref}
                    aria-label={card.ariaLabel}
                    className="inline-block text-white underline underline-offset-4 decoration-1 hover:text-cyan-300 hover:decoration-cyan-300 transition-colors duration-200 text-sm md:text-base font-medium tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]"
                  >
                    {card.actionText}
                  </a>
                </motion.div>
              );
            })}
          </motion.div>

          
        </div>
      </section>

      {/* {showBottomBanner && (
        <aside
          aria-label="Direct call action"
          className="w-full bg-[#0a0a0c] border-t border-zinc-800/80 py-10 md:py-12 px-6 lg:px-16 relative z-20"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-snug max-w-2xl text-center md:text-left tracking-tight">
              Need event planning wizards to swoop in, save the day, &amp; bring some magic to your event?
            </h2>

            <motion.a
              href="tel:+919673079768"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="shrink-0 px-8 py-3.5 rounded-full bg-gradient-to-b from-[#e3eaf2] to-[#cdd8e3] hover:from-white hover:to-zinc-200 text-zinc-900 text-sm md:text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap cursor-pointer"
            >
              Just a magical call away!
            </motion.a>
          </div>
        </aside>
      )} */}
      <CTAFooter/>
    </div>
  );
}
