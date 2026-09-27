'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Users, Image } from 'lucide-react';

const tabs = [
  {
    id: 'moments',
    label: 'Moments of Love',
    icon: Heart,
    image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1400',
    description: 'Every stolen glance, every joyful tear — love stories told through our lens.',
  },
  {
    id: 'blockbuster',
    label: 'Blockbuster Experience',
    icon: Star,
    image: 'https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=1400',
    description: 'Grand celebrations that leave guests talking for years to come.',
  },
  {
    id: 'faces',
    label: 'The Happy Faces',
    icon: Users,
    image: 'https://images.pexels.com/photos/1045541/pexels-photo-1045541.jpeg?auto=compress&cs=tinysrgb&w=1400',
    description: 'Genuine smiles, real emotions, and the joy of unforgettable memories.',
  },
  {
    id: 'frames',
    label: 'Frames of Forever',
    icon: Image,
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1400',
    description: 'Timeless frames that freeze your most precious moments forever.',
  },
];

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState('moments');

  const active = tabs.find((t) => t.id === activeTab)!;

  return (
    <section id="portfolio" className="bg-[#faf9f6] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-zinc-900 font-heading font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight mb-2">
            Feel The Vibe!
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2.5 px-4 py-4 rounded-xl border text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-zinc-900 text-white border-zinc-900'
                    : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 hover:text-zinc-900 shadow-sm'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden text-xs">{tab.label.split(' ')[0]}</span>
              </motion.button>
            );
          })}
        </motion.div>

        <div className="relative mt-3 rounded-2xl overflow-hidden" style={{ height: '560px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <img
                src={active.image}
                alt={active.label}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <motion.div
                className="absolute bottom-8 left-8 right-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-white/80 text-sm max-w-md font-body">{active.description}</p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
