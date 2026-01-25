import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { MagneticButton } from './MagneticButton';

export const FeaturedNovel = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="novel" 
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Book Cover */}
          <motion.div 
            className="relative"
            style={{ y }}
          >
            <AnimatedSection>
              <div className="relative mx-auto max-w-sm lg:max-w-md">
                {/* Book shadow */}
                <div className="absolute inset-0 translate-x-4 translate-y-4 bg-gradient-to-br from-charcoal-light to-charcoal rounded-lg" />
                
                {/* Book cover placeholder */}
                <div className="relative aspect-[2/3] bg-gradient-to-br from-secondary to-charcoal-light rounded-lg border border-border overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-16 h-px bg-primary mb-8" />
                    <h3 className="font-display text-display-sm text-foreground mb-2">
                      Echoes of
                    </h3>
                    <h3 className="font-display text-display-md text-primary mb-4">
                      Silence
                    </h3>
                    <p className="font-body text-sm text-muted-foreground uppercase tracking-widest">
                      A Poetry Novel
                    </p>
                    <div className="w-16 h-px bg-primary mt-8" />
                  </div>

                  {/* Subtle texture overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
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
          <div className="space-y-8">
            <AnimatedSection delay={0.2}>
              <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4">
                Featured Work
              </p>
              <h2 className="font-display text-display-md text-foreground mb-6">
                Echoes of Silence
              </h2>
              <p className="font-display text-xl md:text-2xl text-muted-foreground italic leading-relaxed">
                "In the space between heartbeats, where shadows whisper secrets to the light, 
                I found the words that had been waiting — patient as stone, fluid as dreams."
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <p className="font-body text-muted-foreground leading-relaxed">
                A collection of verses woven into narrative, exploring the landscapes 
                of memory, loss, and the quiet resilience of the human spirit. 
                Each chapter unfolds like a meditation, inviting readers into 
                moments of profound stillness and revelation.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              <div className="flex flex-wrap gap-4">
                <MagneticButton className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium">
                  Begin Reading
                </MagneticButton>
                <MagneticButton className="px-8 py-4 border border-border rounded-full font-medium text-foreground hover:border-primary/50 transition-colors">
                  Sample Chapter
                </MagneticButton>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};
