import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';
import { MagneticButton } from './MagneticButton';

const navLinks = [
  { label: 'Novel', href: '#novel' },
  { label: 'About', href: '#about' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Coming Soon', href: '#coming-soon' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(10, 10, 10, 0)', 'rgba(10, 10, 10, 0.95)']
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(10px)']
  );

  return (
    <motion.nav
      style={{ backgroundColor, backdropFilter: backdropBlur }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/0 transition-colors"
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <motion.a
            href="#"
            className="font-display text-xl md:text-2xl text-foreground tracking-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-primary">The</span> Poet
          </motion.a>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors link-underline"
              >
                {link.label}
              </a>
            ))}
            <MagneticButton className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium">
              Contact
            </MagneticButton>
          </motion.div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span 
              className="w-6 h-0.5 bg-foreground block"
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
            />
            <motion.span 
              className="w-6 h-0.5 bg-foreground block"
              animate={{ opacity: isOpen ? 0 : 1 }}
            />
            <motion.span 
              className="w-6 h-0.5 bg-foreground block"
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ 
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0 
          }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-display text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 inline-block px-6 py-3 bg-primary text-primary-foreground rounded-full text-center font-medium"
            >
              Contact
            </a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};
