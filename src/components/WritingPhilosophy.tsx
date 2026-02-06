import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { SectionDivider } from './SectionDivider';

const philosophyPillars = [
  {
    number: '01',
    title: 'Intentional Silence',
    description: 'Every pause carries meaning. I craft the spaces between words with as much care as the words themselves.',
  },
  {
    number: '02',
    title: 'Emotional Truth',
    description: 'Beyond beautiful language lies a deeper purpose — to touch the raw, authentic core of human experience.',
  },
  {
    number: '03',
    title: 'Timeless Resonance',
    description: 'I write for the reader who will discover these words tomorrow, in a decade, in a century.',
  },
];

export const WritingPhilosophy = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-zine-blue z-10"
    >
      <SectionDivider position="top" color="#E13088" />
      {/* Large quote mark */}
      <motion.div
        className="absolute top-12 left-8 md:left-16 font-display text-[120px] sm:text-[200px] md:text-[300px] leading-none text-primary/5 pointer-events-none select-none"
        style={{ scale, opacity }}
      >
        "
      </motion.div>

      <div className="container-wide relative z-10">
        <AnimatedSection className="text-center mb-12 md:mb-24 px-4 sm:px-0">
          <div className="bg-black px-4 sm:px-6 py-1.5 sm:py-2 mb-4 inline-block">
            <p className="font-body text-xs sm:text-sm uppercase tracking-[0.3em] text-primary">
              Philosophy
            </p>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-display-lg text-foreground max-w-3xl mx-auto leading-tight">
            The craft is not in the writing, but in the <span className="text-primary">listening</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {philosophyPillars.map((pillar, index) => (
            <AnimatedSection
              key={pillar.number}
              delay={index * 0.15}
              className="group px-4 sm:px-0"
            >
              <div className="relative p-6 sm:p-8 rounded-lg border border-border/50 bg-background/50 hover:border-primary/30 transition-colors duration-500">
                {/* Number */}
                <span className="font-display text-4xl sm:text-5xl md:text-6xl text-primary/20 group-hover:text-primary/40 transition-colors duration-500">
                  {pillar.number}
                </span>

                {/* Title */}
                <h3 className="font-display text-lg sm:text-xl md:text-2xl text-foreground mt-4 mb-4">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="font-body text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {pillar.description}
                </p>

                {/* Hover accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* TV Girl Inspired Moon Decor */}
      <motion.div
        className="absolute bottom-4 right-4 md:bottom-0 md:right-0 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[350px] md:h-[350px] text-white/[0.07] pointer-events-none select-none z-0"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg viewBox="0 0 100 100" fill="currentColor" className="drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]">
          <path d="M50,10 A40,40 0 1,0 90,50 A30,30 0 1,1 50,10" />
        </svg>
      </motion.div>
    </section>
  );
};
