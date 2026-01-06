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
        xl: 'w-64 h-64 md:w-96 md:h-96' // Much larger for the main page
    };

    return (
        <motion.div
            className={`${sizes[size]} ${className} relative flex items-center justify-center`}
            animate={animate ? {
                y: [0, -15, 0],
            } : {}}
            transition={{
                duration: 4,
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
                    <linearGradient id="techBody" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c084fc" /> {/* Purple */}
                        <stop offset="50%" stopColor="#6366f1" /> {/* Indigo */}
                        <stop offset="100%" stopColor="#3b82f6" /> {/* Blue */}
                    </linearGradient>
                    <linearGradient id="techGlass" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
                    </linearGradient>
                    <radialGradient id="holoGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(56, 189, 248, 0.4)" />
                        <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
                    </radialGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Holographic Rings - Background */}
                <motion.g
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.6, rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    <circle cx="100" cy="100" r="90" stroke="#38bdf8" strokeWidth="1" strokeDasharray="10 10" opacity="0.4" />
                    <circle cx="100" cy="100" r="85" stroke="#818cf8" strokeWidth="0.5" opacity="0.3" />
                </motion.g>

                <motion.g
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.8, rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                    <path d="M 100 20 A 80 80 0 0 1 180 100" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                    <path d="M 100 180 A 80 80 0 0 1 20 100" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                </motion.g>

                {/* Main Body Container */}
                <motion.g
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, type: "spring" }}
                >
                    {/* Robot Head */}
                    <path
                        d="M 60 70 C 60 40, 140 40, 140 70 L 140 130 C 140 150, 60 150, 60 130 Z"
                        fill="url(#techBody)"
                        filter="url(#glow)"
                    />

                    {/* Face Screen (Glass) */}
                    <rect
                        x="70"
                        y="60"
                        width="60"
                        height="50"
                        rx="15"
                        fill="#0f172a"
                        stroke="#38bdf8"
                        strokeWidth="2"
                    />

                    {/* Eyes - Digital High Tech */}
                    <motion.g
                        animate={animate ? { scaleY: [1, 0.1, 1] } : {}}
                        transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                    >
                        {/* Left Eye */}
                        <circle cx="85" cy="80" r="8" fill="#22d3ee" filter="url(#glow)" />
                        <circle cx="85" cy="80" r="3" fill="#ffffff" />

                        {/* Right Eye */}
                        <circle cx="115" cy="80" r="8" fill="#22d3ee" filter="url(#glow)" />
                        <circle cx="115" cy="80" r="3" fill="#ffffff" />
                    </motion.g>

                    {/* Mouth - Digital Smile */}
                    <path
                        d="M 90 95 Q 100 102 110 95"
                        stroke="#22d3ee"
                        strokeWidth="3"
                        strokeLinecap="round"
                        filter="url(#glow)"
                    />

                    {/* Antenna */}
                    <line x1="100" y1="40" x2="100" y2="20" stroke="#6366f1" strokeWidth="4" />
                    <motion.circle
                        cx="100"
                        cy="20"
                        r="6"
                        fill="#facc15"
                        filter="url(#glow)"
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />

                    {/* Floating Hands */}
                    <motion.circle
                        cx="40"
                        cy="100"
                        r="12"
                        fill="url(#techBody)"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.circle
                        cx="160"
                        cy="100"
                        r="12"
                        fill="url(#techBody)"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                </motion.g>

                {/* Floating Data Particles */}
                <motion.circle cx="160" cy="50" r="3" fill="#38bdf8" animate={{ y: [-10, 10], opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity }} />
                <motion.circle cx="40" cy="150" r="2" fill="#c084fc" animate={{ y: [10, -10], opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity }} />
                <motion.circle cx="170" cy="130" r="4" fill="#22d3ee" animate={{ x: [-5, 5], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }} />

            </svg>
        </motion.div>
    );
};
