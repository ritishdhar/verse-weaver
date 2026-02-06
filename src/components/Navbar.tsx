import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'My Novel', href: '#projects' },
  { label: 'About Me', href: '#about' },
];

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState("#home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Observer for sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-30% 0px -10% 0px" }
    );

    // Observe all sections AND the hero
    const sections = document.querySelectorAll("section[id], footer[id]");
    sections.forEach((section) => observer.observe(section));

    // Special listener for the scroll-to-top case (sticky hero fix)
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setActiveSection("#home");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');

    // Special handling for home - scroll to top
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection(href);
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(href);
    }
  };

  return (
    <nav className="fixed top-8 left-0 right-0 z-50 flex justify-between items-start px-8 md:px-12 pointer-events-none">
      {/* Left Pill - Identity */}
      <motion.div
        className="pointer-events-auto bg-neutral-900/90 backdrop-blur-md border border-white/10 rounded-full py-2 pl-2 pr-6 flex items-center gap-3 shadow-2xl shadow-black/50"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-2 ml-4">
          <span className="text-white font-medium text-sm tracking-wide">Ritish Dhar</span>
          <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(225,48,136,0.8)] animate-pulse"></div>
        </div>
      </motion.div>

      {/* Right Pill - Navigation & Contact */}
      <motion.div
        className="pointer-events-auto bg-neutral-900/90 backdrop-blur-md border border-white/10 rounded-full p-2 flex items-center gap-1 shadow-2xl shadow-black/50 overflow-hidden"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full active:bg-white/10 transition-colors z-[60]"
        >
          <div className="flex flex-col gap-1.5 items-center justify-center">
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-white origin-center transition-all duration-300"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-5 h-0.5 bg-white transition-all duration-300"
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="w-5 h-0.5 bg-white origin-center transition-all duration-300"
            />
          </div>
        </button>
        <div className="hidden md:flex items-center px-1 relative">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-5 py-2 text-sm transition-colors duration-300 font-medium ${isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </div>

        <button
          onClick={() => {
            const element = document.getElementById('contact');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="hidden md:block px-6 py-2.5 bg-primary text-white rounded-full text-sm font-semibold hover:brightness-110 transition-all duration-300 shadow-[0_0_20px_rgba(225,48,136,0.3)]"
        >
          Contact Me
        </button>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[40] bg-zine-blue-dark/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center pointer-events-auto"
          >
            {/* Background Gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-zine-pink/10 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-zine-blue/10 rounded-full blur-[100px]" />
            </div>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-50 backdrop-blur-md border border-white/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.button>

            <nav className="flex flex-col items-center gap-8 relative z-10 w-full px-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    setIsMobileMenuOpen(false);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                  className="font-display text-4xl sm:text-5xl text-white hover:text-primary transition-colors text-center"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="mt-8 px-8 py-4 bg-primary text-white rounded-full font-display text-xl tracking-wide hover:brightness-110 shadow-[0_0_30px_rgba(225,48,136,0.4)]"
              >
                Contact Me
              </motion.button>
            </nav>

            {/* Footer decoration */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-12 text-white/20 text-xs tracking-[0.3em] font-body uppercase"
            >
              Ritish Dhar
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav >
  );
};
