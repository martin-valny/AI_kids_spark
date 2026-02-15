
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'Space Grotesk', 'system-ui', 'sans-serif'],
				serif: ['Newsreader', 'Georgia', 'serif'],
				mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Enhanced kid-friendly glassmorphism color palette
				kids: {
					blue: '#4285F4',
					'blue-light': '#E3F2FD',
					'blue-glass': 'rgba(66, 133, 244, 0.1)',
					red: '#EA4335',
					'red-light': '#FFEBEE',
					'red-glass': 'rgba(234, 67, 53, 0.1)',
					yellow: '#FBBC05',
					'yellow-light': '#FFFDE7',
					'yellow-glass': 'rgba(251, 188, 5, 0.1)',
					green: '#34A853',
					'green-light': '#E8F5E8',
					'green-glass': 'rgba(52, 168, 83, 0.1)',
					purple: '#9C27B0',
					'purple-light': '#F3E5F5',
					'purple-glass': 'rgba(156, 39, 176, 0.1)',
					pink: '#E91E63',
					'pink-light': '#FCE4EC',
					'pink-glass': 'rgba(233, 30, 99, 0.1)',
					orange: '#FF9800',
					'orange-light': '#FFF3E0',
					'orange-glass': 'rgba(255, 152, 0, 0.1)',
					teal: '#009688',
					'teal-light': '#E0F2F1',
					'teal-glass': 'rgba(0, 150, 136, 0.1)',
					// Pastel glassmorphism colors
					mint: '#B2DFDB',
					'mint-glass': 'rgba(178, 223, 219, 0.3)',
					lavender: '#E1BEE7',
					'lavender-glass': 'rgba(225, 190, 231, 0.3)',
					peach: '#FFCCBC',
					'peach-glass': 'rgba(255, 204, 188, 0.3)',
					sky: '#BBDEFB',
					'sky-glass': 'rgba(187, 222, 251, 0.3)',
					// Glass background variants - high opacity for readability + glass aesthetic
					'glass-white': 'rgba(255, 255, 255, 0.92)',
					'glass-white-strong': 'rgba(255, 255, 255, 0.96)',
					'glass-blue': 'rgba(227, 242, 253, 0.90)',
					'glass-purple': 'rgba(243, 229, 243, 0.90)',
					'glass-green': 'rgba(232, 245, 232, 0.90)',
					'glass-yellow': 'rgba(255, 253, 231, 0.90)',
					'glass-pink': 'rgba(252, 228, 236, 0.90)',
					'glass-orange': 'rgba(255, 243, 224, 0.90)',
					'glass-red': 'rgba(255, 235, 238, 0.90)',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'glass': '24px',
				'glass-lg': '32px',
			},
			backdropBlur: {
				'glass': '16px',
				'glass-strong': '24px',
			},
			boxShadow: {
				'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
				'glass-strong': '0 12px 40px rgba(0, 0, 0, 0.15)',
				'glass-hover': '0 16px 48px rgba(0, 0, 0, 0.2)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'bounce-gentle': {
					'0%, 100%': {
						transform: 'translateY(0)',
						animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
					},
					'50%': {
						transform: 'translateY(-15px)',
						animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
					}
				},
				'wiggle': {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				},
				'glass-shine': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'gradient-flow': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'bounce-gentle': 'bounce-gentle 2s infinite',
				'wiggle': 'wiggle 1s ease-in-out infinite',
				'glass-shine': 'glass-shine 2s ease-in-out infinite',
				'gradient-flow': 'gradient-flow 3s ease-in-out infinite',
				'fade-in': 'fade-in 0.3s ease-out'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
