'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Plus,
  Minus,
  Download,
  LayoutGrid,
  MoreVertical,
  X,
  KeyRound,
  LogOut,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Film,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '../Navbar';

export interface LandscapeVideoItem {
  id: string | number;
  title: string;
  category?: string;
  videoSrc: string;
  poster?: string;
}

const defaultVideos: LandscapeVideoItem[] = [
  {
    id: 1,
    title: 'Cathedral Courtyard Arch',
    category: 'Architecture',
    videoSrc: '/Trailers/Rajas&ManaliTrailer.mov',
    poster: '/Trailers Thumbnails/Rajas&Manali.png',
  },
  {
    id: 2,
    title: 'Sula Vineyards Sunset Vows',
    category: 'Destination',
    videoSrc: '/Trailers/Vedika & Sai  - The Wedding Trailer.mp4',
    poster: '/Trailers Thumbnails/Sai&Vedika.png',
  },
  // {
  //   id: 3,
  //   title: 'Neon Sangeet Lights',
  //   category: 'Celebration',
  //   videoSrc: '/Testimonial videos/VIDEO-2026-04-27-12-55-59 (2).mp4',
  //   poster: '/Testimonial Thumbnails/07.png',
  // },
  // {
  //   id: 4,
  //   title: 'Moments of Pure Joy',
  //   category: 'Emotions',
  //   videoSrc: '/Testimonial videos/Groom_Mom_RMWedding.mp4',
  //   poster: '/Testimonial Thumbnails/03.png',
  // },
  // {
  //   id: 5,
  //   title: 'Heritage Palace Mandap',
  //   category: 'Tradition',
  //   videoSrc: '/Testimonial videos/Bride_Mom_RMWedding.MP4',
  //   poster: '/Testimonial Thumbnails/02.png',
  // },
  // {
  //   id: 6,
  //   title: 'Executive Royal Ceremony',
  //   category: 'Grandeur',
  //   videoSrc: '/Testimonial videos/Luv Chaturvedi_AAWedding.mov',
  //   poster: '/Testimonial Thumbnails/04.png',
  // },
  // {
  //   id: 7,
  //   title: 'Coastal Golden Hour',
  //   category: 'Romantic',
  //   videoSrc: '/Testimonial videos/Bride & Groom Dads_YRWedding.mov',
  //   poster: '/Testimonial Thumbnails/01.png',
  // },
  // {
  //   id: 8,
  //   title: 'Bespoke Floral Decor',
  //   category: 'Design Lab',
  //   videoSrc: '/Testimonial videos/Yash&Rucha.mov',
  //   poster: '/Testimonial Thumbnails/08.png',
  // },
  // {
  //   id: 9,
  //   title: 'Grand Entrance Canopy',
  //   category: 'Decor & Styling',
  //   videoSrc: '/Testimonial videos/VIDEO-2026-04-27-12-55-59 (1).mp4',
  //   poster: '/Founder/1.png',
  // },
  // {
  //   id: 10,
  //   title: 'Architectural Heritage Walk',
  //   category: 'Atmosphere',
  //   videoSrc: '/Testimonial videos/Sula Vibeyards Wedding.mp4',
  //   poster: '/Founder/2.png',
  // },
  // {
  //   id: 11,
  //   title: 'Founder Curation Highlights',
  //   category: 'Behind the Scenes',
  //   videoSrc: '/Testimonial videos/VIDEO-2026-04-27-12-55-59 (2).mp4',
  //   poster: '/Founder/Image1.png',
  // },
  // {
  //   id: 12,
  //   title: 'Fairytale Stage Lighting',
  //   category: 'Production',
  //   videoSrc: '/Testimonial videos/Groom_Mom_RMWedding.mp4',
  //   poster: '/Founder/Image2.jpeg',
  // },
  // {
  //   id: 13,
  //   title: 'Celebration Grand Finale',
  //   category: 'Unfiltered Magic',
  //   videoSrc: '/Testimonial videos/Bride_Mom_RMWedding.MP4',
  //   poster: '/Founder/Image3.jpeg',
  // },
];

interface AdminGalleryProps {
  onLogout?: () => void;
}

export default function AdminGallery({ onLogout }: AdminGalleryProps) {
  const [videos, setVideos] = useState<LandscapeVideoItem[]>(defaultVideos);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHoveringCenter, setIsHoveringCenter] = useState(false);

  // Modals & Menu
  const [showMenu, setShowMenu] = useState(false);
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showGridModal, setShowGridModal] = useState(false);

  // New video inputs
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newVideoSrc, setNewVideoSrc] = useState('');
  const [newPoster, setNewPoster] = useState('');

  // Password update states
  const [newPassword, setNewPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const scrubberRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Switch active video & pause others
  useEffect(() => {
    videoRefs.current.forEach((vid) => {
      if (vid) {
        vid.pause();
        vid.currentTime = 0;
      }
    });

    setIsPlaying(false);
    setCurrentTime(0);

    const activeVid = videoRefs.current[activeIndex];
    if (activeVid) {
      activeVid.currentTime = 0;
      setDuration(activeVid.duration || 0);
    } else {
      setDuration(0);
    }
  }, [activeIndex]);

  // Sync mute state
  useEffect(() => {
    videoRefs.current.forEach((vid) => {
      if (vid) vid.muted = isMuted;
    });
  }, [isMuted]);

  // Play / Pause toggle
  const togglePlay = useCallback(() => {
    const activeVid = videoRefs.current[activeIndex];
    if (!activeVid) return;

    if (activeVid.paused) {
      activeVid
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      activeVid.pause();
      setIsPlaying(false);
    }
  }, [activeIndex]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < videos.length - 1 ? prev + 1 : 0));
  }, [videos.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : videos.length - 1));
  }, [videos.length]);

  // Fullscreen active card
  const toggleFullScreen = () => {
    const activeVid = videoRefs.current[activeIndex];
    if (!activeVid) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      activeVid.requestFullscreen().catch(() => {});
    }
  };

  // Keyboard navigation & space to toggle play
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'Escape') {
        setShowMenu(false);
        setIsAddingVideo(false);
        setIsChangingPassword(false);
        setShowGridModal(false);
      }
    };

    let lastWheel = 0;
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheel < 350) return;
      if (Math.abs(e.deltaX) > 25 || Math.abs(e.deltaY) > 40) {
        if (e.deltaX > 25 || e.deltaY > 40) {
          handleNext();
          lastWheel = now;
        } else if (e.deltaX < -25 || e.deltaY < -40) {
          handlePrev();
          lastWheel = now;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [handleNext, handlePrev, togglePlay]);

  // Time formatter: e.g. 0:02 / 0:08
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleTimeUpdate = (index: number) => {
    if (index === activeIndex) {
      const activeVid = videoRefs.current[activeIndex];
      if (activeVid) {
        setCurrentTime(activeVid.currentTime);
        if (activeVid.duration && !isNaN(activeVid.duration)) {
          setDuration(activeVid.duration);
        }
      }
    }
  };

  // Scrubber seek
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const activeVid = videoRefs.current[activeIndex];
    if (!activeVid || !scrubberRef.current) return;

    const rect = scrubberRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const target = ratio * (activeVid.duration || 0);

    activeVid.currentTime = target;
    setCurrentTime(target);
    activeVid
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  };

  // Add new video
  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEntry: LandscapeVideoItem = {
      id: Date.now(),
      title: newTitle.trim(),
      category: newCategory.trim() || 'Landscape Film',
      videoSrc: newVideoSrc.trim(),
      poster: newPoster.trim() || undefined,
    };

    setVideos((prev) => [newEntry, ...prev]);
    setActiveIndex(0);
    setIsAddingVideo(false);
    setNewTitle('');
    setNewCategory('');
    setNewVideoSrc('');
    setNewPoster('');
  };

  // Delete active video
  const handleDeleteActive = () => {
    if (videos.length <= 1) return;
    const confirmDelete = window.confirm(
      `Remove "${videos[activeIndex].title}" from gallery?`
    );
    if (!confirmDelete) return;

    setVideos((prev) => prev.filter((_, idx) => idx !== activeIndex));
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  // Download active video
  const handleDownloadActive = () => {
    const current = videos[activeIndex];
    if (!current || !current.videoSrc) return;
    window.open(current.videoSrc, '_blank');
  };

  // Update password
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }

    setIsUpdating(true);
    try {
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'thevibeaffair@gmail.com' }),
      });
      const data = await res.json();
      if (data.success && data.previewUrl) {
        const token = new URL(data.previewUrl).searchParams.get('token');
        const updateRes = await fetch('/api/admin/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, newPassword }),
        });
        const updateData = await updateRes.json();
        if (updateData.success) {
          setPasswordSuccess(true);
          setNewPassword('');
          setTimeout(() => {
            setIsChangingPassword(false);
            setPasswordSuccess(false);
          }, 1800);
        } else {
          setPasswordError(updateData.error || 'Failed to update password');
        }
      } else {
        setPasswordError(data.error || 'Failed to initialize password update');
      }
    } catch {
      setPasswordError('Error updating password');
    } finally {
      setIsUpdating(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      if (onLogout) {
        onLogout();
      } else {
        window.location.href = '/admin';
      }
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const currentVideo = videos[activeIndex] || null;

  // Stardust & Sparkle background particles
  const sparkles = useMemo(() => {
    const items = [];
    const count = 70;
    for (let i = 0; i < count; i++) {
      // Gaussian-like concentration around the horizontal middle band
      const x = Math.random() * 100;
      const yDist = (Math.random() - 0.5) * 2;
      const y = 50 + yDist * 20; // 30% to 70% height
      const size = Math.random() < 0.25 ? 3.5 : Math.random() < 0.6 ? 2 : 1.2;
      const opacity = Math.random() * 0.75 + 0.25;
      const delay = Math.random() * 4;
      const duration = 2.5 + Math.random() * 3.5;
      const isStar = Math.random() < 0.2;
      items.push({ id: i, x, y, size, opacity, delay, duration, isStar });
    }
    return items;
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-screen h-screen overflow-hidden bg-black text-white flex flex-col justify-between items-center select-none z-50"
      style={{
        fontFamily: 'var(--font-sans), system-ui, -apple-system, sans-serif',
      }}
    >
      {/* ==================== LILAC GLOW & STARDUST BACKGROUND ==================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Deep ambient dark gradient */}
        <div className="absolute inset-0 bg-radial from-[#140e16] via-[#050505] to-[#000000] opacity-90" />

        {/* Central horizontal elliptical lilac aura matching reference */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] max-w-[1400px] h-[50vh] rounded-[100%] opacity-40 blur-3xl pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 65% 35% at 50% 50%, rgba(154, 113, 157, 0.45) 0%, rgba(122, 85, 125, 0.25) 45%, rgba(0, 0, 0, 0) 75%)',
          }}
        />

        {/* Inner radiant corona */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[950px] h-[32vh] rounded-[100%] opacity-35 blur-2xl pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 40% at 50% 50%, rgba(220, 162, 224, 0.5) 0%, rgba(154, 113, 157, 0.25) 60%, transparent 80%)',
          }}
        />

        {/* Lilac Stardust & Bokeh Particle Field */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="lilac-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {sparkles.map((p) =>
            p.isStar ? (
              <g
                key={p.id}
                transform={`translate(${(p.x / 100) * 1920}, ${(p.y / 100) * 1080})`}
                filter="url(#lilac-glow)"
                className="animate-pulse"
                style={{
                  animationDuration: `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                  opacity: p.opacity,
                }}
              >
                {/* 4-point lilac star */}
                <path
                  d={`M 0 -${p.size * 2.5} Q 0 0 ${p.size * 2.5} 0 Q 0 0 0 ${p.size * 2.5} Q 0 0 -${p.size * 2.5} 0 Q 0 0 0 -${p.size * 2.5}`}
                  fill="#dca2e0"
                />
              </g>
            ) : (
              <circle
                key={p.id}
                cx={`${p.x}%`}
                cy={`${p.y}%`}
                r={p.size}
                fill="#9a719d"
                filter="url(#lilac-glow)"
                className="animate-pulse"
                style={{
                  animationDuration: `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                  opacity: p.opacity,
                }}
              />
            )
          )}
        </svg>
      </div>
          <Navbar/>
      {/* ==================== SLEEK FLOATING TOP BAR ==================== */}
      <header className="relative z-40 w-full px-6 sm:px-10 py-24 flex items-center justify-between pointer-events-auto">
       
        {/* Top Center: Minimal Page Counter */}
        <div className="flex flex-col items-center">
          <span className="text-[#9a719d] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase drop-shadow-[0_0_8px_rgba(154,113,157,0.4)]">
            Admin Gallery
          </span>
          <span className="text-zinc-500 text-[11px] font-mono mt-0.5 tracking-wider">
            {activeIndex + 1} / {videos.length}
          </span>
        </div>

      </header>

      {/* ==================== 3D COVERFLOW TIERED CAROUSEL ==================== */}
      <main className="relative flex-1 w-full flex items-center justify-center overflow-visible z-10">
        {/* Sleek Lilac Left Chevron Arrow matching reference */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-3 sm:left-8 md:left-12 lg:left-16 z-40 p-3 text-[#9a719d] hover:text-[#dca2e0] hover:scale-110 active:scale-95 transition-all duration-300 drop-shadow-[0_0_15px_rgba(154,113,157,0.6)] cursor-pointer group focus:outline-none"
          aria-label="Previous video"
        >
          <svg
            width="32"
            height="54"
            viewBox="0 0 32 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-10 sm:w-8 sm:h-14 transition-transform duration-300 group-hover:-translate-x-1"
          >
            <path
              d="M28 4L6 27L28 50"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Sleek Lilac Right Chevron Arrow matching reference */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-3 sm:right-8 md:right-12 lg:right-16 z-40 p-3 text-[#9a719d] hover:text-[#dca2e0] hover:scale-110 active:scale-95 transition-all duration-300 drop-shadow-[0_0_15px_rgba(154,113,157,0.6)] cursor-pointer group focus:outline-none"
          aria-label="Next video"
        >
          <svg
            width="32"
            height="54"
            viewBox="0 0 32 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-10 sm:w-8 sm:h-14 transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              d="M4 4L26 27L4 50"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Carousel Tracks & Cards Container */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x < -40 || info.velocity.x < -180) {
              handleNext();
            } else if (info.offset.x > 40 || info.velocity.x > 180) {
              handlePrev();
            }
          }}
          className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          {videos.map((video, index) => {
            // Symmetrical wrapped offset so carousel loops infinitely and renders 7 cards: -3, -2, -1, 0, 1, 2, 3
            const total = videos.length;
            let offset = index - activeIndex;

            // Normalize offset to range [-half, +half]
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const absOffset = Math.abs(offset);
            const isActive = offset === 0;

            // Only render up to 3 cards on each side (total 7 cards), matching the reference screenshot exactly
            if (absOffset > 3) return null;

            // Horizontal progressive offsets matching reference screenshot:
            // Center is 0.
            // Tier 1 (±1): ±165px
            // Tier 2 (±2): ±290px
            // Tier 3 (±3): ±395px
            const xOffset =
              offset === 0
                ? 0
                : (offset < 0 ? -1 : 1) *
                  (absOffset === 1 ? 165 : absOffset === 2 ? 295 : 405);

            // Progressive scale: 1.0 -> 0.90 -> 0.81 -> 0.72
            const scale =
              offset === 0 ? 1 : Math.max(0.7, 1 - absOffset * 0.095);

            // Center is highest zIndex; cards cascade backwards
            const zIndex = 50 - absOffset * 10;

            // Opacity & brightness gradations matching reference image
            const opacity =
              offset === 0 ? 1 : absOffset === 1 ? 0.92 : absOffset === 2 ? 0.72 : 0.48;

            return (
              <motion.div
                key={video.id}
                onClick={() => {
                  if (!isActive) {
                    setActiveIndex(index);
                  }
                }}
                className="absolute cursor-pointer will-change-transform"
                style={{
                  zIndex,
                }}
                initial={false}
                animate={{
                  x: xOffset,
                  scale,
                  opacity,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 30,
                  mass: 0.8,
                }}
              >
                {/* ==================== CARD FRAME (EXACT LUXURY LILAC DOUBLE RIM) ==================== */}
                <div
                  onMouseEnter={() => isActive && setIsHoveringCenter(true)}
                  onMouseLeave={() => isActive && setIsHoveringCenter(false)}
                  className={`relative w-[86vw] sm:w-[540px] md:w-[650px] lg:w-[740px] xl:w-[790px] aspect-[16/9] rounded-[24px] sm:rounded-[28px] overflow-hidden transition-all duration-500 bg-[#0e1014] ${
                    isActive
                      ? 'shadow-[0_0_40px_rgba(154,113,157,0.35),0_25px_70px_rgba(0,0,0,0.95)]'
                      : 'shadow-[0_15px_40px_rgba(0,0,0,0.85)] hover:brightness-110'
                  }`}
                  style={{
                    // Outer Metallic Lilac Border
                    border: '1.8px solid #9a719d',
                    boxShadow: isActive
                      ? '0 0 35px rgba(154, 113, 157, 0.4), 0 25px 65px rgba(0, 0, 0, 0.95)'
                      : '0 0 15px rgba(154, 113, 157, 0.15), 0 20px 50px rgba(0, 0, 0, 0.9)',
                  }}
                >
                  {/* Subtle top & bottom edge highlight sheen */}
                  <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#dca2e0] to-transparent opacity-80 pointer-events-none z-30" />
                  <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#9a719d] to-transparent opacity-60 pointer-events-none z-30" />

                  {/* Delicate Inner Lilac Hairline Frame matching reference */}
                  <div className="absolute inset-[6px] sm:inset-[8px] rounded-[18px] sm:rounded-[22px] border border-[#9a719d]/45 pointer-events-none z-20 shadow-[inset_0_0_12px_rgba(154,113,157,0.15)]" />

                  {/* ==================== CARD VIDEO / THUMBNAIL PLACEHOLDER CONTENT ==================== */}
                  {/* Video Player */}
                  {video.videoSrc && (
                    <video
                      ref={(el) => {
                        videoRefs.current[index] = el;
                      }}
                      src={video.videoSrc}
                      playsInline
                      muted={isMuted}
                      preload={isActive ? 'auto' : 'none'}
                      onLoadedMetadata={(e) => {
                        if (index === activeIndex) {
                          setDuration(e.currentTarget.duration || 0);
                        }
                      }}
                      onTimeUpdate={() => handleTimeUpdate(index)}
                      onEnded={() => {
                        setIsPlaying(false);
                        setCurrentTime(0);
                        const activeVid = videoRefs.current[activeIndex];
                        if (activeVid) activeVid.currentTime = 0;
                      }}
                      className="w-full h-full object-cover rounded-[22px] sm:rounded-[26px]"
                      onClick={(e) => {
                        if (isActive) {
                          e.stopPropagation();
                          togglePlay();
                        }
                      }}
                    />
                  )}

                  {/* Thumbnail Poster Image: ALWAYS visible until user clicks Play on active card, and ALWAYS visible on all side cards! */}
                  {video.poster && (
                    <img
                      src={video.poster}
                      alt={video.title}
                      className={`absolute inset-0 w-full h-full object-cover rounded-[22px] sm:rounded-[26px] z-10 transition-opacity duration-300 pointer-events-none ${
                        isActive && isPlaying ? 'opacity-0 invisible' : 'opacity-100 visible'
                      }`}
                    />
                  )}

                  {/* Fallback placeholder when neither videoSrc nor poster is provided */}
                  {!video.videoSrc && !video.poster && (
                    <div className="w-full h-full bg-[#0a0c10] flex flex-col items-center justify-center p-6 text-center rounded-[22px] sm:rounded-[26px] relative overflow-hidden">
                      <div className="absolute inset-0 bg-radial from-[#9a719d]/10 via-transparent to-transparent pointer-events-none" />
                      <div className="w-16 h-16 rounded-full border border-[#9a719d]/30 flex items-center justify-center mb-3 bg-[#9a719d]/5 shadow-[0_0_20px_rgba(154,113,157,0.2)]">
                        <Film className="w-8 h-8 text-[#9a719d]" />
                      </div>
                      <h4 className="text-[#dca2e0] font-serif text-lg sm:text-xl font-medium tracking-wide">
                        {video.title}
                      </h4>
                      <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest">
                        {video.category || 'Landscape Film'}
                      </p>
                    </div>
                  )}

                  {/* Side Card Dimming Scrim Overlay */}
                  {!isActive && (
                    <div
                      className={`absolute inset-0 transition-colors pointer-events-none ${
                        absOffset === 1
                          ? 'bg-black/45'
                          : absOffset === 2
                          ? 'bg-black/65'
                          : 'bg-black/80'
                      }`}
                    />
                  )}

                  {/* ==================== ACTIVE CARD PLAY BUTTON OVERLAY ==================== */}
                  {isActive && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                      }}
                      className={`absolute inset-0 z-30 flex items-center justify-center transition-opacity duration-300 ${
                        isPlaying && !isHoveringCenter ? 'opacity-0' : 'opacity-100'
                      }`}
                    >
                      <button
                        type="button"
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/50 border border-[#9a719d] backdrop-blur-md flex items-center justify-center text-[#9a719d] hover:text-[#dca2e0] hover:border-[#dca2e0] shadow-[0_0_30px_rgba(154,113,157,0.45)] transition-all transform hover:scale-110 active:scale-95 cursor-pointer focus:outline-none"
                        title={isPlaying ? 'Pause Video' : 'Play Video'}
                      >
                        {isPlaying ? (
                          <Pause size={30} fill="#9a719d" className="text-[#9a719d]" />
                        ) : (
                          <Play
                            size={30}
                            fill="#9a719d"
                            className="text-[#9a719d] ml-1.5"
                          />
                        )}
                      </button>
                    </div>
                  )}

                  {/* Active Card Bottom Subtitle / Info Banner (visible on hover or paused) */}
                  {isActive && (
                    <div
                      className={`absolute bottom-3 left-6 right-6 z-20 flex items-center justify-between pointer-events-none transition-opacity duration-300 ${
                        isPlaying && !isHoveringCenter ? 'opacity-0' : 'opacity-100'
                      }`}
                    >
                      <div>
                        <p className="text-white text-xs sm:text-sm font-semibold tracking-wide drop-shadow-md">
                          {video.title}
                        </p>
                        <p className="text-[#9a719d]/80 text-[10px] sm:text-xs font-mono tracking-widest uppercase mt-0.5">
                          {video.category || 'Landscape Film'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </main>

      {/* ==================== MINIMAL FLOATING CONTROLS FOOTER ==================== */}
      <footer className="relative z-40 w-full px-6 py-5 flex flex-col items-center gap-3 pointer-events-auto">
        {/* Timeline Scrubber Bar with Lilac Fill */}
        <div className="w-full max-w-xl flex items-center gap-4 px-3 py-2 rounded-full bg-black/60 border border-[#9a719d]/30 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={togglePlay}
            className="text-[#9a719d] hover:text-[#dca2e0] transition-colors cursor-pointer p-0.5 flex-shrink-0 focus:outline-none"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause size={18} fill="#9a719d" className="text-[#9a719d]" />
            ) : (
              <Play size={18} fill="#9a719d" className="text-[#9a719d]" />
            )}
          </button>

          {/* Time Display */}
          <span className="text-[11px] font-mono text-[#9a719d]/90 whitespace-nowrap min-w-[68px]">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          {/* Lilac Scrubber */}
          <div
            ref={scrubberRef}
            onClick={handleSeek}
            className="relative flex-1 h-1.5 bg-white/15 hover:bg-white/25 rounded-full cursor-pointer transition-all"
            title="Seek timeline"
          >
            <div
              className="h-full bg-gradient-to-r from-[#9a719d] to-[#dca2e0] rounded-full relative"
              style={{ width: `${progressPercent}%` }}
            />
            <div
              className="w-3 h-3 bg-[#dca2e0] rounded-full absolute top-1/2 -translate-y-1/2 -translate-x-1/2 shadow-[0_0_8px_rgba(154,113,157,0.8)] pointer-events-none"
              style={{ left: `${progressPercent}%` }}
            />
          </div>

          {/* Audio Mute/Unmute */}
          <button
            type="button"
            onClick={toggleMute}
            className="text-[#9a719d] hover:text-[#dca2e0] transition-colors cursor-pointer p-0.5 flex-shrink-0 focus:outline-none"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? (
              <VolumeX size={18} className="text-[#9a719d]" />
            ) : (
              <Volume2 size={18} className="text-[#9a719d]" />
            )}
          </button>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={toggleFullScreen}
            className="text-[#9a719d] hover:text-[#dca2e0] transition-colors cursor-pointer p-0.5 flex-shrink-0 focus:outline-none"
            title="Fullscreen Video"
          >
            <Maximize2 size={16} className="text-[#9a719d]" />
          </button>
        </div>

        {/* Action icons row (Delete active video, Download, Add) */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDeleteActive}
            disabled={videos.length <= 1}
            className="w-8 h-8 rounded-full bg-black/60 border border-[#9a719d]/30 flex items-center justify-center text-[#9a719d]/70 hover:text-[#9a719d] hover:border-[#9a719d]/60 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            title="Remove active video"
          >
            <Minus size={14} />
          </button>

          <button
            type="button"
            onClick={handleDownloadActive}
            disabled={!currentVideo?.videoSrc}
            className="w-8 h-8 rounded-full bg-black/60 border border-[#9a719d]/30 flex items-center justify-center text-[#9a719d]/70 hover:text-[#9a719d] hover:border-[#9a719d]/60 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            title="Open / Download active video"
          >
            <Download size={14} />
          </button>

          <button
            type="button"
            onClick={() => setIsAddingVideo(true)}
            className="w-8 h-8 rounded-full bg-black/60 border border-[#9a719d]/30 flex items-center justify-center text-[#9a719d]/70 hover:text-[#9a719d] hover:border-[#9a719d]/60 transition-all cursor-pointer"
            title="Add landscape video"
          >
            <Plus size={15} />
          </button>
        </div>
      </footer>

      {/* ==================== ADD LANDSCAPE VIDEO MODAL ==================== */}
      <AnimatePresence>
        {isAddingVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIsAddingVideo(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#0e1117] border border-[#9a719d]/40 rounded-3xl p-7 shadow-[0_0_50px_rgba(0,0,0,0.9)] text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsAddingVideo(false)}
                className="absolute top-5 right-5 p-1.5 text-[#9a719d]/60 hover:text-[#9a719d] rounded-full hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={18} className="text-[#9a719d]" />
                <h3 className="text-xl font-bold font-serif text-[#9a719d]">
                  Add Landscape Video
                </h3>
              </div>
              <p className="text-zinc-400 text-xs mb-5">
                Add a new landscape video to showcase in the luxury coverflow gallery
              </p>

              <form onSubmit={handleAddVideo} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#9a719d] mb-1.5 uppercase tracking-wider">
                    Video Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Cathedral Courtyard Arch"
                    className="w-full px-4 py-2.5 bg-black/50 border border-[#9a719d]/30 rounded-xl text-white text-sm focus:outline-none focus:border-[#9a719d]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#9a719d] mb-1.5 uppercase tracking-wider">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="e.g. Architecture, Destination, Highlights"
                    className="w-full px-4 py-2.5 bg-black/50 border border-[#9a719d]/30 rounded-xl text-white text-sm focus:outline-none focus:border-[#9a719d]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#9a719d] mb-1.5 uppercase tracking-wider">
                    Landscape Video URL / Path (Can leave blank)
                  </label>
                  <input
                    type="text"
                    value={newVideoSrc}
                    onChange={(e) => setNewVideoSrc(e.target.value)}
                    placeholder="e.g. /Testimonial videos/your-video.mp4 or leave blank"
                    className="w-full px-4 py-2.5 bg-black/50 border border-[#9a719d]/30 rounded-xl text-white text-sm focus:outline-none focus:border-[#9a719d]"
                  />
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Accepts MP4, MOV, or web streams. If left blank, a luxury monogram placeholder will be displayed.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#9a719d] mb-1.5 uppercase tracking-wider">
                    Thumbnail Poster URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={newPoster}
                    onChange={(e) => setNewPoster(e.target.value)}
                    placeholder="e.g. /Testimonial Thumbnails/01.png"
                    className="w-full px-4 py-2.5 bg-black/50 border border-[#9a719d]/30 rounded-xl text-white text-sm focus:outline-none focus:border-[#9a719d]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddingVideo(false)}
                    className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-medium transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-[#9a719d] to-[#c293c6] hover:from-[#895f8c] hover:to-[#9a719d] text-white font-semibold text-xs transition-all shadow-[0_0_15px_rgba(154,113,157,0.4)] cursor-pointer"
                  >
                    Add Video
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================== ALL VIDEOS GRID OVERVIEW MODAL ==================== */}
      <AnimatePresence>
        {showGridModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setShowGridModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-[#0e1117] border border-[#9a719d]/40 rounded-3xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#9a719d]/20">
                <div>
                  <h3 className="text-lg font-bold font-serif text-[#9a719d]">
                    All Gallery Cards ({videos.length})
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Click any card to spotlight it in the center
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowGridModal(false)}
                  className="p-1.5 text-[#9a719d]/60 hover:text-[#9a719d] rounded-full hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {videos.map((vid, idx) => (
                  <div
                    key={vid.id}
                    onClick={() => {
                      setActiveIndex(idx);
                      setShowGridModal(false);
                    }}
                    className={`group relative aspect-[16/9] rounded-xl overflow-hidden border cursor-pointer transition-all ${
                      idx === activeIndex
                        ? 'border-[#dca2e0] ring-2 ring-[#9a719d] shadow-[0_0_15px_rgba(154,113,157,0.4)] scale-[1.02]'
                        : 'border-[#9a719d]/30 hover:border-[#9a719d]/70'
                    }`}
                  >
                    {vid.poster ? (
                      <img
                        src={vid.poster}
                        alt={vid.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#121620] flex items-center justify-center text-xs text-[#9a719d]/60">
                        Video {idx + 1}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute bottom-2 left-2 right-2 text-left">
                      <p className="text-[11px] font-medium text-white truncate">
                        {vid.title}
                      </p>
                      <p className="text-[9px] text-[#9a719d]/80 font-mono">
                        Card {idx + 1}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================== CHANGE PASSWORD MODAL ==================== */}
      <AnimatePresence>
        {isChangingPassword && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setIsChangingPassword(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-[#0e1117] border border-[#9a719d]/40 rounded-3xl p-7 shadow-[0_0_50px_rgba(0,0,0,0.9)] text-white z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsChangingPassword(false)}
                className="absolute top-5 right-5 p-1.5 text-[#9a719d]/60 hover:text-[#9a719d] rounded-full hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <h3 className="text-xl font-bold font-serif text-[#9a719d] mb-1">
                Change Password
              </h3>
              <p className="text-zinc-400 text-xs mb-5">
                Define a new master password for the admin portal
              </p>

              {passwordSuccess ? (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs text-center py-6">
                  <CheckCircle2
                    size={28}
                    className="mx-auto text-emerald-400 mb-2"
                  />
                  <p className="font-semibold text-sm mb-1">
                    Password Updated!
                  </p>
                  <p>Your master password has been changed successfully.</p>
                </div>
              ) : (
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  {passwordError && (
                    <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
                      {passwordError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-[#9a719d] mb-1.5 uppercase tracking-wider">
                      New Password (Min 6 chars)
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-4 py-3 bg-black/50 border border-[#9a719d]/30 rounded-xl text-white text-sm focus:outline-none focus:border-[#9a719d]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdating || newPassword.length < 6}
                    className="w-full bg-gradient-to-r from-[#9a719d] to-[#c293c6] hover:from-[#895f8c] hover:to-[#9a719d] text-white text-sm font-semibold py-3 rounded-full transition-all shadow-[0_0_15px_rgba(154,113,157,0.4)] cursor-pointer disabled:opacity-50"
                  >
                    {isUpdating ? 'Saving...' : 'Update Password'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
