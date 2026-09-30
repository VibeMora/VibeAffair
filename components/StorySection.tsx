'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function StorySection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' as const }
    }
  };

  const imageHover = {
    hover: { scale: 1.03, transition: { duration: 0.5, ease: 'easeInOut' as const } }
  };

  return (
    <section id="story" className="website-bg overflow-hidden">
      {/* ==================== HEADING SECTION ==================== */}
      <div className="website-bg max-w-7xl mx-auto pt-10 md:pt-16 pb-4 px-6 lg:px-12 text-center">
        <motion.div
          id="comp-ly6ycl0u15"
          className="N8MGzv _v6ohL ZS_qLz PO9MfV comp-ly6ycl0u15 wixui-rich-text inline-block"
          data-testid="richTextElement"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h3 className="font_4 wixui-rich-text__text text-lilac-900">
            <span className="font_4 wixui-rich-text__text">Meet Our Founder</span>
          </h3>
        </motion.div>

        <motion.p
          className="text-zinc-400 font-subtitle font-sans text-xs tracking-[0.3em] uppercase mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          The Heart & Soul of Vibe Affair
        </motion.p>
      </div>

      {/* ==================== STORY ROW 1 ==================== */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 md:py-16">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Row 1 Left: Colorful Image in natural form (no cropping) */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
            <motion.div
              className="w-full max-w-[340px] sm:max-w-[400px] md:max-w-[450px] overflow-hidden mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeInUp}
            >
              <motion.img
                src="/Founder/1.png"
                alt="Founder Journey - Monica Motwani"
                className="w-full h-auto object-contain transition-all duration-700 cursor-pointer drop-shadow-md mx-auto select-none"
                variants={imageHover}
                whileHover="hover"
              />
            </motion.div>
          </div>

          {/* Row 1 Right: Beginning Text */}
          <motion.div
            className="w-full md:w-1/2 space-y-custom text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeInUp}
          >
            <p className="transitional-serif">
              My journey is one of breaking free from the ordinary to create something extraordinary.
            </p>
            <p className="transitional-serif">
              For nearly five years, I lived the life I had always imagined for myself as an engineer in the corporate world. But somewhere along the way, I realized that the moments that brought me the most joy were never found in spreadsheets or meetings—they were found in people, celebrations, emotions, and the magic that unfolds when meaningful moments are shared.
            </p>
            <p className="transitional-serif">
              With no grand business plan or any business partner—just a few supportive friends, family and a head full of dreams—I quit my job. It was a leap of faith, a moment where I decided to trust in the Universe and embrace the unknown.
            </p>
            <p className="transitional-serif">
              Then, one ordinary day during my notice period, sitting in the cafeteria of my IT company, everything crystallized, and Vibe Affair was born.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ==================== FULL WIDTH QUOTE SECTION ==================== */}
      <div className="w-full relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[85vh] flex items-center justify-center py-16 sm:py-20 md:py-28 px-6 md:px-12 bg-zinc-900 overflow-hidden">
        {/* Background Image - colourful & fixed on desktop, responsive scroll on iOS/mobile */}
        <div
          className="absolute inset-0 bg-cover bg-[center_28%] sm:bg-center opacity-40 pointer-events-none founder-parallax-bg"
          style={{ backgroundImage: `url('/Founder/Image1.png')` }}
        />
        {/* Dark overlay to ensure contrast and readability for the white text */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeInUp}
            className="flex flex-col items-center space-y-6"
          >
            {/* Opening Quote Icon */}
            <div className="text-white/30 flex justify-center mb-2 sm:mb-4">
              <Quote className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rotate-180 fill-current opacity-40" />
            </div>

            <h2 className="text-white font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed max-w-3xl mx-auto">
              Trust the process, follow your heart, &amp; believe that when you take a{' '}
              <strong className="text-[#f4d24a] font-semibold italic border-b border-[#f4d24a]/25">
                leap of faith
              </strong>
              , the Universe will{' '}
              <strong className="text-white font-semibold italic border-b border-white/25">
                catch you
              </strong>
              .
            </h2>

            <p className="text-white/60 font-subtitle font-sans text-xs tracking-[0.25em] uppercase">
              — Monica Motwani
            </p>
          </motion.div>
        </div>
      </div>

      {/* ==================== STORY ROW 2 ==================== */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 md:py-16">
        {/* Row 2.1: Left Content, Right Image 2 */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Left: Content Part 1 */}
          <motion.div
            className="w-full md:w-1/2 space-y-custom text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeInUp}
          >
            <p className="transitional-serif">
              Today, Vibe Affair is more than just a business, it&apos;s the realization of a dream that was quietly nurtured and then boldly pursued.
            </p>
            <p className="transitional-serif">
              It&apos;s a reflection of everything I value—human connection, creativity, authenticity, and the belief that every celebration, big or small, deserves to feel special and deeply personal.
            </p>
            <p className="transitional-serif max-w-3xl mx-auto text-zinc-600">
              And that&apos;s what we strive to create. Not just beautiful setups or perfectly timed schedules, but moments that bring people together, stories that become memories, and experiences that leave hearts a little fuller.
            </p>
            <p className="transitional-serif">I believe that people may forget the details, but they&apos;ll always remember how they felt.</p>
            <p className="transitional-serif">
              When you choose Vibe Affair, you&apos;re not just choosing an event planner. You&apos;re inviting someone who will dream with you, celebrate with you, worry about the little things so you don&apos;t have to, and pour her whole heart into creating something that feels truly yours.
            </p>
          </motion.div>

          {/* Right: Image 2 (Uncropped) */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <motion.div
              className="w-full max-w-[340px] sm:max-w-[400px] md:max-w-[450px] overflow-hidden mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeInUp}
            >
              <motion.img
                src="/Founder/2.png"
                alt="Founder Creative Moments - Monica Motwani"
                className="w-full h-auto object-contain transition-all duration-700 cursor-pointer drop-shadow-md mx-auto select-none"
                variants={imageHover}
                whileHover="hover"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ==================== FULL WIDTH QUOTE SECTION 2 ==================== */}
      <div className="w-full relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[85vh] flex items-center justify-center py-16 sm:py-20 md:py-28 px-6 md:px-12 bg-zinc-900 overflow-hidden">
        {/* Background Image - colourful & fixed on desktop, responsive scroll on iOS/mobile */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 pointer-events-none founder-parallax-bg"
          style={{ backgroundImage: `url('/Founder/Image3.jpeg')` }}
        />
        {/* Dark overlay to ensure contrast and readability for the white text */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeInUp}
            className="flex flex-col items-center space-y-6"
          >
            {/* Opening Quote Icon */}
            <div className="text-white/30 flex justify-center mb-2 sm:mb-4">
              <Quote className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rotate-180 fill-current opacity-40" />
            </div>

            <h2 className="text-white font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed max-w-3xl mx-auto">
              And every day, I&apos;m grateful that the{' '}
              <strong className="text-[#f4d24a] font-semibold italic border-b border-[#f4d24a]/25">
                Universe
              </strong>{' '}
              trusted me with this dream.
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
}