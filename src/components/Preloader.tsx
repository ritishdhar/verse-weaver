import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export const Preloader = () => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const duration = 1500; // 1.5 seconds total
        const interval = 16; // 60fps roughly
        const step = 100 / (duration / interval);

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setIsComplete(true), 300);
                    return 100;
                }
                return Math.min(prev + step, 100);
            });
        }, interval);

        // Safety fallback: force complete after 4 seconds
        const fallback = setTimeout(() => setIsComplete(true), 4000);

        return () => {
            clearInterval(timer);
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



                    {/* Loader Content - percentage and bar only */}
                    <div className="relative text-center">
                        <motion.span
                            className="block font-display text-8xl md:text-9xl text-white font-bold tracking-tighter"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            {Math.round(progress)}%
                        </motion.span>

                        {/* Progress Bar Container */}
                        <div className="mt-8 w-48 md:w-64 h-[2px] bg-white/10 mx-auto relative overflow-hidden rounded-full">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-zine-pink"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
