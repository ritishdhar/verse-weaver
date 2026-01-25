import { motion } from 'framer-motion';
import { SplitText } from './SplitText';
import { MagneticButton } from './MagneticButton';
import { ArrowDown } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle gradient orbs */}
        <motion.div
          className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-gold-muted/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container-wide relative z-10 pt-24 md:pt-0">
        <div className="max-w-5xl mx-auto text-center">
          {/* Overline */}
          <motion.p
            className="font-body text-sm md:text-base uppercase tracking-[0.3em] text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Poetry • Prose • The Art of Storytelling
          </motion.p>

          {/* Main Headline */}
          <SplitText
            text="Where Words Become Worlds"
            className="font-display text-display-xl text-foreground mb-6"
            delay={0.7}
          />

          {/* Subheadline */}
          <motion.p
            className="font-display text-display-sm text-muted-foreground italic max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            A journey through verses and chapters, where every word is crafted with intention
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <MagneticButton 
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full text-base font-medium hover:bg-primary/90 transition-colors"
            >
              Read the Novel
            </MagneticButton>
            <MagneticButton 
              className="px-8 py-4 border border-border rounded-full text-base font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              Explore My Writing
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4 text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
