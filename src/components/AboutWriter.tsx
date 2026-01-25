import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation';

export const AboutWriter = () => {
  return (
    <section id="about" className="section-padding relative">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-charcoal-light/50 to-transparent pointer-events-none" />

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Portrait */}
          <AnimatedSection className="order-2 lg:order-1">
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Frame */}
              <div className="absolute -inset-4 border border-primary/20 rounded-lg" />
              
              {/* Portrait placeholder */}
              <div className="relative aspect-[3/4] bg-gradient-to-br from-secondary to-charcoal rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                      <span className="font-display text-3xl text-primary">W</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Writer Portrait</p>
                  </div>
                </div>
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              {/* Decorative element */}
              <motion.div
                className="absolute -bottom-8 -right-8 font-display text-[120px] leading-none text-primary/10 pointer-events-none select-none"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                "
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Content */}
          <motion.div 
            className="order-1 lg:order-2 space-y-8"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={fadeUpVariants}>
              <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4">
                The Writer
              </p>
              <h2 className="font-display text-display-md text-foreground mb-6">
                Crafting Worlds <br />
                <span className="text-muted-foreground">One Word at a Time</span>
              </h2>
            </motion.div>

            <motion.p 
              variants={fadeUpVariants}
              className="font-display text-xl text-muted-foreground italic"
            >
              "I write to understand the spaces between moments — 
              the pause before a word becomes breath, 
              the silence where meaning lives."
            </motion.p>

            <motion.div variants={fadeUpVariants} className="space-y-4">
              <p className="font-body text-muted-foreground leading-relaxed">
                With a background spanning creative writing and literary studies, 
                I've dedicated my craft to exploring the intersection of poetry and prose. 
                My work has been featured in various literary journals and anthologies, 
                each piece an exploration of the human experience distilled into verse.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                When not writing, I can be found wandering through old bookshops, 
                collecting fragments of forgotten stories, and seeking the poetry 
                hidden in everyday moments.
              </p>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="pt-4">
              <div className="section-divider" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
