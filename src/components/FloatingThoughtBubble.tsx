import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

const thoughts = [
    "weaving vision into every verse",
    "where words become worlds",
    "crafting stories from silence",
    "painting emotions with ink",
    "breathing life into pages",
    "finding poetry in the mundane",
];

export const FloatingThoughtBubble = () => {
    const [currentThought, setCurrentThought] = useState(0);
    const controls = useAnimation();

    useEffect(() => {
        // Cycle through thoughts every 4 seconds
        const thoughtInterval = setInterval(() => {
            setCurrentThought((prev) => (prev + 1) % thoughts.length);
        }, 4000);

        return () => clearInterval(thoughtInterval);
    }, []);

    useEffect(() => {
        // Continuous floating animation
        const animateFloat = async () => {
            while (true) {
                await controls.start({
                    x: [0, 30, -20, 40, 0],
                    y: [0, -25, 15, -30, 0],
                    rotate: [0, 2, -1, 3, 0],
                    transition: {
                        duration: 20,
                        ease: "easeInOut",
                        times: [0, 0.25, 0.5, 0.75, 1],
                    },
                });
            }
        };

        animateFloat();
    }, [controls]);

    return (
        <motion.div
            animate={controls}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute top-4 sm:top-8 md:top-12 right-[2%] sm:right-[10%] md:right-[15%] z-30"
        >
            {/* Thought bubble with tail */}
            <div className="relative">
                {/* Main bubble */}
                <motion.div
                    className="relative border-[1.5px] border-white rounded-full px-4 sm:px-6 py-2 sm:py-3 bg-white/5 backdrop-blur-md shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.span
                        key={currentThought}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        className="text-white font-body text-xs sm:text-sm md:text-base font-medium whitespace-nowrap block"
                    >
                        {thoughts[currentThought]}
                    </motion.span>
                </motion.div>

                {/* Thought bubble tail (small circles) */}
                <motion.div
                    className="absolute -bottom-6 right-8 flex flex-col gap-1.5"
                    animate={{
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <div className="w-2 h-2 rounded-full bg-white/80 ml-auto" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/60 ml-auto mr-1" />
                    <div className="w-1 h-1 rounded-full bg-white/40 ml-auto mr-2" />
                </motion.div>
            </div>
        </motion.div>
    );
};
