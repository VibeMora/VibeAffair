import React from 'react';
import Navbar from '@/components/Navbar';
import StorySection from '@/components/StorySection';
import CTAFooter from '@/components/CTAFooter';
import JourneyAudioPlayer from '@/components/JourneyAudioPlayer';

export const metadata = {
  title: 'Our Journey | Vibe Affair',
  description: 'The story and heart behind Vibe Affair - from corporate life to creating magical celebrations.',
};

export default function OurJourneyPage() {
  return (
    <div className="website-bg min-h-screen">
      <Navbar theme="light" />
      <main className="pt-20 min-h-screen website-bg">
        <StorySection />
      </main>
      {/* Ambient Soundtrack Player */}
      <JourneyAudioPlayer
        src="/Kaleo - Way down we go Instrumental version with HOOK.mp3"
        title="Way Down We Go (Instrumental)"
        artist="KALEO"
        initialVolume={0.4}
      />
      <CTAFooter />
    </div>
  );
}
