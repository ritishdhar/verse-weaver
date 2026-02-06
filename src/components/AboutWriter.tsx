import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation';
import { StarBackground } from './StarBackground';
import { SectionDivider } from './SectionDivider';

export const AboutWriter = () => {
  return (
    <section id="about" className="section-padding relative overflow-hidden bg-zine-pink z-10">
      <SectionDivider position="top" color="#1a2c75" />
      <StarBackground
        stars={[
          { size: 12, top: '10%', right: '5%', duration: 15 },
          { size: 8, bottom: '15%', left: '10%', duration: 12, rotateDirection: -1 },
          { size: 15, top: '40%', left: '20%', duration: 20 },
          { size: 6, bottom: '30%', right: '15%', duration: 10 },
          { size: 10, top: '60%', right: '25%', duration: 14, rotateDirection: -1 },
        ]}
      />
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Portrait */}
          <AnimatedSection className="order-2 lg:order-1">
            <div className="relative mx-auto w-[280px] sm:w-[350px] lg:w-full max-w-md lg:mx-0">
              {/* Frame */}
              <div className="absolute -inset-4 border border-primary/20 rounded-lg" />

              {/* Portrait Image */}
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-white/10">
                <img
                  src="/images/ritish-portrait.jpg"
                  alt="Ritish Dhar Portrait"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Decorative element */}
              <motion.div
                className="absolute -bottom-8 -right-8 font-display text-[120px] leading-none text-primary/10 pointer-events-none select-none"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Content */}
          <motion.div
            className="order-1 lg:order-2 space-y-8 text-center lg:text-left px-4 sm:px-0"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={fadeUpVariants}>
              <div className="bg-black px-4 sm:px-6 py-1.5 sm:py-2 mb-4 inline-block mx-auto lg:mx-0">
                <p className="font-body text-xs sm:text-sm uppercase tracking-[0.3em] text-white">
                  The Writer
                </p>
              </div>
              <h2 className="font-display text-5xl sm:text-7xl md:text-8xl text-white mb-6 leading-none">
                Crafting Worlds <br />
                <span className="text-white/60">One Word at a Time</span>
              </h2>
            </motion.div>

            <motion.p
              variants={fadeUpVariants}
              className="font-display text-lg sm:text-xl text-white/80 italic leading-relaxed"
            >
              I’m Ritish Dhar — a designer, writer, and poet who believes stories don’t just live in books, but in colors, spacing, and silence between lines.
            </motion.p>

            <motion.div variants={fadeUpVariants} className="space-y-6">
              <p className="font-body text-white/90 leading-relaxed text-base sm:text-lg">
                I craft visuals with the same care I give to verses, shaping emotion through typography, layouts, and narrative-driven design. Whether I’m building a world through words or through interfaces, my goal is always the same: to make people feel something.
              </p>
              <p className="font-body text-white/80 leading-relaxed text-base sm:text-lg">
                I work at the intersection of imagination and structure—where poetry meets pixels, and stories take visual form.
              </p>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="pt-4">
              <div className="w-16 h-px bg-white/30 mx-auto lg:mx-0" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
