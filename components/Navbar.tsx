'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  /**
   * Explicit theme override:
   * - 'auto': Dynamically detects whether the section under the navbar is dark or light.
   * - 'dark': Underlying page is dark -> font color is white.
   * - 'light': Underlying page is light -> font color is black.
   */
  theme?: 'auto' | 'dark' | 'light';
  /**
   * Legacy prop compatibility
   */
  dark?: boolean;
  /**
   * Logo to display on dark backgrounds (default: '/VALogos/logo-white.png')
   */
  logoDark?: string;
  /**
   * Logo to display on light backgrounds (default: '/VALogos/logo-cropped.png')
   */
  logoLight?: string;
}

export default function Navbar({
  theme = 'auto',
  dark,
  logoDark = '/VALogos/logo-white.png',
  logoLight = '/VALogos/logo-cropped.png',
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkUnderneath, setIsDarkUnderneath] = useState(true);

  useEffect(() => {
    // Starting theme preference
    if (theme === 'dark') {
      setIsDarkUnderneath(true);
    } else if (theme === 'light' || dark === true) {
      setIsDarkUnderneath(false);
    }

    // Dynamic detection of underlying section theme and scroll state
    const detectTheme = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

      // Dynamic check of underlying section
      const sampleX = Math.min(window.innerWidth - 100, window.innerWidth * 0.8);
      const sampleY = 45;

      const elements = document.elementsFromPoint(sampleX, sampleY);
      const contentEl = elements.find((el) => !el.closest('header'));

      if (contentEl) {
        // 1. Check known dark containers
        if (contentEl.closest('#home, [data-theme="dark"], .theme-dark, .bg-zinc-900')) {
          setIsDarkUnderneath(true);
          return;
        }

        // 2. Check known light containers
        if (contentEl.closest('#portfolio, #story, #snap, [data-theme="light"], .theme-light, .bg-\\[\\#faf9f6\\]')) {
          setIsDarkUnderneath(false);
          return;
        }

        // 3. Inspect computed background color up the DOM
        let curr: HTMLElement | null = contentEl as HTMLElement;
        while (curr && curr !== document.body) {
          const bg = window.getComputedStyle(curr).backgroundColor;
          if (bg && bg !== 'transparent' && !bg.startsWith('rgba(0, 0, 0, 0)')) {
            const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (match) {
              const r = parseInt(match[1], 10);
              const g = parseInt(match[2], 10);
              const b = parseInt(match[3], 10);
              const brightness = (r * 299 + g * 587 + b * 114) / 1000;
              setIsDarkUnderneath(brightness < 135);
              return;
            }
          }
          curr = curr.parentElement;
        }
      }

      // Fallback if no specific container matches
      if (theme === 'light') {
        setIsDarkUnderneath(false);
      } else if (theme === 'dark') {
        setIsDarkUnderneath(true);
      } else {
        const hero = document.getElementById('home');
        if (hero) {
          const heroBottom = hero.offsetTop + hero.offsetHeight;
          setIsDarkUnderneath(y < heroBottom - 80);
        } else {
          setIsDarkUnderneath(false);
        }
      }
    };

    detectTheme();
    window.addEventListener('scroll', detectTheme, { passive: true });
    window.addEventListener('resize', detectTheme, { passive: true });
    return () => {
      window.removeEventListener('scroll', detectTheme);
      window.removeEventListener('resize', detectTheme);
    };
  }, [theme, dark]);

  const links = [
    { label: 'THE JOURNEY', href: '/our-journey' },
    { label: 'GALLERY', href: '/gallery' },
  ];

  // Colors purely dynamic based on underlying theme
  // Dark background -> White text & borders
  // Light background -> Black text & borders
  const linkTextColor = isDarkUnderneath
    ? 'text-lilac-900 hover:text-white/80 '
    : 'text-lilac-900 hover:text-zinc-700';

  const buttonStyle = isDarkUnderneath
    ? 'border-white text-white hover:bg-[#9a719d] hover:border-[#9a719d] hover:text-white'
    : 'border-black text-black hover:bg-[#9a719d] hover:border-[#9a719d] hover:text-white';

  const mobileToggleColor = isDarkUnderneath ? 'text-white' : 'text-black';
  const currentLogo = isDarkUnderneath ? logoDark : logoLight;

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 navbar-frosted-texture"
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 h-16 md:h-20 flex items-center justify-between">
        {/* LOGO - dynamically switches between light and dark versions based on background */}
        <motion.a
          href="/"
          className="flex items-center shrink-0 cursor-pointer group py-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center shrink-0">
            <img
              src={currentLogo}
              alt="Vibe Affair"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
            />
          </div>
        </motion.a>

        {/* RIGHT SIDE NAVIGATION */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className={` text-lilac-900 text-xs uppercase tracking-[0.16em] transition-colors duration-300 ${linkTextColor}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              {link.label}
            </motion.a>
          ))}

          <motion.a
            href="/contact-us"
            className={` border text-xs tracking-wide font-medium px-6 py-2.5 rounded-full transition-all duration-300 shadow-sm cursor-pointer ${buttonStyle}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Let&apos;s Talk
          </motion.a>
        </nav>

        {/* MOBILE MENU TOGGLE */}
        <button
          className={`md:hidden p-2 transition-colors duration-300 ${mobileToggleColor}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`md:hidden border-t px-6 py-5 flex flex-col gap-4 shadow-xl ${
              isDarkUnderneath
                ? 'bg-zinc-950/95 backdrop-blur-md border-white/10'
                : 'bg-white/95 backdrop-blur-md border-zinc-200'
            }`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm tracking-widest uppercase font-semibold py-2 transition-colors ${
                  isDarkUnderneath ? 'text-zinc-100 hover:text-white' : 'text-zinc-900 hover:text-black'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}

            <a
              href="/contact-us"
              className={`inline-block text-center border text-xs tracking-wider uppercase font-semibold py-3 px-5 rounded-full mt-2 transition-colors ${
                isDarkUnderneath
                  ? 'border-white text-white hover:bg-[#9a719d] hover:border-[#9a719d] hover:text-white'
                  : 'border-black text-black hover:bg-[#9a719d] hover:border-[#9a719d] hover:text-white'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Let&apos;s Talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
