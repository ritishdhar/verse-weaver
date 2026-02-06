import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FloatingThoughtBubble } from './FloatingThoughtBubble';
import { SectionDivider } from './SectionDivider';

const roles = ["DESIGNER", "POET", "WRITER"];

export const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (displayText.length < roles[roleIndex].length) {
        timeout = setTimeout(() => {
          setDisplayText(roles[roleIndex].slice(0, displayText.length + 1));
        }, 150);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 100);
      } else {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, roleIndex]);

  return (
    <motion.section
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="sticky top-0 min-h-screen flex items-center justify-center overflow-hidden bg-zine-pink pt-20 z-0"
    >
      {/* Main Content Container */}
      <div className="container-wide relative z-10 flex flex-col items-center">

        {/* "meet the" Text Box */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-black px-4 sm:px-6 py-1.5 sm:py-2 mb-2"
        >
          <h2 className="text-white font-body font-bold text-5xl sm:text-5xl md:text-6xl uppercase tracking-tighter">
            meet the
          </h2>
        </motion.div>

        {/* big Typewriter Text */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-[18vw] sm:min-h-[15vw] flex flex-col items-center"
        >
          <h1 className="text-white font-prata text-[14vw] sm:text-[13vw] md:text-[15vw] leading-none uppercase select-none flex items-center">
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="inline-block w-[2px] h-[0.8em] bg-white ml-2"
            />
          </h1>

          {/* Horizontal Line with Dots */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
            className="absolute -bottom-4 left-0 right-0 flex items-center px-4"
          >
            <div className="w-2 h-2 rounded-full bg-white flex-shrink-0" />
            <div className="h-[2px] bg-white flex-grow mx-1" />
            <div className="w-2 h-2 rounded-full bg-white flex-shrink-0" />
          </motion.div>
        </motion.div>

        {/* Bottom Section: Image and Badges */}
        <div className="relative -mt-8 sm:-mt-16 md:-mt-24 w-full max-w-4xl flex flex-col items-center z-20">

          {/* Floating Thought Bubble */}
          <FloatingThoughtBubble />

          {/* Collage Image Container - Now a cutout */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative w-full aspect-[4/3] md:aspect-[16/9] group flex justify-center items-end"
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 1, -1, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full h-full flex justify-center items-end"
            >
              <img
                src="/images/mobile-hero.png"
                alt="Ritish Dhar Portrait"
                className="w-full h-auto max-h-[110%] md:max-h-[100%] object-contain object-bottom scale-[1.8] md:scale-[1.35] transform translate-y-20 md:translate-y-4"
              />
            </motion.div>

            {/* Floating Star Icon */}
            <motion.div
              className="absolute bottom-[5%] sm:bottom-[10%] left-[5%] sm:left-[10%] z-20 text-white w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 0L61.2 38.8L100 50L61.2 61.2L50 100L38.8 61.2L0 50L38.8 38.8L50 0Z" />
              </svg>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Background Decorative Stars */}
      {/* Small top left */}
      <motion.div
        className="absolute top-[15%] left-[5%] text-white/20 w-8 h-8 pointer-events-none select-none hidden sm:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0L61.2 38.8L100 50L61.2 61.2L50 100L38.8 61.2L0 50L38.8 38.8L50 0Z" />
        </svg>
      </motion.div>

      {/* Medium top right */}
      <motion.div
        className="absolute top-[20%] right-[10%] text-white/20 w-12 h-12 pointer-events-none select-none hidden sm:block"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0L61.2 38.8L100 50L61.2 61.2L50 100L38.8 61.2L0 50L38.8 38.8L50 0Z" />
        </svg>
      </motion.div>

      {/* Small bottom left (near main star but background) */}
      <motion.div
        className="absolute bottom-[25%] left-[20%] text-white/10 w-6 h-6 pointer-events-none select-none hidden sm:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0L61.2 38.8L100 50L61.2 61.2L50 100L38.8 61.2L0 50L38.8 38.8L50 0Z" />
        </svg>
      </motion.div>

      {/* Tiny middle right */}
      <motion.div
        className="absolute top-[45%] right-[25%] text-white/15 w-4 h-4 pointer-events-none select-none hidden sm:block"
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0L61.2 38.8L100 50L61.2 61.2L50 100L38.8 61.2L0 50L38.8 38.8L50 0Z" />
        </svg>
      </motion.div>


      {/* Background Decorative Star (faded big one) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute bottom-[-10%] right-[-5%] text-white/5 w-[40vw] h-[40vw] pointer-events-none select-none"
      >
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0L61.2 38.8L100 50L61.2 61.2L50 100L38.8 61.2L0 50L38.8 38.8L50 0Z" />
        </svg>
      </motion.div>

      {/* Inspired by TV Girl Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-[92vh] right-4 sm:right-10 z-[50] flex items-center gap-3 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 scale-90 sm:scale-100"
      >
        <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
        <p className="font-body text-[10px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-white">
          Inspired by TV Girl
        </p>
      </motion.div>
    </motion.section>
  );
};
