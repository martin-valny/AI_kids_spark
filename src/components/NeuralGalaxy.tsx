import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// Matrix Column Component
const MatrixColumn = ({ x, speed, fontSize, rangeY }: { x: number, speed: number, fontSize: number, rangeY: number }) => {
    // Generate random characters
    const chars = "01AI<>{}[]+-*=@#%";

    // Slower speed state
    const [headY, setHeadY] = useState((Math.random() - 0.5) * rangeY);

    useFrame((state, delta) => {
        setHeadY(prev => {
            // Speed reduced significantly
            let next = prev - speed * delta * 15;
            if (next < -rangeY / 2) {
                next = rangeY / 2 + Math.random() * 10;
            }
            return next;
        });
    });

    // Create droplets
    const droplets = useMemo(() => {
        return Array.from({ length: 25 }).map((_, i) => ({
            offset: i * fontSize * 1.0, // Tighter spacing
            char: chars[Math.floor(Math.random() * chars.length)]
        }));
    }, []);

    return (
        <group position={[x, 0, 0]}>
            {droplets.map((drop, i) => {
                const y = headY + drop.offset;
                // Opacity fades as we go up the tail
                const opacity = 1 - (i / droplets.length);

                return (
                    <Text
                        key={i}
                        position={[0, y, 0]}
                        fontSize={fontSize}
                        // Darker colors for light background
                        color={i === 0 ? "#8b5cf6" : "#3b82f6"} // Head is Purple, tail is Blue
                        anchorX="center"
                        anchorY="middle"
                        fillOpacity={opacity * 0.7} // Slightly transparent
                    >
                        {drop.char}
                    </Text>
                );
            })}
        </group>
    );
};

// Full width code grid
const CodeGrid = () => {
    const { viewport } = useThree();
    const fontSize = 0.4; // Smaller font for density

    // Dense columns
    const columns = useMemo(() => {
        const cols = [];
        const width = viewport.width;
        const colCount = Math.floor(width / fontSize); // Denser

        for (let i = 0; i < colCount; i++) {
            const x = (i * fontSize) - (width / 2) + (fontSize / 2);
            // Slower random speeds
            const speed = 0.05 + Math.random() * 0.1;
            cols.push(
                <MatrixColumn
                    key={i}
                    x={x}
                    speed={speed}
                    fontSize={fontSize * 0.85}
                    rangeY={viewport.height + 20}
                />
            );
        }
        return cols;
    }, [viewport.width, viewport.height]);

    return <group>{columns}</group>;
};

// Main Component
export const NeuralGalaxy = () => {
    return (
        <div className="fixed inset-0 pointer-events-none -z-10 bg-transparent transition-colors duration-1000">
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }} gl={{ alpha: true }}>
                {/* Minimal fog to avoid filling the background with white */}
                <fog attach="fog" args={['#ffffff', 10, 50]} />

                <CodeGrid />

                <ambientLight intensity={1.2} />
            </Canvas>
        </div>
    );
};

export default NeuralGalaxy;
