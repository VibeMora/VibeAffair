import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PortfolioSection from '@/components/PortfolioSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import VenueX from '@/components/VenueX';
import SnapSection from '@/components/SnapSection';
import CTAFooter from '@/components/CTAFooter';
import Testimonials from '@/components/Testimonials';
import StorySection from '@/components/StorySection';
import LeaveAsFamily from '@/components/LeaveAsFamily';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden website-bg">
        <StorySection />
        {/* <HeroSection />  */}
         {/* <PortfolioSection /> 
        <WhyChooseSection /> */}
        <VenueX />
        {/* <SnapSection /> */}
        <Testimonials />
        <LeaveAsFamily/>
        <CTAFooter />
      </main>
    </>
  );
}
