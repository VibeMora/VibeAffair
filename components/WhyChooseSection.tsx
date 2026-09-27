'use client';

import { motion } from 'framer-motion';
import { CircleCheck as CheckCircle2, CircleHelp as HelpCircle } from 'lucide-react';

const reasons = [
  'We are trendsetters, not followers!',
  'We are detail fanatics with a touch of OCD (Obsessive CREATIVE Design) !',
  'We are budget wizards!',
  'We have got the connections ( & not just Wi-Fi) !',
];

export default function WhyChooseSection() {
  return (
    <section id="story" className="bg-[#faf9f6] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="rounded-2xl overflow-hidden aspect-[4/5] max-w-md shadow-md">
              <img
                src="https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Team Vibe Affair"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full border border-zinc-200 hidden lg:block"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute -top-6 -left-6 bg-white/85 backdrop-blur-sm border border-zinc-200/50 rounded-xl px-5 py-3 hidden lg:block shadow-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-zinc-900 font-bold text-2xl font-subtitle">4+</p>
              <p className="text-zinc-500 text-xs font-subtitle uppercase tracking-wider">Years Crafting Magic</p>
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="text-zinc-900 font-heading font-bold text-4xl lg:text-5xl leading-[1.1] tracking-tight">
              Why choose team VA to curate your event?
            </h2>

            <div className="space-y-5">
              {reasons.map((reason, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 group"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <CheckCircle2
                    size={20}
                    className="text-emerald-500 shrink-0 mt-0.5"
                  />
                  <p className="text-zinc-700 text-base leading-relaxed group-hover:text-zinc-900 transition-colors font-body">
                    {reason}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="flex items-start gap-4 pt-4 border-t border-zinc-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <HelpCircle size={18} className="text-zinc-400 shrink-0 mt-0.5" />
              <p className="text-zinc-400 text-sm font-body">
                Still unsure if we are the right fit? Let&apos;s jump on a call !
              </p>
            </motion.div>

            <motion.a
              href="/contact-us"
              className="inline-flex items-center gap-2 bg-zinc-900 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-zinc-800 transition-all duration-200 shadow-md"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              Schedule a Call
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
