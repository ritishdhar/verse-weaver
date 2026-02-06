import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { MagneticButton } from './MagneticButton';
import { StarBackground } from './StarBackground';
import { SectionDivider } from './SectionDivider';

const upcomingWorks = [
  {
    title: 'AUTUMN LEAVES',
    type: 'Romance Novel',
    status: 'In Progress',
    description: 'A deep exploration of situationships and the bittersweet ache of unrequited love.',
  },
  {
    title: 'EPHIALTES',
    type: 'Thriller Novel',
    status: 'Coming Soon',
    description: 'A bone-chilling journey into a world where nightmares transcend sleep and become reality.',
  },
];

export const ComingSoon = () => {
  return (
    <section id="coming-soon" className="section-padding relative bg-zine-blue z-10">
      <StarBackground
        stars={[
          { size: 6, top: '20%', left: '5%', duration: 10 },
          { size: 10, top: '15%', right: '10%', duration: 15, rotateDirection: -1 },
          { size: 4, top: '40%', left: '15%', duration: 8 },
          { size: 15, bottom: '20%', right: '15%', duration: 20 },
          { size: 8, bottom: '40%', left: '25%', duration: 12, rotateDirection: -1 },
          { size: 5, top: '60%', left: '40%', duration: 9 },
          { size: 12, bottom: '15%', left: '10%', duration: 14 },
          { size: 3, top: '10%', left: '45%', duration: 7 },
        ]}
      />
      <div className="container-wide relative z-10">
        <AnimatedSection className="text-center mb-16 md:mb-24 px-4 sm:px-0">
          <div className="bg-black px-4 sm:px-6 py-1.5 sm:py-2 mb-4 inline-block">
            <p className="font-body text-xs sm:text-sm uppercase tracking-[0.3em] text-primary">
              On the Horizon
            </p>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-display-md text-foreground">
            Future Works
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mb-16 px-4 sm:px-0">
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
        <AnimatedSection delay={0.3} className="px-4 sm:px-0">
          <div className="text-center max-w-xl mx-auto">
            <p className="font-display text-lg sm:text-xl text-muted-foreground italic mb-8">
              Be the first to know when new works are released
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className="px-6 py-4 bg-secondary border border-border rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors flex-1 max-w-sm mx-auto sm:mx-0 w-full"
              />
              <MagneticButton className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium w-full sm:w-auto">
                Stay Updated
              </MagneticButton>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
