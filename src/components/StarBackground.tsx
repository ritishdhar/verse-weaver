import { motion } from 'framer-motion';

interface StarProps {
    size?: number;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    duration?: number;
    opacity?: number;
    rotateDirection?: 1 | -1;
}

export const StarBackground = ({
    stars = [
        { size: 8, top: '10%', left: '5%', duration: 12 },
        { size: 12, top: '20%', right: '10%', duration: 15, rotateDirection: -1 },
        { size: 6, bottom: '20%', left: '15%', duration: 10 },
        { size: 10, top: '40%', right: '20%', duration: 18 },
        { size: 4, bottom: '15%', right: '5%', duration: 8, rotateDirection: -1 },
    ]
}: { stars?: StarProps[] }) => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {stars.map((star, index) => (
                <motion.div
                    key={index}
                    className="absolute text-white"
                    style={{
                        width: star.size || 10,
                        height: star.size || 10,
                        top: star.top,
                        left: star.left,
                        right: star.right,
                        bottom: star.bottom,
                        opacity: star.opacity || 0.15,
                    }}
                    animate={{ rotate: (star.rotateDirection || 1) * 360 }}
                    transition={{ duration: star.duration || 20, repeat: Infinity, ease: "linear" }}
                >
                    <svg viewBox="0 0 100 100" fill="currentColor">
                        <path d="M50 0L61.2 38.8L100 50L61.2 61.2L50 100L38.8 61.2L0 50L38.8 38.8L50 0Z" />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
};
