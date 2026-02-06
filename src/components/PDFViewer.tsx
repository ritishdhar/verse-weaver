import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Document, Page, pdfjs } from 'react-pdf';
import { getReadingProgressKey } from '../lib/visitor';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
    isOpen: boolean;
    onClose: () => void;
    pdfUrl: string;
}

export const PDFViewer = ({ isOpen, onClose, pdfUrl }: PDFViewerProps) => {
    const [numPages, setNumPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1); // 1-indexed page number
    const [scale, setScale] = useState<number>(0.6); // Higher default for better mobile read
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [flipDirection, setFlipDirection] = useState<'forward' | 'backward'>('forward');

    // Touch handling refs
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    // Initialize state and listeners
    useEffect(() => {
        setMounted(true);

        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            // Auto-adjust scale for mobile
            if (mobile) {
                setScale(Math.min(window.innerWidth / 500, 0.6));
            } else {
                if (scale < 0.25) setScale(0.4);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Restore saved reading position
        const savedPage = localStorage.getItem(getReadingProgressKey());
        if (savedPage !== null) {
            // Convert old spread-based (0-indexed) storage to page-based (1-indexed) if needed
            // Assuming old storage was "spread index", spread 0 -> page 1.
            // But if we overwrite it with page index, let's just assume it's a number.
            // To be safe against previous version: if it's small (< 100), treat as spread index?
            // Actually, let's just clear or try to parse. 
            // Previous code: savedSpread (0-indexed). spread 0 -> Page 1. spread 1 -> Page 3.
            // So logic: page = spread * 2 + 1.
            const val = parseInt(savedPage, 10);
            // Heuristic check: if value seems to be a spread index (e.g., matching old logic), convert.
            // But simpler is to just treat it as Page 1 for now to avoid confusion, or map it.
            // Let's reset to 1 for this update to ensure clean slate for new logic, or try to respect it.
            // Let's just use it as is if > 0.
            if (val > 0) setCurrentPage(val);
        }

        return () => {
            setMounted(false);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    // Save reading position
    useEffect(() => {
        localStorage.setItem(getReadingProgressKey(), currentPage.toString());
    }, [currentPage]);

    const goToPrevPage = () => {
        const step = isMobile ? 1 : 2;
        if (currentPage > 1) {
            setFlipDirection('backward');
            setCurrentPage((prev) => Math.max(1, prev - step));
        }
    };

    const goToNextPage = () => {
        const step = isMobile ? 1 : 2;
        if (currentPage < numPages) {
            setFlipDirection('forward');
            setCurrentPage((prev) => Math.min(numPages, prev + step));
        }
    };

    const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 1.5));
    const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.2));

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => setIsFullscreen(true));
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().then(() => setIsFullscreen(false));
            }
        }
    };

    // Keep fullscreen state in sync with browser
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = ''; };
        }
    }, [isOpen]);

    // Touch Handlers
    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const onTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const onTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;

        const distance = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50;

        if (distance > minSwipeDistance) {
            // Swiped Left -> Next
            goToNextPage();
        } else if (distance < -minSwipeDistance) {
            // Swiped Right -> Prev
            goToPrevPage();
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    if (!mounted) return null;

    const pageVariants = {
        enter: (direction: 'forward' | 'backward') => ({
            rotateY: direction === 'forward' ? -90 : 90,
            opacity: 0,
            x: direction === 'forward' ? 50 : -50
        }),
        center: {
            rotateY: 0,
            opacity: 1,
            x: 0
        },
        exit: (direction: 'forward' | 'backward') => ({
            rotateY: direction === 'forward' ? 90 : -90,
            opacity: 0,
            x: direction === 'forward' ? -50 : 50
        }),
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Header */}
                    <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 bg-zinc-900/80 backdrop-blur-md border-b border-white/10">
                        <div className="flex items-center gap-4">
                            <h3 className="font-display text-lg sm:text-xl text-white truncate max-w-[150px] sm:max-w-xs">
                                Do You Hate Me?
                            </h3>
                            <span className="text-xs sm:text-sm text-white/60">
                                {isMobile ? `Page ${currentPage}` : `Pages ${currentPage}-${Math.min(currentPage + 1, numPages)}`} of {numPages}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4">
                            {/* Fullscreen Toggle */}
                            <button onClick={toggleFullscreen} className="p-2 rounded-full hover:bg-white/10 text-white transition-colors">
                                {isFullscreen ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" /></svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                                )}
                            </button>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Book Content */}
                    <div
                        className="w-full h-full pt-16 pb-20 flex items-center justify-center overflow-hidden touch-pan-y"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        <Document
                            file={pdfUrl}
                            onLoadSuccess={onDocumentLoadSuccess}
                            className="flex items-center justify-center"
                            loading={<div className="text-white">Loading...</div>}
                        >
                            <AnimatePresence mode="wait" custom={flipDirection}>
                                <motion.div
                                    key={currentPage}
                                    custom={flipDirection}
                                    variants={pageVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.4 }}
                                    className={`flex shadow-2xl ${isMobile ? 'justify-center' : 'gap-0'}`}
                                >
                                    {/* Left Page / Single Page */}
                                    <div className="bg-white">
                                        <Page
                                            pageNumber={currentPage}
                                            scale={scale}
                                            renderTextLayer={false}
                                            renderAnnotationLayer={false}
                                            className="shadow-md"
                                        />
                                    </div>

                                    {/* Right Page (Desktop Only) */}
                                    {!isMobile && currentPage + 1 <= numPages && (
                                        <div className="bg-white relative">
                                            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-10" />
                                            <Page
                                                pageNumber={currentPage + 1}
                                                scale={scale}
                                                renderTextLayer={false}
                                                renderAnnotationLayer={false}
                                                className="shadow-md"
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </Document>
                    </div>

                    {/* Footer Controls */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-zinc-900/80 backdrop-blur-md border-t border-white/10 flex items-center justify-center gap-8">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={goToPrevPage}
                                disabled={currentPage <= 1}
                                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-50 transition-colors flex items-center gap-2 text-sm"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                                {isMobile ? '' : 'Prev'}
                            </button>

                            {/* Zoom Controls (Desktop mainly, but good for mobile too) */}
                            <div className="flex items-center gap-2 bg-black/40 rounded-full px-3 py-1.5">
                                <button onClick={zoomOut} className="text-white hover:text-primary"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /></svg></button>
                                <span className="text-xs text-white/60 min-w-[3ch] text-center">{Math.round(scale * 100)}%</span>
                                <button onClick={zoomIn} className="text-white hover:text-primary"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg></button>
                            </div>

                            <button
                                onClick={goToNextPage}
                                disabled={currentPage >= numPages}
                                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-50 transition-colors flex items-center gap-2 text-sm"
                            >
                                {isMobile ? '' : 'Next'}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};
