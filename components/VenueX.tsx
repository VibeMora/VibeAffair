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
    <section className="website-bg py-20 overflow-hidden relative border-t border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 text-center">
        
        <motion.h2
          className="header-css"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Vibing Across Venues
        </motion.h2>
        <motion.span
          className="text-zinc-400 font-subtitle font-sans text-xs tracking-[0.3em] uppercase mt-4"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Partner Locations
        </motion.span>
       
      </div>

      <div className="max-w-7xl mx-auto px-1 lg:px-12 grid grid-cols-9 gap-2">
        {allLogos.map((logo, index) => (
          <motion.div
            key={`${logo.name}-${index}`}
            className="flex w-full aspect-square items-center justify-center p-0 sm:p-1 bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-zinc-100 hover:border-yellow-500/20 hover:scale-105 hover:shadow-md transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: Math.min(index * 0.03, 0.4) }}
          >
            <img
              src={logo.src}
              alt={logo.name}
              className="max-w-full max-h-full p-[0.25px] sm:p-1 object-contain filter transition-all duration-300"
              draggable={false}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
