import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AICoreInterface = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize coordinates -1 to 1
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="w-full h-[600px] relative rounded-3xl overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-800 shadow-2xl">
            {/* Background Grid */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Parallax Content Container */}
            <motion.div
                className="relative w-[500px] h-[500px] flex items-center justify-center"
                animate={{
                    x: mousePosition.x * -20,
                    y: mousePosition.y * -20
                }}
                transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            >
                {/* Outermost Ring - Slow Rotation */}
                <motion.div
                    className="absolute w-full h-full border border-blue-500/20 rounded-full border-dashed"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                />

                {/* Decorative Arc Ring */}
                <motion.div
                    className="absolute w-[450px] h-[450px] border-2 border-t-cyan-500/50 border-r-transparent border-b-cyan-500/50 border-l-transparent rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                />

                {/* Binary Data Ring */}
                <motion.div
                    className="absolute w-[380px] h-[380px] rounded-full flex items-center justify-center opacity-30"
                    animate={{ rotate: 180 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                    <div className="w-full h-full border border-purple-500/30 rounded-full border-dotted" />
                </motion.div>

                {/* Inner HUD Ring */}
                <motion.div
                    className="absolute w-[250px] h-[250px] border-[3px] border-t-blue-400 border-r-transparent border-b-blue-400 border-l-transparent rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />

                {/* Central Core - Pulsing */}
                <motion.div
                    className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full relative z-10 flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.6)]"
                    animate={{
                        scale: [1, 1.1, 1],
                        boxShadow: [
                            "0 0 50px rgba(59,130,246,0.6)",
                            "0 0 80px rgba(59,130,246,0.8)",
                            "0 0 50px rgba(59,130,246,0.6)"
                        ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-24 h-24 bg-slate-900/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <motion.div
                            className="w-16 h-16 bg-blue-500 rounded-full opacity-80"
                            animate={{ opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            </motion.div>

            {/* Floating Labels/Data */}
            <motion.div
                className="absolute top-10 left-10 p-4 border-l-2 border-blue-500 bg-slate-900/50 backdrop-blur-sm"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
            >
                <div className="text-blue-400 text-xs font-mono mb-1">SYSTEM STATUS</div>
                <div className="text-white font-bold tracking-widest">ONLINE</div>
            </motion.div>

            <motion.div
                className="absolute bottom-10 right-10 p-4 text-right border-r-2 border-cyan-500 bg-slate-900/50 backdrop-blur-sm"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
            >
                <div className="text-cyan-400 text-xs font-mono mb-1">NEURAL LINK</div>
                <div className="text-white font-bold tracking-widest">ACTIVE</div>
            </motion.div>

        </div>
    );
};

export default AICoreInterface;
