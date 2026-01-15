import React from 'react';
import { motion } from 'framer-motion';

interface AIMascotProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    animate?: boolean;
    className?: string;
}

export const AIMascot: React.FC<AIMascotProps> = ({
    size = 'md',
    animate = true,
    className = ''
}) => {
    const sizes = {
        sm: 'w-16 h-16',
        md: 'w-24 h-24',
        lg: 'w-32 h-32',
        xl: 'w-64 h-64 md:w-80 md:h-80'
    };

    return (
        <motion.div
            className={`${sizes[size]} ${className} relative flex items-center justify-center`}
            animate={animate ? {
                y: [0, -8, 0],
            } : {}}
            transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            <svg
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-2xl"
            >
                {/* Defs for Gradients and Glows */}
                <defs>
                    <linearGradient id="modernBody" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                    <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1e1b4b" />
                        <stop offset="100%" stopColor="#312e81" />
                    </linearGradient>
                    <linearGradient id="accentGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
                        <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
                    </radialGradient>
                    <filter id="softGlow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="strongGlow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Subtle Orbital Ring */}
                <motion.g
                    animate={animate ? { rotate: 360 } : {}}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: '100px 100px' }}
                >
                    <ellipse
                        cx="100"
                        cy="100"
                        rx="85"
                        ry="85"
                        stroke="url(#accentGlow)"
                        strokeWidth="1"
                        strokeDasharray="8 12"
                        opacity="0.4"
                        fill="none"
                    />
                </motion.g>

                {/* Secondary Ring - Counter rotation */}
                <motion.g
                    animate={animate ? { rotate: -360 } : {}}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: '100px 100px' }}
                >
                    <ellipse
                        cx="100"
                        cy="100"
                        rx="78"
                        ry="78"
                        stroke="#8b5cf6"
                        strokeWidth="0.5"
                        strokeDasharray="4 16"
                        opacity="0.3"
                        fill="none"
                    />
                </motion.g>

                {/* Main Body - Modern Rounded Square */}
                <motion.g
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    {/* Outer glow effect */}
                    <rect
                        x="50"
                        y="50"
                        width="100"
                        height="100"
                        rx="28"
                        fill="url(#innerGlow)"
                    />

                    {/* Main body shape */}
                    <rect
                        x="55"
                        y="55"
                        width="90"
                        height="90"
                        rx="24"
                        fill="url(#modernBody)"
                        filter="url(#softGlow)"
                    />

                    {/* Screen/Face area */}
                    <rect
                        x="65"
                        y="65"
                        width="70"
                        height="55"
                        rx="14"
                        fill="url(#screenGradient)"
                    />

                    {/* Screen border highlight */}
                    <rect
                        x="65"
                        y="65"
                        width="70"
                        height="55"
                        rx="14"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="1"
                        opacity="0.6"
                    />

                    {/* Eyes - Modern minimal style */}
                    <motion.g
                        animate={animate ? { scaleY: [1, 0.1, 1] } : {}}
                        transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                        style={{ transformOrigin: '100px 88px' }}
                    >
                        {/* Left Eye */}
                        <circle cx="85" cy="88" r="6" fill="#22d3ee" filter="url(#strongGlow)" />
                        <circle cx="85" cy="88" r="2.5" fill="#ffffff" />

                        {/* Right Eye */}
                        <circle cx="115" cy="88" r="6" fill="#22d3ee" filter="url(#strongGlow)" />
                        <circle cx="115" cy="88" r="2.5" fill="#ffffff" />
                    </motion.g>

                    {/* Status indicator - subtle bar below eyes */}
                    <motion.rect
                        x="88"
                        y="105"
                        width="24"
                        height="3"
                        rx="1.5"
                        fill="#22d3ee"
                        opacity="0.8"
                        animate={animate ? { opacity: [0.5, 1, 0.5] } : {}}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Bottom accent line */}
                    <rect
                        x="75"
                        y="130"
                        width="50"
                        height="4"
                        rx="2"
                        fill="url(#accentGlow)"
                        opacity="0.7"
                    />
                </motion.g>

                {/* Floating accent dots - subtle data visualization */}
                <motion.circle
                    cx="155"
                    cy="60"
                    r="3"
                    fill="#06b6d4"
                    opacity="0.6"
                    animate={animate ? { y: [-5, 5], opacity: [0.3, 0.7, 0.3] } : {}}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle
                    cx="45"
                    cy="140"
                    r="2"
                    fill="#8b5cf6"
                    opacity="0.5"
                    animate={animate ? { y: [5, -5], opacity: [0.2, 0.6, 0.2] } : {}}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle
                    cx="160"
                    cy="130"
                    r="2.5"
                    fill="#a855f7"
                    opacity="0.5"
                    animate={animate ? { x: [-3, 3], opacity: [0.3, 0.5, 0.3] } : {}}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                />
            </svg>
        </motion.div>
    );
};
