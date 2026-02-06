import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { MagneticButton } from './MagneticButton';
import { StarBackground } from './StarBackground';
import { SectionDivider } from './SectionDivider';
import { PDFViewer } from './PDFViewer';
import { NovelSocial } from './NovelSocial';
import { getReadingProgressKey } from '../lib/visitor';

export const FeaturedNovel = () => {
  const sectionRef = useRef(null);
  const [isPDFOpen, setIsPDFOpen] = useState(false);
  const [hasProgress, setHasProgress] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Check if there's saved reading progress
  useEffect(() => {
    const savedProgress = localStorage.getItem(getReadingProgressKey());
    setHasProgress(savedProgress !== null && savedProgress !== '0');
  }, [isPDFOpen]); // Re-check when modal closes

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-transparent z-10"
    >
      {/* Background and Wave work together to create a solid wavy top edge */}
      <div className="absolute inset-x-0 bottom-0 top-[58px] md:top-[98px] bg-zine-blue" />

      <SectionDivider position="top" color="#1a2c75" invert />

      <StarBackground
        stars={[
          { size: 10, top: '15%', left: '10%', duration: 14 },
          { size: 14, top: '30%', right: '15%', duration: 18, rotateDirection: -1 },
          { size: 8, bottom: '25%', left: '20%', duration: 12 },
          { size: 12, top: '60%', right: '5%', duration: 10 },
          { size: 6, bottom: '10%', right: '25%', duration: 16, rotateDirection: -1 },
        ]}
      />
      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Book Cover */}
          <motion.div
            className="relative"
            style={{ y }}
          >
            <AnimatedSection>
              <div className="relative mx-auto w-[280px] sm:w-[350px] md:w-[450px] max-w-full">
                {/* Book shadow */}
                <div className="absolute inset-0 translate-x-4 translate-y-4 bg-gradient-to-br from-charcoal-light to-charcoal rounded-lg" />

                {/* Book cover with actual image */}
                <div className="relative aspect-[2/3] rounded-lg border border-border overflow-hidden group">
                  {/* Cover Image */}
                  <img
                    src="/images/do-you-hate-me-cover.jpg"
                    alt="Do You Hate Me? by Ritish Dhar"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 z-20 pointer-events-none"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 4,
                      ease: "easeInOut"
                    }}
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(225, 48, 136, 0.1), transparent)'
                    }}
                  />

                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                </div>

                {/* Floating accent */}
                <motion.div
                  className="absolute -top-6 -right-6 w-24 h-24 border border-primary/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            </AnimatedSection>
          </motion.div>

          {/* Content */}
          <div className="space-y-8 text-center lg:text-left px-4 sm:px-0">
            <AnimatedSection delay={0.2}>
              <div className="flex items-center gap-4 mb-4 justify-center lg:justify-start">
                <div className="bg-black px-4 sm:px-6 py-1.5 sm:py-2 inline-block">
                  <p className="font-body text-xs sm:text-sm uppercase tracking-[0.3em] text-primary">
                    Featured Work
                  </p>
                </div>

                {/* Pulsing Status Dot */}
                <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/30">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Updated</span>
                </div>
              </div>
              <h2 className="font-display text-5xl sm:text-7xl md:text-9xl text-foreground mb-6 leading-none tracking-tight">
                Do You Hate Me?
              </h2>
              <p className="font-display text-lg sm:text-xl md:text-2xl text-muted-foreground italic leading-relaxed">
                "A raw exploration of love, longing, and the questions we're afraid to ask.
                Through verse and vulnerability, these poems ask what we all wonder in silence."
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              <div className="flex justify-center lg:justify-start">
                <MagneticButton
                  onClick={() => setIsPDFOpen(true)}
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium"
                >
                  {hasProgress ? 'Continue Reading' : 'Begin Reading'}
                </MagneticButton>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.8}>
              <NovelSocial />
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      <PDFViewer
        isOpen={isPDFOpen}
        onClose={() => setIsPDFOpen(false)}
        pdfUrl="/do-you-hate-me.pdf"
      />
    </section>
  );
};
