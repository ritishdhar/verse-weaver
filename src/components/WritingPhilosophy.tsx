import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedSection } from './AnimatedSection';

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
      className="section-padding relative overflow-hidden bg-charcoal"
    >
      {/* Large quote mark */}
      <motion.div 
        className="absolute top-12 left-8 md:left-16 font-display text-[200px] md:text-[300px] leading-none text-primary/5 pointer-events-none select-none"
        style={{ scale, opacity }}
      >
        "
      </motion.div>

      <div className="container-wide relative z-10">
        <AnimatedSection className="text-center mb-16 md:mb-24">
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4">
            Philosophy
          </p>
          <h2 className="font-display text-display-lg text-foreground max-w-3xl mx-auto">
            The craft is not in the writing, but in the <span className="text-primary">listening</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {philosophyPillars.map((pillar, index) => (
            <AnimatedSection 
              key={pillar.number} 
              delay={index * 0.15}
              className="group"
            >
              <div className="relative p-8 rounded-lg border border-border/50 bg-background/50 hover:border-primary/30 transition-colors duration-500">
                {/* Number */}
                <span className="font-display text-5xl md:text-6xl text-primary/20 group-hover:text-primary/40 transition-colors duration-500">
                  {pillar.number}
                </span>
                
                {/* Title */}
                <h3 className="font-display text-xl md:text-2xl text-foreground mt-4 mb-4">
                  {pillar.title}
                </h3>
                
                {/* Description */}
                <p className="font-body text-muted-foreground leading-relaxed">
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
    </section>
  );
};
