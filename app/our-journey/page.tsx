import Navbar from '@/components/Navbar';
import StorySection from '@/components/StorySection';
import CTAFooter from '@/components/CTAFooter';

export default function OurJourneyPage() {
  return (
    <>
      <Navbar theme="light" />
      <main className="pt-20 min-h-screen bg-[#faf9f6]">
        <StorySection />
      </main>
      <CTAFooter />
    </>
  );
}
