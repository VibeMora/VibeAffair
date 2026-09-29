'use client';

import { useEffect, useRef, useCallback } from 'react';

interface JourneyAudioPlayerProps {
  src?: string;
  initialVolume?: number;
  title?: string;
  artist?: string;
}

/**
 * Invisible ambient soundtrack player for /our-journey.
 * Plays the track in the background on loop with no on-screen UI or pause controls.
 */
export default function JourneyAudioPlayer({
  src = '/Kaleo - Way down we go Instrumental version with HOOK.mp3',
  initialVolume = 0.45,
}: JourneyAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth volume fade-in helper
  const fadeIn = useCallback(
    (targetVol = initialVolume, durationMs = 1500) => {
      if (!audioRef.current) return;
      const audio = audioRef.current;
      audio.volume = 0;
      const steps = 25;
      const stepTime = durationMs / steps;
      const volStep = targetVol / steps;

      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

      fadeIntervalRef.current = setInterval(() => {
        if (!audioRef.current) {
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
          return;
        }
        if (audio.volume + volStep >= targetVol) {
          audio.volume = targetVol;
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        } else {
          audio.volume = Math.min(1, audio.volume + volStep);
        }
      }, stepTime);
    },
    [initialVolume]
  );

  useEffect(() => {
    const audio = new Audio(encodeURI(src));
    audio.loop = true;
    audio.preload = 'auto';
    audioRef.current = audio;

    // Attempt direct autoplay
    audio
      .play()
      .then(() => {
        fadeIn(initialVolume);
      })
      .catch(() => {
        // If autoplay is blocked by browser policy, start on first user interaction
        const startOnGesture = () => {
          if (audioRef.current && audioRef.current.paused) {
            audioRef.current
              .play()
              .then(() => {
                fadeIn(initialVolume);
              })
              .catch(() => {});
          }
          cleanupListeners();
        };

        const cleanupListeners = () => {
          window.removeEventListener('click', startOnGesture);
          window.removeEventListener('scroll', startOnGesture);
          window.removeEventListener('keydown', startOnGesture);
          window.removeEventListener('touchstart', startOnGesture);
        };

        window.addEventListener('click', startOnGesture, { once: true, passive: true });
        window.addEventListener('scroll', startOnGesture, { once: true, passive: true });
        window.addEventListener('keydown', startOnGesture, { once: true, passive: true });
        window.addEventListener('touchstart', startOnGesture, { once: true, passive: true });
      });

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, [src, fadeIn, initialVolume]);

  // Completely invisible: no on-screen controller, widget, or pause option
  return null;
}
