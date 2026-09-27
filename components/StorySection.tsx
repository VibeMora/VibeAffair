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
      <div className="max-w-7xl mx-auto pt-8 px-6 lg:px-12 text-center">
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
      <div className="max-w-7xl mx-auto px-6 lg:px-12 ">
        <div className="flex flex-col md:flex-row items-center ">
          {/* Row 1 Left: Colorful Image in natural form (no cropping) */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <motion.div
              className="w-full overflow-hidden "
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeInUp}
            >
              <motion.img
                src="/Founder/1.png"
                alt="Founder Journey"
                className="w-90 h-auto object-contain transition-all duration-700 cursor-pointer"
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
            viewport={{ once: true, margin: '-100px' }}
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
      <div className="w-full relative min-h-[120vh] flex items-center justify-center py-20 px-6 md:px-12 bg-zinc-900 overflow-hidden">
        {/* Background Image - colourful & fixed (parallax/sticky scroll) */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-40 pointer-events-none"
          style={{ backgroundImage: `url('/Founder/Image1.png')` }}
        />
        {/* Dark overlay to ensure contrast and readability for the white text */}
        <div className="absolute inset-0 bg-black/55 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className="flex flex-col items-center space-y-6"
          >


            <h2 className="text-white font-heading text-2xl md:text-3xl lg:text-4xl italic font-light leading-relaxed max-w-8xl">
              <div className="text-white/20 mb-16">
                <Quote size={56} fill="currentColor" className="opacity-45 rotate-180 absolute -left-8 -top-0 transform" />
              </div> Trust the process, follow your heart, & believe that when you take a <strong className=" text-darker-lilac font-semibold text-[#f4d24a] border-b border-[#f4d24a]/25">leap of faith</strong>, the Universe will <strong className=" text-darker-lilac font-semibold text-white border-b border-white/25">catch you</strong>.
            </h2>



            <p className="text-white/60 font-subtitle font-sans text-xs tracking-[0.25em] uppercase">
              — Monica Motwani
            </p>
          </motion.div>
        </div>
      </div>

      {/* ==================== STORY ROW 2 ==================== */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12  space-y-12 md:space-y-20">

        {/* Row 2.1: Left Content, Right Image 2 */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Left: Content Part 1 */}
          <motion.div
            className="w-full md:w-1/2 space-y-custom text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
          >
            <p className="transitional-serif">
              Today, Vibe Affair is more than just a business, it's the realization of a dream that was quietly nurtured and then boldly pursued.
            </p>
            <p className="transitional-serif">
              It's a reflection of everything I value—human connection, creativity, authenticity, and the belief that every celebration, big or small, deserves to feel special and deeply personal.
            </p>
            <p className="transitional-serif max-w-3xl mx-auto text-zinc-600">
              And that's what we strive to create. Not just beautiful setups or perfectly timed schedules, but moments that bring people together, stories that become memories, and experiences that leave hearts a little fuller.
            </p>
            <p className="transitional-serif">I believe that people may forget the details, but they'll always remember how they felt.</p>
            <p className="transitional-serif">
              When you choose Vibe Affair, you're not just choosing an event planner. You're inviting someone who will dream with you, celebrate with you, worry about the little things so you don't have to, and pour her whole heart into creating something that feels truly yours.
            </p>
          </motion.div>

          {/* Right: Image 2 (Uncropped) */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <motion.div
              className="w-full  overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeInUp}
            >
              <motion.img
                src="/Founder/2.png"
                alt="Founder Creative Moments"
                className="w-full h-auto object-contain transition-all duration-700 cursor-pointer"
                variants={imageHover}
                whileHover="hover"
              />
            </motion.div>
          </div>
        </div>

        {/* Row 2.2: Full-Width 2 lines of text
        <motion.div
          className="w-full max-w-4xl mx-auto text-center space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
        >
          <p className="transitional-serif font-medium italic border-l-4 md:border-l-0 md:border-y border-zinc-950/10 py-6 px-4 text-zinc-800 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            "I believe that people may forget the details, but they'll always remember how they felt."
          </p>
        </motion.div> */}

        {/* Row 2.3: Left Image 3, Right Content Part 2 */}
        {/* <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Left: Image 3 (Uncropped) */}
          {/* <div className="w-full md:w-1/2 flex items-center justify-center">
            <motion.div
              className="w-full max-w-[320px] md:max-w-[380px] overflow-hidden rounded-2xl shadow-lg bg-zinc-200"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeInUp}
            >
              <motion.img
                src="/Founder/Image3.jpeg"
                alt="Founder Moments"
                className="w-full h-auto object-contain transition-all duration-700 cursor-pointer"
                variants={imageHover}
                whileHover="hover"
              />
            </motion.div>
          </div>

          {/* Right: Content Part 2 */}
          {/* <motion.div
            className="w-full md:w-1/2 space-y-6 text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
          >
            
            <p className="transitional-serif font-medium">
              And every day, I'm grateful that the Universe trusted me with this dream. ✨
            </p>
          </motion.div>
          
        </div>  */} 
        </div>
        {/* ==================== FULL WIDTH QUOTE SECTION ==================== */}
      <div className="w-full relative min-h-[120vh] flex items-center justify-center py-20 px-6 md:px-12 bg-zinc-900 overflow-hidden">
        {/* Background Image - colourful & fixed (parallax/sticky scroll) */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-40 pointer-events-none"
          style={{ backgroundImage: `url('/Founder/Image3.jpeg')` }}
        />
        {/* Dark overlay to ensure contrast and readability for the white text */}
        <div className="absolute inset-0 bg-black/55 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className="flex flex-col items-center space-y-6"
          >


            <h2 className="text-white font-heading text-2xl md:text-3xl lg:text-4xl italic font-light leading-relaxed max-w-8xl">
              <div className="text-white/20 mb-16">
                <Quote size={56} fill="currentColor" className="opacity-45 rotate-180 absolute -left-8 -top-0 transform" />
              </div> "And every day, I'm grateful that the Universe trusted me with this dream."
            </h2>

          </motion.div>
        </div>
      </div>
      
    </section>
  );
}
// #9a719d
// rgb(255 251 246)