import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export const PromoNotification = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        // Show notification after delay on every page load (no sessionStorage)
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000); // 3 seconds delay

        return () => clearTimeout(timer);
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        setIsDismissed(true);
    };

    const handleAction = () => {
        const section = document.getElementById('projects');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        handleDismiss();
    };

    return (
        <AnimatePresence>
            {isVisible && !isDismissed && (
                <div className="fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="w-[300px] sm:w-[350px] max-w-[calc(100vw-2rem)] pointer-events-auto"
                    >
                    <div className="relative group">
                        {/* Glow background */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-zine-blue/50 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                        <div className="relative bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl">
                            {/* Close Button */}
                            <button
                                onClick={handleDismiss}
                                className="absolute top-3 right-3 text-white/30 hover:text-white transition-colors"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="flex gap-4">
                                <div className="w-12 h-16 flex-shrink-0 bg-white/5 rounded-md border border-white/10 overflow-hidden">
                                    <img
                                        src="/images/do-you-hate-me-cover.jpg"
                                        alt="Novel Cover"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">New Release</span>
                                    <h4 className="font-display text-white text-sm leading-tight">Do You Hate Me?</h4>
                                    <p className="text-white/50 text-[11px] leading-relaxed line-clamp-2">
                                        Explore the raw depths of modern love and vulnerability.
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleAction}
                                className="w-full mt-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-xs font-bold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20"
                            >
                                Read Now
                            </button>
                        </div>
                    </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
