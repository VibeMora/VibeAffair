import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PortfolioSection from '@/components/PortfolioSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import VenueX from '@/components/VenueX';
import SnapSection from '@/components/SnapSection';
import CTAFooter from '@/components/CTAFooter';
import Testimonials from '@/components/Testimonials';
import StorySection from '@/components/StorySection';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <StorySection />
        {/* <HeroSection /> */}
        {/* <PortfolioSection /> */}
        {/* <WhyChooseSection /> */}
        <VenueX />
        {/* <SnapSection /> */}
        <Testimonials />
        <CTAFooter />
      </main>
    </>
  );
}
