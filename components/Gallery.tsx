'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Sparkles,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
  ArrowUpRight,
  Layers,
  Camera,
  Heart,
} from 'lucide-react';

export interface GalleryPhoto {
  id: string | number;
  src: string;
  title: string;
  subtitle?: string;
  aspect?: 'hero' | 'tall' | 'wide' | 'square';
  caption?: string;
}

export interface OccasionCategory {
  id: string;
  title: string;
  tagline: string;
  description: string;
  coverImage: string;
  badge: string;
  photos: GalleryPhoto[];
}

const initialCategories: OccasionCategory[] = [
  {
    id: 'royal-wedding',
    title: 'The Royal Wedding & Mandap',
    tagline: 'Sacred Rituals & Regal Heritage',
    description:
      'Grand mandap architecture, royal palace courtyards, and timeless wedding rituals captured in majestic frames.',
    coverImage: '/Testimonial Thumbnails/06.png',
    badge: 'Flagship Occasion',
    photos: [
      {
        id: 'rw-1',
        src: '/Testimonial Thumbnails/06.png',
        title: 'Cathedral Courtyard Mandap',
        subtitle: 'Heritage Grandeur',
        aspect: 'hero',
        caption: 'Bespoke floral mandap under gothic arches at dusk.',
      },
      {
        id: 'rw-2',
        src: '/Founder/Image2.jpeg',
        title: 'Royal Bridal Veil',
        subtitle: 'Intimate Portrait',
        aspect: 'tall',
        caption: 'Handcrafted zardozi veil caught in soft twilight.',
      },
      {
        id: 'rw-3',
        src: '/Testimonial Thumbnails/02.png',
        title: 'Sacred Agni Pheras',
        subtitle: 'Sacred Vows',
        aspect: 'square',
        caption: 'The sacred steps solemnizing lifelong promises.',
      },
      {
        id: 'rw-4',
        src: '/Founder/1.png',
        title: 'Palace Archway Walk',
        subtitle: 'Architecture',
        aspect: 'wide',
        caption: 'Historic stone colonnade lit by flickering mashaals.',
      },
      {
        id: 'rw-5',
        src: '/Testimonial Thumbnails/04.png',
        title: 'The Regal Groom Procession',
        subtitle: 'Baraat Grandeur',
        aspect: 'tall',
        caption: 'Royal vintage car arrival accompanied by trumpets.',
      },
      {
        id: 'rw-6',
        src: '/Founder/Image3.jpeg',
        title: 'Rose Petal Varmala',
        subtitle: 'Euphoric Exchange',
        aspect: 'square',
        caption: 'Showers of red Indian roses during the garland ceremony.',
      },
      {
        id: 'rw-7',
        src: '/Testimonial Thumbnails/05.png',
        title: 'Heritage Courtyard Panorama',
        subtitle: 'Evening Ambience',
        aspect: 'wide',
        caption: 'Overhead view of the glowing palace amphitheatre.',
      },
      {
        id: 'rw-8',
        src: '/Founder/Image4.jpeg',
        title: 'Sindoor Ceremony',
        subtitle: 'Sacred Emotion',
        aspect: 'square',
        caption: 'A deeply emotional traditional vermilion blessing.',
      },
      {
        id: 'rw-9',
        src: '/Trailers Thumbnails/Rajas&Manali.png',
        title: 'The Royal Couple Portrait',
        subtitle: 'Formal Frame',
        aspect: 'hero',
        caption: 'Timeless portrait against carved sandstone jharokhas.',
      },
    ],
  },
  {
    id: 'sangeet-cocktail',
    title: 'Sangeet & Cocktail Gala',
    tagline: 'Neon Nights & High-Octane Celebration',
    description:
      'Choreographed performances, electrifying concert stages, and couture glamour that burns until sunrise.',
    coverImage: '/Testimonial Thumbnails/07.png',
    badge: 'Celebration Gala',
    photos: [
      {
        id: 'sc-1',
        src: '/Testimonial Thumbnails/07.png',
        title: 'Electric Neon Arena',
        subtitle: 'Concert Stage',
        aspect: 'hero',
        caption: 'High-energy arena stage with bespoke laser production.',
      },
      {
        id: 'sc-2',
        src: '/Founder/Image1.png',
        title: 'Shimmering Cocktail Gown',
        subtitle: 'Couture Glamour',
        aspect: 'tall',
        caption: 'Mirror-work couture lehenga catching the stage spots.',
      },
      {
        id: 'sc-3',
        src: '/Testimonial Thumbnails/03.png',
        title: 'The Couple First Dance',
        subtitle: 'Pure Romance',
        aspect: 'wide',
        caption: 'Cold sparkulars erupting as the couple spins on stage.',
      },
      {
        id: 'sc-4',
        src: '/Founder/Image5.jpeg',
        title: 'Afterparty Beats',
        subtitle: 'Unfiltered Energy',
        aspect: 'square',
        caption: 'Midnight dance floor euphoria with confetti cannons.',
      },
      {
        id: 'sc-5',
        src: '/Trailers Thumbnails/Sai&Vedika.png',
        title: 'Champagne Tower Cheers',
        subtitle: 'Toast to Love',
        aspect: 'tall',
        caption: 'Cascading champagne crystal tower celebration.',
      },
      {
        id: 'sc-6',
        src: '/Testimonial Thumbnails/08.png',
        title: 'Starlit Dance Floor',
        subtitle: 'Aesthetic Lighting',
        aspect: 'square',
        caption: 'Kinetic light canopy suspended above the dance floor.',
      },
      {
        id: 'sc-7',
        src: '/Founder/2.png',
        title: 'The Squad Performance',
        subtitle: 'Friendship & Joy',
        aspect: 'wide',
        caption: 'Electrifying choreographed tribute by the bridesmaids.',
      },
    ],
  },
  {
    id: 'haldi-sunshine',
    title: 'Haldi & Sunshine Carnivals',
    tagline: 'Marigolds, Mirth & Water Splashes',
    description:
      'Sun-drenched yellow courtyards, playful turmeric splashes, marigold garlands, and uninhibited festive laughter.',
    coverImage: '/Testimonial Thumbnails/03.png',
    badge: 'Daytime Carnival',
    photos: [
      {
        id: 'hs-1',
        src: '/Testimonial Thumbnails/03.png',
        title: 'Golden Turmeric Splash',
        subtitle: 'Unfiltered Joy',
        aspect: 'hero',
        caption: 'Pure laughter as vibrant yellow haldi is lovingly showered.',
      },
      {
        id: 'hs-2',
        src: '/Testimonial Thumbnails/01.png',
        title: 'Marigold Canopy Walk',
        subtitle: 'Floral Installation',
        aspect: 'tall',
        caption: 'Draped garlands of fresh genda phool cascading in sunshine.',
      },
      {
        id: 'hs-3',
        src: '/Founder/Image2.jpeg',
        title: 'Brass Urli Ritual',
        subtitle: 'Artisanal Details',
        aspect: 'square',
        caption: 'Traditional brass urli adorned with fresh yellow flower petals.',
      },
      {
        id: 'hs-4',
        src: '/Founder/Image3.jpeg',
        title: 'Floral Petal Shower',
        subtitle: 'Carnival Moments',
        aspect: 'wide',
        caption: 'Friends and family drenching the groom in fragrant blossoms.',
      },
      {
        id: 'hs-5',
        src: '/Testimonial Thumbnails/05.png',
        title: 'Sunlit Poolside Laughter',
        subtitle: 'Vibrant Colors',
        aspect: 'tall',
        caption: 'Poolside cabanas draped in lemon and tangerine silks.',
      },
      {
        id: 'hs-6',
        src: '/Founder/1.png',
        title: 'The Haldi Kiss',
        subtitle: 'Sweet Tenderness',
        aspect: 'square',
        caption: 'A candid golden moment between grandmother and bride.',
      },
    ],
  },
  {
    id: 'mehendi-boho',
    title: 'Mehendi & Boho Soirée',
    tagline: 'Artisanal Henna & Pastel Canopies',
    description:
      'Intricate bridal henna, breezy bohemian teepees, soothing pastel florals, and acoustic daytime melodies.',
    coverImage: '/Testimonial Thumbnails/08.png',
    badge: 'Artisanal Soirée',
    photos: [
      {
        id: 'mb-1',
        src: '/Testimonial Thumbnails/08.png',
        title: 'Bespoke Floral Decor',
        subtitle: 'Design Lab',
        aspect: 'hero',
        caption: 'Wildflower installations and pastel macramé seating pods.',
      },
      {
        id: 'mb-2',
        src: '/Founder/Image4.jpeg',
        title: 'Intricate Henna Details',
        subtitle: 'Bridal Artistry',
        aspect: 'tall',
        caption: 'Micro-fine organic henna telling the couple’s travel story.',
      },
      {
        id: 'mb-3',
        src: '/Testimonial Thumbnails/04.png',
        title: 'Boho Teepee Lounge',
        subtitle: 'Cozy Aesthetics',
        aspect: 'square',
        caption: 'Lush velvet cushions and pampas grass clusters.',
      },
      {
        id: 'mb-4',
        src: '/Founder/Image1.png',
        title: 'Twirling Floral Skirt',
        subtitle: 'Movement & Grace',
        aspect: 'wide',
        caption: 'Hand-painted organza skirt twirling across the green lawns.',
      },
      {
        id: 'mb-5',
        src: '/Testimonial Thumbnails/02.png',
        title: 'Live Acoustic Folk Band',
        subtitle: 'Garden Melodies',
        aspect: 'tall',
        caption: 'Rustic acoustic melodies serenading the daytime gathering.',
      },
      {
        id: 'mb-6',
        src: '/Founder/2.png',
        title: 'Candid Laughter with Mom',
        subtitle: 'Emotional Bond',
        aspect: 'square',
        caption: 'Sharing sweet stories while henna paste dries in the breeze.',
      },
    ],
  },
  {
    id: 'destination-coastal',
    title: 'Destination & Coastal Romance',
    tagline: 'Golden Hour Vows & Shoreline Banquets',
    description:
      'Sun-kissed sea breeze, clifftop vow exchanges, Sula vineyard celebrations, and destination luxury far away.',
    coverImage: '/Testimonial Thumbnails/05.png',
    badge: 'Destination Film',
    photos: [
      {
        id: 'dc-1',
        src: '/Testimonial Thumbnails/05.png',
        title: 'Sula Vineyards Sunset Vows',
        subtitle: 'Vineyard Romance',
        aspect: 'hero',
        caption: 'Golden light cascading over lush grapes during the ceremony.',
      },
      {
        id: 'dc-2',
        src: '/Testimonial Thumbnails/01.png',
        title: 'Coastal Golden Hour',
        subtitle: 'Shoreline Magic',
        aspect: 'tall',
        caption: 'Gentle waves rolling in as the sun dips below the horizon.',
      },
      {
        id: 'dc-3',
        src: '/Founder/Image3.jpeg',
        title: 'Sea-facing Dining Table',
        subtitle: 'Al Fresco Tablecape',
        aspect: 'wide',
        caption: 'Candlelit long tables dressed in white linen beside the ocean.',
      },
      {
        id: 'dc-4',
        src: '/Trailers Thumbnails/Sai&Vedika.png',
        title: 'Barefoot Beach Stroll',
        subtitle: 'Unscripted Love',
        aspect: 'square',
        caption: 'The newly wed couple taking a quiet twilight stroll.',
      },
      {
        id: 'dc-5',
        src: '/Founder/Image5.jpeg',
        title: 'Cliffside Canopy Mandap',
        subtitle: 'Panoramic Drama',
        aspect: 'tall',
        caption: 'Minimalist white floral arch framed by ocean cliffs.',
      },
      {
        id: 'dc-6',
        src: '/Testimonial Thumbnails/07.png',
        title: 'Tiki Torches & Fairy Lights',
        subtitle: 'Evening Vibe',
        aspect: 'square',
        caption: 'Warm ambient glow casting shadows on the sands.',
      },
    ],
  },
  {
    id: 'reception-afterparty',
    title: 'Grand Reception & Afterhours',
    tagline: 'Black-Tie Grandeur & Champagne Elegance',
    description:
      'Couture black tuxedos, grand crystal chandeliers, multi-tiered cakes, and midnight champagne celebrations.',
    coverImage: '/Trailers Thumbnails/Rajas&Manali.png',
    badge: 'Black-Tie Gala',
    photos: [
      {
        id: 'ra-1',
        src: '/Trailers Thumbnails/Rajas&Manali.png',
        title: 'Ballroom Grand Entrance',
        subtitle: 'Regal Majesty',
        aspect: 'hero',
        caption: 'The newlyweds entering under the grand crystal chandelier.',
      },
      {
        id: 'ra-2',
        src: '/Founder/Image1.png',
        title: 'Velvet Tuxedo & Gown',
        subtitle: 'Evening Elegance',
        aspect: 'tall',
        caption: 'Sharp tailoring meets bespoke champagne shimmer gown.',
      },
      {
        id: 'ra-3',
        src: '/Testimonial Thumbnails/02.png',
        title: 'The 5-Tier Cake Cutting',
        subtitle: 'Sweet Memories',
        aspect: 'square',
        caption: 'Handcrafted sugar flower tiers crowned with sparklers.',
      },
      {
        id: 'ra-4',
        src: '/Founder/Image2.jpeg',
        title: 'Midnight Fireworks Finale',
        subtitle: 'Spectacular End',
        aspect: 'wide',
        caption: 'Golden willow fireworks lighting up the starry sky.',
      },
      {
        id: 'ra-5',
        src: '/Testimonial Thumbnails/04.png',
        title: 'Speeches of Love & Tears',
        subtitle: 'Heartfelt Toasts',
        aspect: 'tall',
        caption: 'Emotional father-of-the-bride toast evoking joy and tears.',
      },
      {
        id: 'ra-6',
        src: '/Founder/Image4.jpeg',
        title: 'Vintage Champagne Coupe',
        subtitle: 'Luxury Still',
        aspect: 'square',
        caption: 'Golden bubbly catching warm ballroom chandeliers.',
      },
    ],
  },
];

// Helper to determine dynamic bento tile layout classes that seamlessly pack ANY arbitrary count of photos
function getBentoSpanClasses(photo: GalleryPhoto, index: number): string {
  // If the photo explicitly specifies an aspect, honor it
  if (photo.aspect === 'hero') {
    return 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2 min-h-[360px] md:min-h-[460px]';
  }
  if (photo.aspect === 'tall') {
    return 'col-span-1 row-span-2 min-h-[360px] md:min-h-[460px]';
  }
  if (photo.aspect === 'wide') {
    return 'col-span-1 sm:col-span-2 md:col-span-2 row-span-1 min-h-[220px] md:min-h-[260px]';
  }
  if (photo.aspect === 'square') {
    return 'col-span-1 row-span-1 min-h-[220px] md:min-h-[260px]';
  }

  // Self-adapting rhythmic cycle: index % 7 ensures natural, non-repeating bento harmony
  const pattern = index % 7;
  switch (pattern) {
    case 0:
      // Hero tile (2x2)
      return 'col-span-1 sm:col-span-2 md:col-span-2 row-span-2 min-h-[360px] md:min-h-[460px]';
    case 1:
      // Tall portrait tile (1x2)
      return 'col-span-1 row-span-2 min-h-[360px] md:min-h-[460px]';
    case 2:
    case 3:
      // Square detail tiles (1x1)
      return 'col-span-1 row-span-1 min-h-[220px] md:min-h-[260px]';
    case 4:
      // Cinematic landscape tile (2x1)
      return 'col-span-1 sm:col-span-2 md:col-span-2 row-span-1 min-h-[220px] md:min-h-[260px]';
    case 5:
      // Square detail tile (1x1)
      return 'col-span-1 row-span-1 min-h-[220px] md:min-h-[260px]';
    case 6:
      // Tall portrait tile (1x2)
      return 'col-span-1 row-span-2 min-h-[360px] md:min-h-[460px]';
    default:
      return 'col-span-1 row-span-1 min-h-[220px] md:min-h-[260px]';
  }
}

export default function Gallery() {
  const [categories, setCategories] = useState<OccasionCategory[]>(initialCategories);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const selectedCategory = useMemo(() => {
    return categories.find((cat) => cat.id === selectedCategoryId) || null;
  }, [categories, selectedCategoryId]);

  // Current category photos
  const currentPhotos = selectedCategory ? selectedCategory.photos : [];

  // Active photo in lightbox
  const activeLightboxPhoto =
    lightboxIndex !== null && currentPhotos[lightboxIndex]
      ? currentPhotos[lightboxIndex]
      : null;

  // Keyboard navigation for lightbox & back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === 'Escape') {
          setLightboxIndex(null);
        } else if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) =>
            prev !== null && prev < currentPhotos.length - 1 ? prev + 1 : 0
          );
        } else if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) =>
            prev !== null && prev > 0 ? prev - 1 : currentPhotos.length - 1
          );
        }
      } else if (selectedCategoryId && e.key === 'Escape') {
        setSelectedCategoryId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, currentPhotos.length, selectedCategoryId]);

  // Demo simulator to allow user/tester to dynamically append photos and verify the Bento Grid's adaptability
  const handleAddDemoPhoto = useCallback(() => {
    if (!selectedCategoryId) return;

    const samplePool = [
      {
        title: 'Floral Archway Silhouette',
        subtitle: 'Artisanal Decor',
        src: '/Founder/Image2.jpeg',
      },
      {
        title: 'Sunlit Candid Laughs',
        subtitle: 'Golden Memory',
        src: '/Testimonial Thumbnails/01.png',
      },
      {
        title: 'Vintage Chandelier Glow',
        subtitle: 'Atmosphere',
        src: '/Testimonial Thumbnails/04.png',
      },
      {
        title: 'Couple Twilight Gaze',
        subtitle: 'Cinematic Mood',
        src: '/Founder/Image4.jpeg',
      },
      {
        title: 'Bridal Henna Palms',
        subtitle: 'Intimate Detail',
        src: '/Testimonial Thumbnails/08.png',
      },
      {
        title: 'Overhead Rose Petals',
        subtitle: 'Festive Flora',
        src: '/Founder/1.png',
      },
    ];

    const randomSample = samplePool[Math.floor(Math.random() * samplePool.length)];
    const newId = `${selectedCategoryId}-${Date.now()}`;

    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === selectedCategoryId) {
          return {
            ...cat,
            photos: [
              ...cat.photos,
              {
                id: newId,
                src: randomSample.src,
                title: `${randomSample.title} #${cat.photos.length + 1}`,
                subtitle: randomSample.subtitle,
                caption:
                  'A newly captured luxury moment seamlessly packed into the dynamic bento grid.',
              },
            ],
          };
        }
        return cat;
      })
    );
  }, [selectedCategoryId]);

  return (
    <div className="min-h-screen bg-[#090b0e] text-white selection:bg-[#9a719d]/30 selection:text-white">
      {/* Subtle brand ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[1200px] h-[50vh] bg-radial from-[#9a719d]/15 via-transparent to-transparent blur-3xl opacity-70" />
        <div className="absolute top-[60%] right-[10%] w-[60vw] max-w-[800px] h-[40vh] bg-radial from-[#9a719d]/10 via-transparent to-transparent blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-20 sm:py-24">
        {/* ========================================================================= */}
        {/* VIEW 1: CATEGORIZATION OF OCCASIONS (3 BOXES PER ROW)                     */}
        {/* ========================================================================= */}
        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            <motion.div
              key="category-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              {/* Header Section */}
              <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#9a719d]/40 bg-[#9a719d]/10 text-[#dca2e0] text-xs font-mono tracking-widest uppercase mb-4"
                >
                  <Sparkles size={13} className="text-[#9a719d]" />
                  Curated Occasions & Themes
                </motion.div>

                <h1 className="header-css text-3xl sm:text-5xl md:text-6xl font-serif text-[#9a719d] tracking-tight">
                  The Gallery
                </h1>

                <p className="mt-4 text-zinc-400 text-sm sm:text-base font-sans max-w-2xl mx-auto leading-relaxed">
                  Explore bespoke celebrations categorized by occasion and theme. Click any curation to open its full adaptable Bento Grid collection.
                </p>
              </div>

              {/* 3 BOXES PER ROW GRID LAYOUT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
                {categories.map((category, idx) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    whileHover={{ y: -6 }}
                    onClick={() => setSelectedCategoryId(category.id)}
                    className="group relative rounded-3xl overflow-hidden cursor-pointer border border-[#9a719d]/25 hover:border-[#9a719d]/70 transition-all duration-500 bg-[#0e1117] shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(154,113,157,0.22)]"
                  >
                    {/* Aspect container for 3-box-per-row card */}
                    <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={category.coverImage}
                        alt={category.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />

                      {/* Dark gradient vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e1117] via-[#0e1117]/40 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                        <span className="px-3 py-1 rounded-full bg-black/60 border border-[#9a719d]/40 backdrop-blur-md text-[11px] font-mono tracking-wider text-[#dca2e0] uppercase">
                          {category.badge}
                        </span>

                      </div>

                      {/* Explore Arrow Button */}
                      <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#9a719d] text-white flex items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_15px_rgba(154,113,157,0.7)]">
                        <ArrowUpRight size={17} />
                      </div>
                    </div>

                    {/* Bottom Card Content */}
                    <div className="p-6 sm:p-7 relative z-10">
                      <p className="text-[11px] font-mono tracking-[0.2em] text-[#9a719d] uppercase mb-1">
                        {category.tagline}
                      </p>

                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-white group-hover:text-[#dca2e0] transition-colors mb-2">
                        {category.title}
                      </h3>

                      <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                        {category.description}
                      </p>

                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* ========================================================================= */
            /* VIEW 2: ADAPTABLE DYNAMIC BENTO GRID LAYOUT                               */
            /* ========================================================================= */
            <motion.div
              key="bento-grid-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              {/* Bento Sticky Navigation Bar */}
              <div className="sticky top-20 z-40 bg-[#090b0e]/90 backdrop-blur-xl border border-[#9a719d]/25 rounded-2xl p-4 sm:p-5 mb-8 sm:mb-10 shadow-[0_10px_30px_rgba(0,0,0,0.7)] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedCategoryId(null)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#9a719d] hover:bg-[#9a719d]/15 text-zinc-300 hover:text-white transition-all text-xs font-medium cursor-pointer"
                  >
                    <ArrowLeft size={15} className="text-[#9a719d]" />
                    <span>All Occasions</span>
                  </button>

                  <div className="h-5 w-[1px] bg-white/10 hidden sm:block" />

                  <div>
                    <h2 className="text-base sm:text-lg font-serif font-bold text-white leading-tight">
                      {selectedCategory.title}
                    </h2>
                    <span className="text-[11px] font-mono text-[#9a719d] tracking-wider uppercase">
                      {selectedCategory.tagline} • {selectedCategory.photos.length} Frames
                    </span>
                  </div>
                </div>

                {/* Right Actions: Add Photo Simulator & Category Switcher */}
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleAddDemoPhoto}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#9a719d]/20 border border-[#9a719d]/50 hover:bg-[#9a719d] text-[#dca2e0] hover:text-white transition-all text-xs font-medium cursor-pointer shadow-sm"
                    title="Simulate adding more photos to test dynamic bento adaptability"
                  >
                    <Plus size={14} />
                    <span>Add Photo</span>
                  </button>
                </div>
              </div>

              {/* Theme Quick Switcher Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      cat.id === selectedCategoryId
                        ? 'bg-[#9a719d] text-white shadow-[0_0_12px_rgba(154,113,157,0.5)]'
                        : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {cat.title.split('&')[0].trim()}
                  </button>
                ))}
              </div>

              {/* ADAPTABLE DYNAMIC BENTO GRID ENGINE */}
              {/* Uses grid-auto-flow: dense so any arbitrary count of items flows naturally into balanced bento geometry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 grid-flow-dense auto-rows-[220px] md:auto-rows-[240px]">
                {currentPhotos.map((photo, index) => {
                  const spanClasses = getBentoSpanClasses(photo, index);

                  return (
                    <motion.div
                      key={photo.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.45, delay: (index % 10) * 0.04 }}
                      onClick={() => setLightboxIndex(index)}
                      className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-[#9a719d]/25 hover:border-[#9a719d] bg-[#101319] shadow-md hover:shadow-[0_10px_30px_rgba(154,113,157,0.25)] transition-all duration-300 ${spanClasses}`}
                    >
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                        loading="lazy"
                      />

                      {/* Glassmorphic Gradient Vignette on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                      {/* Subtle Lilac Inner Hairline Border */}
                      <div className="absolute inset-[5px] rounded-[12px] border border-[#9a719d]/25 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Top Right Zoom Icon */}
                      <div className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-black/60 border border-[#9a719d]/40 backdrop-blur-md text-[#dca2e0] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105">
                        <Maximize2 size={14} />
                      </div>

                      {/* Bottom Caption Information */}
                      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                        {photo.subtitle && (
                          <p className="text-[10px] font-mono tracking-widest uppercase text-[#dca2e0] mb-0.5">
                            {photo.subtitle}
                          </p>
                        )}
                        <h4 className="text-sm sm:text-base font-serif font-bold text-white leading-tight">
                          {photo.title}
                        </h4>
                        {photo.caption && (
                          <p className="text-zinc-400 text-xs mt-1 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {photo.caption}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bento Footer Navigation */}
              <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedCategoryId(null)}
                  className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#9a719d] hover:text-[#dca2e0] transition-colors cursor-pointer"
                >
                  <ArrowLeft size={15} />
                  <span>Return to All Themes & Occasions</span>
                </button>

                <p className="text-xs text-zinc-500 font-mono">
                  Showing {currentPhotos.length} curated frames in {selectedCategory.title}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========================================================================= */}
      {/* FULLSCREEN PHOTO LIGHTBOX MODAL                                           */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeLightboxPhoto && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8"
          >
            {/* Lightbox Top Bar */}
            <div className="w-full flex items-center justify-between z-20">
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
                <Camera size={14} className="text-[#9a719d]" />
                <span>
                  {lightboxIndex + 1} / {currentPhotos.length}
                </span>
                <span className="mx-2">•</span>
                <span className="text-[#dca2e0]">{selectedCategory?.title}</span>
              </div>

              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#9a719d] text-white flex items-center justify-center transition-colors cursor-pointer focus:outline-none"
                title="Close Lightbox (Esc)"
              >
                <X size={20} />
              </button>
            </div>

            {/* Lightbox Central Image & Navigation */}
            <div
              className="relative flex-1 w-full max-w-6xl flex items-center justify-center my-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev Button */}
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev !== null && prev > 0 ? prev - 1 : currentPhotos.length - 1
                  )
                }
                className="absolute left-2 sm:left-4 z-20 w-11 h-11 rounded-full bg-black/60 border border-[#9a719d]/40 text-[#dca2e0] hover:text-white hover:bg-[#9a719d] transition-all flex items-center justify-center cursor-pointer"
                title="Previous photo"
              >
                <ChevronLeft size={24} />
              </button>

              <motion.img
                key={activeLightboxPhoto.id}
                src={activeLightboxPhoto.src}
                alt={activeLightboxPhoto.title}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] border border-[#9a719d]/30"
              />

              {/* Next Button */}
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((prev) =>
                    prev !== null && prev < currentPhotos.length - 1 ? prev + 1 : 0
                  )
                }
                className="absolute right-2 sm:right-4 z-20 w-11 h-11 rounded-full bg-black/60 border border-[#9a719d]/40 text-[#dca2e0] hover:text-white hover:bg-[#9a719d] transition-all flex items-center justify-center cursor-pointer"
                title="Next photo"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Lightbox Bottom Info */}
            <div
              className="w-full max-w-2xl text-center z-20 px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-1">
                {activeLightboxPhoto.title}
              </h3>
              {activeLightboxPhoto.caption && (
                <p className="text-zinc-400 text-xs sm:text-sm">
                  {activeLightboxPhoto.caption}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
