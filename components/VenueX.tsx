'use client';

import { motion } from 'framer-motion';

const row1Logos = [
  { name: 'Mumbai Cricket Association', src: '/VALogos/Mumbai Cricket Association logo.png' },
  { name: 'Mirage Hotel', src: '/VALogos/Mirage hotel logo.png' },
  { name: 'Taj', src: '/VALogos/Taj logo.png' },
  { name: 'Vijan Mahal', src: '/VALogos/vijan mahal logo.png' },
  { name: 'NSCI', src: '/VALogos/NSCI logo.png' },
  { name: 'Sahara Star', src: '/VALogos/Sahara star logo.png' },
  { name: 'Exotica', src: '/VALogos/Exotica logo.png' },
  { name: 'Blabber All Day', src: '/VALogos/blabber all day logo.png' },
  { name: 'The Game Palacio', src: '/VALogos/the game palacio logo.png' },
];

const row2Logos = [
  { name: 'Hilton', src: '/VALogos/Hilton logo.png' },
  { name: 'Courtyard by Marriott', src: '/VALogos/courtyard by marriott logo.png' },
  { name: 'Zenmai', src: '/VALogos/Zenmai logo.png' },
  { name: 'Sula Vineyards', src: '/VALogos/Sula vineyards logo.png' },
  { name: 'House No. 230', src: '/VALogos/House No230 logo.png' },
  { name: 'Purple Panda', src: '/VALogos/Purple panda logo.png' },
  { name: 'Koa', src: '/VALogos/koa logo.png' },
  { name: 'Sun n Sand', src: '/VALogos/Sun n sand logo.png' },
  { name: '145 Andheri', src: '/VALogos/145 Andheri logo.png' },
];

const row3Logos = [
  { name: 'The Food Studio', src: '/VALogos/The food studio logo.png' },
  { name: 'Raymond', src: '/VALogos/Raymond logo.png' },
  { name: 'Islam Gymkhana', src: '/VALogos/islam gymkhana logo.png' },
  { name: 'Lamba Celebrations', src: '/VALogos/Lamba celebrations logo.png' },
  { name: 'Butterfly High', src: '/VALogos/butterfly high logo.png' },
  { name: 'Finch', src: '/VALogos/finch logo.png' },
  { name: 'US Club Colaba', src: '/VALogos/US Club Colaba logo.png' },
  { name: 'TSEC', src: '/VALogos/thadomal shahani engineering college logo.png' },
  { name: '88 Kitchen and Bar', src: '/VALogos/88 kitchen and bar logo.png' },
];

const allLogos = [...row1Logos, ...row2Logos, ...row3Logos];

export default function VenueX() {
  return (
    <section className="website-bg py-14 sm:py-16 md:py-20 lg:py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-10 sm:mb-12 md:mb-16 text-center">
        <motion.h2
          className="header-css mb-3 sm:mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Vibing Across Venues
        </motion.h2>
        <motion.span
          className="text-zinc-400 font-subtitle font-sans text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase block mt-2 sm:mt-4"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Partner Locations
        </motion.span>
      </div>

      {/* Responsive Partner Locations Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-2.5 sm:gap-3 lg:gap-3.5">
        {allLogos.map((logo, index) => (
          <motion.div
            key={`${logo.name}-${index}`}
            className="flex w-full aspect-square items-center justify-center p-2.5 sm:p-2 md:p-2.5 lg:p-3 bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-zinc-100 hover:border-zinc-200 hover:shadow-md transition-all duration-300 cursor-pointer group"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: Math.min((index % 9) * 0.03, 0.3) }}
          >
            <img
              src={logo.src}
              alt={logo.name}
              className="max-w-full max-h-full object-contain filter group-hover:scale-105 transition-transform duration-300"
              draggable={false}
            />
          </motion.div>
        ))}
      </div>

      {/* Side-by-side Heading & India Map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-10 md:pt-14 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        {/* Last Line Heading */}
        <motion.h2
          className="header-css w-full md:w-1/2 text-zinc-500 font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-snug sm:leading-relaxed text-center md:!text-left px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          We've worked wherever the <span className="italic text-lilac-900">celebration wanted to be</span>
        </motion.h2>

        {/* India Map with Pinned Locations */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col items-center justify-center px-4"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full max-w-[300px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto flex items-center justify-center">
            <img
              src="/india-map-transparent.png"
              alt="Map of India showing Vibe Affair event locations"
              className="w-full h-auto object-contain drop-shadow-sm select-none pointer-events-none"
              draggable={false}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
