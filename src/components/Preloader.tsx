import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const PRELOADER_IMAGES = [
    '/images/preloader-1.png',
    '/images/preloader-2.png',
    '/images/preloader-3.png',
    '/images/preloader-4.png',
];

const CYCLE_MS = 180; // fast image change

export const Preloader = () => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        const duration = 1500;
        const interval = 16;
        const step = 100 / (duration / interval);

        const progressTimer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressTimer);
                    setTimeout(() => setIsComplete(true), 300);
                    return 100;
                }
                return Math.min(prev + step, 100);
            });
        }, interval);

        const imageTimer = setInterval(() => {
            setImageIndex((i) => (i + 1) % PRELOADER_IMAGES.length);
        }, CYCLE_MS);

        const fallback = setTimeout(() => setIsComplete(true), 4000);

        return () => {
            clearInterval(progressTimer);
            clearInterval(imageTimer);
            clearTimeout(fallback);
        };
    }, []);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-zine-blue-dark flex items-center justify-center overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{
                        y: '-100%',
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                >
                    {/* Background Glows */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-zine-pink/20 rounded-full blur-[120px]"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-zine-blue/20 rounded-full blur-[120px]"
                            animate={{
                                scale: [1.2, 1, 1.2],
                                opacity: [0.3, 0.5, 0.3]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                    </div>

                    {/* Character: same position, fast-cycling images + float */}
                    <div className="relative flex flex-col items-center gap-10">
                        <motion.div
                            className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center"
                            animate={{
                                y: [0, -12, 0],
                            }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            {PRELOADER_IMAGES.map((src, i) => (
                                <AnimatePresence mode="wait" key={src}>
                                    {imageIndex === i && (
                                        <motion.img
                                            src={src}
                                            alt=""
                                            className="absolute inset-0 w-full h-full object-contain object-center pointer-events-none"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.08 }}
                                        />
                                    )}
                                </AnimatePresence>
                            ))}
                        </motion.div>

                        {/* Loading bar only */}
                        <div className="w-48 md:w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-zine-pink rounded-full"
                                initial={{ width: 0 }}
                                style={{ width: `${progress}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
