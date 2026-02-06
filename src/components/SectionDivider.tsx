import { motion } from 'framer-motion';

interface SectionDividerProps {
    position: 'top' | 'bottom';
    color: string;
    flip?: boolean;
    invert?: boolean;
}

export const SectionDivider = ({ position, color, flip = false, invert = false }: SectionDividerProps) => {
    // Standard logic:
    // The path d="M0,0 V46.29... V0Z" fills the TOP of the SVG box.

    // 1. Tearing effect (Default for position="top"): 
    //    We want the solid part at the top of the box. No rotation needed.

    // 2. Wavy edge effect (Used for Hero -> Novel drowning):
    //    We want the solid part at the BOTTOM of the box. rotate-180 needed.

    // 3. Bottom divider (Used at the bottom of a section):
    //    Standard top-fill creates a wavy bottom edge. No rotation needed.

    const shouldRotate = (position === 'bottom' && invert) || (position === 'top' && invert);

    return (
        <div
            className={`absolute left-0 right-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none ${position === 'top' ? 'top-[-1px]' : 'bottom-[-1px]'
                } ${flip ? 'scale-x-[-1]' : ''}`}
        >
            <svg
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className={`relative block w-full h-[60px] md:h-[100px] ${shouldRotate ? 'rotate-180' : ''
                    }`}
                style={{ color }}
            >
                <path
                    d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113,2,1200,43.34V0Z"
                    fill="currentColor"
                />
            </svg>
        </div>
    );
};
