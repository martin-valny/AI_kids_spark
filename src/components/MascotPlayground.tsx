import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

const RobotHead = ({ position, rotation, blinking }: { position: [number, number, number], rotation: [number, number, number], blinking?: boolean }) => {
    return (
        <group position={position} rotation={rotation}>
            {/* Head Shape */}
            <RoundedBox args={[1.2, 1, 1]} radius={0.2} smoothness={4}>
                <meshStandardMaterial color="#ffffff" />
            </RoundedBox>
            {/* Eyes */}
            <Sphere args={[0.15]} position={[-0.3, 0.1, 0.51]} scale={[1, blinking ? 0.1 : 1, 1]}>
                <meshStandardMaterial color="#000000" />
            </Sphere>
            <Sphere args={[0.15]} position={[0.3, 0.1, 0.51]} scale={[1, blinking ? 0.1 : 1, 1]}>
                <meshStandardMaterial color="#000000" />
            </Sphere>
            {/* Antenna */}
            <Cylinder args={[0.05, 0.05, 0.5]} position={[0, 0.75, 0]} rotation={[0, 0, 0]}>
                <meshStandardMaterial color="#cccccc" />
            </Cylinder>
            <Sphere args={[0.1]} position={[0, 1, 0]}>
                <meshStandardMaterial color="#FF5722" />
            </Sphere>
        </group>
    );
};

const RobotBody = () => {
    return (
        <group position={[0, -1.2, 0]}>
            {/* Body Shape */}
            <RoundedBox args={[1, 1.2, 0.8]} radius={0.2} smoothness={4}>
                <meshStandardMaterial color="#3B82F6" />
            </RoundedBox>
            {/* Chest Panel */}
            <RoundedBox args={[0.6, 0.4, 0.1]} radius={0.05} position={[0, 0.2, 0.41]}>
                <meshStandardMaterial color="#60A5FA" />
            </RoundedBox>
        </group>
    );
};

const RobotLimbs = () => {
    return (
        <group>
            {/* Arms */}
            <RoundedBox args={[0.3, 0.8, 0.3]} radius={0.1} position={[-0.75, -1, 0]}>
                <meshStandardMaterial color="#ffffff" />
            </RoundedBox>
            <RoundedBox args={[0.3, 0.8, 0.3]} radius={0.1} position={[0.75, -1, 0]}>
                <meshStandardMaterial color="#ffffff" />
            </RoundedBox>
            {/* Legs */}
            <RoundedBox args={[0.35, 0.8, 0.35]} radius={0.1} position={[-0.3, -2, 0]}>
                <meshStandardMaterial color="#ffffff" />
            </RoundedBox>
            <RoundedBox args={[0.35, 0.8, 0.35]} radius={0.1} position={[0.3, -2, 0]}>
                <meshStandardMaterial color="#ffffff" />
            </RoundedBox>
        </group>
    );
};

const Robot = () => {
    const group = useRef<THREE.Group>(null!);
    const headRef = useRef<THREE.Group>(null!);
    const [blinking, setBlinking] = useState(false);

    // Blinking logic
    useFrame((state) => {
        // Random blinking
        if (Math.random() > 0.995 && !blinking) {
            setBlinking(true);
            setTimeout(() => setBlinking(false), 100);
        }

        if (group.current) {
            // Floating animation
            group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;

            // Body follows mouse slightly
            const x = (state.pointer.x * Math.PI) / 10;
            const y = (state.pointer.y * Math.PI) / 10;
            group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x, 0.1);
        }

        if (headRef.current) {
            // Head follows mouse more
            const x = (state.pointer.x * Math.PI) / 4;
            const y = (state.pointer.y * Math.PI) / 4;
            headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, x, 0.1);
            headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -y, 0.1);
        }
    });

    return (
        <group ref={group}>
            <group ref={headRef}>
                <RobotHead position={[0, 0, 0]} rotation={[0, 0, 0]} blinking={blinking} />
            </group>
            <RobotBody />
            <RobotLimbs />
        </group>
    );
};

// Basic physics orb
const Orb = ({ position, onDispose }: { position: [number, number, number], onDispose: () => void }) => {
    const mesh = useRef<THREE.Mesh>(null!);
    const [velocity] = useState(() => new THREE.Vector3((Math.random() - 0.5) * 2, Math.random() * 2 + 2, (Math.random() - 0.5) * 2));

    useFrame((state, delta) => {
        if (mesh.current) {
            // Gravity
            velocity.y -= 9.8 * delta;

            // Update position
            mesh.current.position.x += velocity.x * delta;
            mesh.current.position.y += velocity.y * delta;
            mesh.current.position.z += velocity.z * delta;

            // Floor bounce (y = -3 approx)
            if (mesh.current.position.y < -3) {
                mesh.current.position.y = -3;
                velocity.y *= -0.6; // Bounce damping
                velocity.x *= 0.9;  // Friction
                velocity.z *= 0.9;
            }

            // Dispose if too low or stops
            if (mesh.current.position.y <= -3 && Math.abs(velocity.y) < 0.1) {
                // Could fade out here, but for now just cleanup eventually
            }

            // Auto-remove after some time handled by parent or simple timeout logic not shown here, 
            // but we will prevent infinite drift by standard bounds or count.
        }
    });

    return (
        <Sphere ref={mesh} args={[0.2]} position={position}>
            <meshStandardMaterial color="#FBBF24" emissive="#F59E0B" emissiveIntensity={0.5} />
        </Sphere>
    );
};

export const MascotPlayground = () => {
    const [orbs, setOrbs] = useState<{ id: number; pos: [number, number, number] }[]>([]);

    const handlePointerDown = (e: any) => {
        // Spawn orb at click position (projected roughly or just random/center for fun)
        // For simplicity in this view, we spawn above the robot
        const id = Date.now();
        setOrbs(prev => [...prev.slice(-15), { id, pos: [0, 2, 1] }]); // Keep max 15 orbs
    };

    return (
        <div className="w-full h-[600px] relative rounded-3xl overflow-hidden bg-gradient-to-b from-sky-100 to-indigo-100">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                onPointerDown={handlePointerDown}
            >
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <pointLight position={[-5, -5, -5]} intensity={0.5} />

                <Robot />

                {orbs.map(orb => (
                    <Orb key={orb.id} position={orb.pos} onDispose={() => { }} />
                ))}

                <OrbitControls enableZoom={false} />
            </Canvas>
            <div className="absolute top-4 left-4 bg-white/80 p-2 rounded shadow text-sm font-mono text-slate-700 pointer-events-none">
                Test Mode: Click to Feed!
            </div>
        </div>
    );
};


export default MascotPlayground;

