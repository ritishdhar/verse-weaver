import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { MagneticButton } from './MagneticButton';
import { SectionDivider } from './SectionDivider';

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/ritish_dhar/' },
  { label: 'Twitter', href: 'https://x.com/ritish_dhar' },
  { label: 'Goodreads', href: 'https://www.goodreads.com/user/show/133492555-ritish' },
];

export const Footer = () => {
  return (
    <footer id="contact" className="py-24 md:py-32 bg-zine-pink relative overflow-hidden z-10">
      <SectionDivider position="top" color="#1a2c75" />
      {/* Decorative Background Star */}
      <motion.div
        className="absolute -bottom-24 -right-24 text-white/5 w-[500px] h-[500px] pointer-events-none select-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0L61.2 38.8L100 50L61.2 61.2L50 100L38.8 61.2L0 50L38.8 38.8L50 0Z" />
        </svg>
      </motion.div>

      <div className="container-wide relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 md:gap-24 mb-24">
          <AnimatedSection className="max-w-2xl text-center lg:text-left">
            <h2 className="font-prata text-display-lg md:text-[6vw] text-white leading-[1.1] mb-8 italic">
              Let's weave something <br />
              <span className="not-italic opacity-50 underline decoration-1 underline-offset-8">extraordinary.</span>
            </h2>
            <div className="flex flex-wrap gap-8 items-center justify-center lg:justify-start">
              <MagneticButton
                onClick={() => window.location.href = 'mailto:dharritish2@gmail.com'}
              >
                <div className="px-10 py-5 bg-white text-zine-pink rounded-full font-bold text-lg">
                  Get in touch
                </div>
              </MagneticButton>
              <div className="space-y-1">
                <p className="font-body text-sm text-white/50 uppercase tracking-widest">Inquiries</p>
                <a href="mailto:dharritish2@gmail.com" className="text-xl text-white font-medium hover:opacity-70 transition-opacity">
                  dharritish2@gmail.com
                </a>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="grid grid-cols-2 gap-16 text-center lg:text-left w-full lg:w-auto">
            <div className="space-y-6">
              <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-white/40">Connect</p>
              <nav className="flex flex-col gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-2xl text-white hover:italic transition-all duration-300"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-6">
              <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-white/40">Studio</p>
              <address className="not-italic font-body text-lg text-white/80 leading-relaxed">
                Available for worldwide <br />
                creative partnerships <br />
                & poetic consultations.
              </address>
            </div>
          </AnimatedSection>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center md:items-end gap-8 text-center md:text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col gap-6 items-center md:items-start">
            <a href="#" className="font-display text-4xl text-white">
              Ritish Dhar
            </a>
            <p className="font-body text-xs text-white/50 max-w-[200px] leading-loose">
              Exploring the intersection of creative direction, poetry, and digital craft.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-8">
              <a href="#" className="text-xs text-white/40 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-xs text-white/40 hover:text-white transition-colors">Terms</a>
            </div>
            <p className="font-body text-[10px] uppercase tracking-widest text-white/30">
              © {new Date().getFullYear()} Ritish Dhar. Crafted with intention.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
