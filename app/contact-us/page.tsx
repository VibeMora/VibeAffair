import Navbar from '@/components/Navbar';
import ContactUs from '@/components/ContactUs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Vibe Affair',
  description: 'Let’s get your party started! Reach out to Vibe Affair via email, phone, or schedule a virtual meet.',
};

export default function ContactUsPage() {
  return (
    <>
      <Navbar theme="dark" />
      <main className="min-h-screen bg-[#0a0a0a]">
        <ContactUs />
      </main>
    </>
  );
}
