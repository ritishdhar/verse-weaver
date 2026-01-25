import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { MagneticButton } from './MagneticButton';

const upcomingWorks = [
  {
    title: 'The Weight of Water',
    type: 'Poetry Collection',
    status: 'In Progress',
    description: 'Exploring grief, healing, and the slow return of light.',
  },
  {
    title: 'Letters to Midnight',
    type: 'Prose Poetry',
    status: 'Coming 2026',
    description: 'Correspondence with the darkness, written in the quiet hours.',
  },
];

export const ComingSoon = () => {
  return (
    <section id="coming-soon" className="section-padding relative">
      <div className="container-wide">
        <AnimatedSection className="text-center mb-16 md:mb-24">
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4">
            On the Horizon
          </p>
          <h2 className="font-display text-display-md text-foreground">
            Future Works
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {upcomingWorks.map((work, index) => (
            <AnimatedSection key={work.title} delay={index * 0.15}>
              <motion.div 
                className="group relative p-8 rounded-lg bg-secondary/50 border border-border hover:border-primary/30 transition-all duration-500"
                whileHover={{ y: -4 }}
              >
                {/* Status badge */}
                <span className="inline-block px-3 py-1 text-xs uppercase tracking-wider text-primary bg-primary/10 rounded-full mb-6">
                  {work.status}
                </span>
                
                {/* Type */}
                <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">
                  {work.type}
                </p>
                
                {/* Title */}
                <h3 className="font-display text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
                  {work.title}
                </h3>
                
                {/* Description */}
                <p className="font-body text-muted-foreground leading-relaxed">
                  {work.description}
                </p>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-primary/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Newsletter */}
        <AnimatedSection delay={0.3}>
          <div className="text-center max-w-xl mx-auto">
            <p className="font-display text-xl text-muted-foreground italic mb-8">
              Be the first to know when new works are released
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className="px-6 py-4 bg-secondary border border-border rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors flex-1 max-w-sm"
              />
              <MagneticButton className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium">
                Stay Updated
              </MagneticButton>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
