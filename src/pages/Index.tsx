import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { FeaturedNovel } from '@/components/FeaturedNovel';
import { AboutWriter } from '@/components/AboutWriter';
import { WritingPhilosophy } from '@/components/WritingPhilosophy';
import { ComingSoon } from '@/components/ComingSoon';
import { Footer } from '@/components/Footer';
import { Preloader } from '@/components/Preloader';
import { PromoNotification } from '@/components/PromoNotification';

const Index = () => {
  // Initialize smooth scrolling
  useSmoothScroll();

  return (
    <>
      <Preloader />
      <PromoNotification />
      <main className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <FeaturedNovel />
        <AboutWriter />
        <WritingPhilosophy />
        <ComingSoon />
        <Footer />
      </main>
    </>
  );
};

export default Index;
