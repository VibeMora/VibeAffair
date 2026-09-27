'use client';

import { motion } from 'framer-motion';
import { Instagram, Facebook, Youtube, Phone, Mail, MessageSquare, Sparkles } from 'lucide-react';

export default function CTAFooter() {
  return (
    <>
      {/* <section id="contact" className="bg-[#faf9f6] py-20 overflow-hidden border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 py-12 border-t border-b border-zinc-200"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-zinc-900 font-heading font-bold text-3xl md:text-4xl lg:text-5xl leading-tight max-w-xl tracking-tight">
              Need event planning wizards to swoop in, save the day, & bring some magic to your event?
            </h2>
            <motion.a
              href="tel:+91"
              className="shrink-0 inline-flex items-center gap-2 border border-zinc-300 hover:bg-zinc-900 hover:text-white text-zinc-900 px-7 py-4 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap shadow-sm"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Sparkles size={15} />
              Just a magical call away!
            </motion.a>
          </motion.div>
        </div>
      </section> */}

      {/* <footer className="bg-white pt-16 pb-8 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <motion.div
              className="space-y-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div  className="flex items-center shrink-0 ">
                  <img
                    src="/VALogos/logo.png"
                    alt="Vibe Affair"
                    className="h-40 w-40 object-contain"
                  />
                </div>
                {/* <span className="text-zinc-800 font-bold tracking-[0.25em] text-sm uppercase">
                  Vibe Affair
                </span> */}
              {/* </div>
              <p className="text-zinc-500 text-xs leading-relaxed max-w-xs">
                Crafting extraordinary events with passion, precision, and a sprinkle of magic.
              </p>
             
            </motion.div> */}

            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="text-zinc-800 font-semibold text-sm tracking-wider uppercase mb-6">
                Useful Links
              </h4>
              <ul className="space-y-4">
                {[
                  { label: 'Snap-tastic Moments', href: '#portfolio' },
                  { label: 'The Journey', href: '#story' },
                  { label: 'Themes Gallery', href: '#themes' },
                  { label: 'Testimonials', href: '#' },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-zinc-500 hover:text-zinc-800 text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div> */}

            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-zinc-800 font-semibold text-sm tracking-wider uppercase mb-6">
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="https://wa.me/919673079768"
                    className="flex items-center gap-2.5 text-zinc-500 hover:text-zinc-800 text-sm transition-colors duration-200"
                  >
                    <MessageSquare size={14} />
                    Whatsapp
                  </a>
                </li>
                <li>
                  <a
                    href=" mailto:contact@thevibeaffair.com"
                    className="flex items-center gap-2.5 text-zinc-500 hover:text-zinc-800 text-sm transition-colors duration-200"
                  >
                    <Mail size={14} />
                    Email
                  </a>
                </li>
                <li>
                    <a
                      href="tel:+919673079768"
                      className="flex items-center gap-2.5 text-zinc-500 hover:text-zinc-800 text-sm transition-colors duration-200"
                    >
                      <Phone size={14} />
                      Call
                    </a>
                  </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="text-zinc-800 font-semibold text-sm tracking-wider uppercase mb-6">
                Socials
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="https://www.instagram.com/vibeaffair/"
                    className="flex items-center gap-2.5 text-zinc-500 hover:text-zinc-800 text-sm transition-colors duration-200"
                  >
                    <Instagram size={14} />
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/thevibeaffair/"
                    className="flex items-center gap-2.5 text-zinc-500 hover:text-zinc-800 text-sm transition-colors duration-200"
                  >
                    <Facebook size={14} />
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2.5 text-zinc-500 hover:text-zinc-800 text-sm transition-colors duration-200"
                  >
                    <Youtube size={14} />
                    YouTube
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          <div className="border-t border-zinc-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-zinc-400 text-xs">
              Designed with love for every celebration.
            </p>
            <div className="flex items-center gap-6">
              {/* <a href="#" className="text-zinc-400 hover:text-zinc-600 text-xs transition-colors">Privacy Policy</a>
              <a href="#" className="text-zinc-400 hover:text-zinc-600 text-xs transition-colors">Terms of Service</a> */}
               {/* <p className="text-zinc-400 text-xs">
                &copy; 2026 Vibe Affair | All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer> */}  

 <footer className="website-bg border-t pb-8 border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* MAIN FOOTER CONTENT */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* BRAND / LOGO */}
            <motion.div
              className="space-y-5 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center">
                <img
                  src="/VALogos/logo-cropped.png"
                  alt="Vibe Affair"
                  className="h-40 w-40 object-contain object-left"
                />
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-xs font-body">
                Crafting extraordinary events with passion, precision, and a sprinkle of magic.
              </p>
            </motion.div>


            {/* EMPTY COLUMN
                Keeps the right-side columns positioned correctly */}
            <div className="hidden lg:block" />


            {/* CONTACT + SOCIALS WRAPPER */}
            <div className="lg:col-span-2 mb-8 grid grid-cols-2 gap-x-32 lg:gap-x-40 py-top-16">

              {/* CONTACT US */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h4 className="text-lilac-900 font-heading font-semibold text-base mb-10">
                  CONTACT US
                </h4>

                <ul className="space-y-8">
                  <li>
                  <a
                    href="https://wa.me/919673079768"
                    className="flex items-center gap-2.5 text-zinc-500 hover:text-zinc-800 text-xs transition-colors duration-200"
                  >
                    <MessageSquare size={14} />
                    Whatsapp
                  </a>
                </li>
                <li>
                  <a
                    href=" mailto:contact@thevibeaffair.com"
                    className="flex items-center gap-2.5 text-zinc-500 hover:text-zinc-800 text-xs transition-colors duration-200"
                  >
                    <Mail size={14} />
                    Email
                  </a>
                </li>
                <li>
                    <a
                      href="tel:+919673079768"
                      className="flex items-center gap-2.5 text-zinc-500 hover:text-zinc-800 text-xs transition-colors duration-200"
                    >
                      <Phone size={14} />
                      Call
                    </a>
                  </li>
                </ul>
              </motion.div>


              {/* SOCIALS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h4 className="text-lilac-900 font-heading font-semibold text-base mb-10">
                  SOCIALS
                </h4>

                <ul className="space-y-8">
                  <li>
                  <a
                    href="https://www.instagram.com/vibeaffair/"
                    className="flex items-center gap-2.5 text-zinc-500 hover:text-zinc-800 text-xs transition-colors duration-200"
                  >
                    <Instagram size={14} />
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/thevibeaffair/"
                    className="flex items-center gap-2.5 text-zinc-500 hover:text-zinc-800 text-xs transition-colors duration-200"
                  >
                    <Facebook size={14} />
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2.5 text-zinc-500 hover:text-zinc-800 text-xs transition-colors duration-200"
                  >
                    <Youtube size={14} />
                    YouTube
                  </a>
                </li>
                </ul>
              </motion.div>

            </div>
          </div>


          {/* BOTTOM COPYRIGHT */}
          <div className="border-t border-zinc-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-zinc-400 text-xs text-center md:text-left">
              Designed with love for every celebration.
            </p>

            <p className="text-zinc-400 text-xs text-center md:text-right md:ml-auto">
              &copy; 2026 Vibe Affair | All rights reserved.
            </p>
          </div>

        </div>
      </footer>
    </>
  );
}
