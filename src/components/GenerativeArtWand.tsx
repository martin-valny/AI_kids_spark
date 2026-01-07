import React, { useRef, useEffect } from 'react';

const GenerativeArtWand = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const particles: Particle[] = [];
        let animationFrameId: number;
        let hue = 0;

        const mouse = { x: 0, y: 0, active: false };

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;

            constructor() {
                this.x = mouse.x;
                this.y = mouse.y;
                this.size = Math.random() * 15 + 1;
                this.speedX = Math.random() * 3 - 1.5;
                this.speedY = Math.random() * 3 - 1.5;
                this.color = `hsl(${hue}, 100%, 50%)`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.size > 0.2) this.size -= 0.1;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const handleResize = () => {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        };

        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
            mouse.active = true;

            // Spawn multiple particles for dense trail
            for (let i = 0; i < 3; i++) {
                particles.push(new Particle());
            }
        };

        const handleMouseLeave = () => {
            mouse.active = false;
        }

        const animate = () => {
            // Semi-transparent clear for trails
            ctx.fillStyle = 'rgba(0,0,0,0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.globalCompositeOperation = 'lighter'; // Glowing effect

            particles.forEach((particle, index) => {
                particle.update();
                particle.draw();
                if (particle.size <= 0.3) {
                    particles.splice(index, 1);
                }
            });

            ctx.globalCompositeOperation = 'source-over'; // Reset

            if (mouse.active) {
                // Auto evolving color
                hue += 2;
            } else {
                // Idle animation if no mouse? Maybe spawn random fireworks
                if (Math.random() < 0.05) {
                    mouse.x = Math.random() * canvas.width;
                    mouse.y = Math.random() * canvas.height;
                    particles.push(new Particle());
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        // Init
        handleResize();
        window.addEventListener('resize', handleResize);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full h-[600px] relative rounded-3xl overflow-hidden bg-black shadow-2xl cursor-crosshair group">
            <canvas ref={canvasRef} className="absolute inset-0 z-10" />

            {/* Overlay Text - Pointer Events None to allow drawing through it */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-20">
                <div className="bg-black/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center select-none group-hover:opacity-20 transition-opacity duration-500">
                    <div className="text-4xl mb-2">✨</div>
                    <h3 className="text-2xl font-bold text-white mb-1">Your AI Magic Wand</h3>
                    <p className="text-gray-300">Move your cursor to create art</p>
                </div>
            </div>

            {/* Hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none text-white/40 text-sm animate-pulse">
                Click and drag to paint
            </div>
        </div>
    );
};

export default GenerativeArtWand;
