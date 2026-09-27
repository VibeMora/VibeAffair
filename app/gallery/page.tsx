import React from 'react';
import Navbar from '@/components/Navbar';
import Gallery from '@/components/Gallery';
import CTAFooter from '@/components/CTAFooter';

export const metadata = {
  title: 'Gallery | Vibe Affair',
  description:
    'Curated wedding occasions and bespoke themes in an adaptable luxury Bento Grid layout.',
};

export default function GalleryPage() {
  return (
    <>
      <Navbar theme="dark" />
      <main className="overflow-hidden">
        <Gallery />
      </main>
      <CTAFooter />
    </>
  );
}
