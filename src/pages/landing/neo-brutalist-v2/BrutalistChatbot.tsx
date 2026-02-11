import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const QUICK_ACTIONS = [
  { label: '💰 How much can I earn?', key: 'earn' },
  { label: '📚 What will I learn?', key: 'learn' },
  { label: '⏱️ How long does it take?', key: 'time' },
  { label: '🎯 Is this for beginners?', key: 'beginner' },
];

const RESPONSES: Record<string, string> = {
  earn: 'Students earn an average of $150 per project. Top performers like Sarah Chen earned $2,150 in just 45 days! Your earnings depend on the skills you build and the gigs you take on.',
  learn: 'You\'ll master 4 domains: AI Video Editing (Runway, CapCut), AI Music Production (Suno), AI Content Writing (ChatGPT), and AI Automation (Make.com). That\'s 45 lessons across 60+ hours.',
  time: 'Most students complete their first project in 7-14 days and start earning within 30 days. The full curriculum takes about 8-12 weeks at your own pace.',
  beginner: 'Absolutely! Zero experience needed. If you can use TikTok, you can use this. Every module starts from the very basics and builds up.',
  price: 'Lumora is FREE to start — no credit card required. Premium unlocks all 45 lessons, projects, and AI tools for $9.99/month. Cancel anytime.',
  free: 'Yes! You can start completely free with introductory lessons. No credit card needed. Premium is $9.99/month when you\'re ready.',
  hello: 'Hey! 👋 I\'m the Lumora AI assistant. Ask me anything about the platform, courses, or how students are earning money with AI skills!',
  hi: 'Hey! 👋 I\'m the Lumora AI assistant. Ask me anything about the platform, courses, or how students are earning money with AI skills!',
  refund: 'We offer a 7-day free trial on premium. If you\'re not satisfied, cancel anytime — no questions asked. We want you to feel confident.',
  cancel: 'You can cancel your subscription anytime from your account settings. No hidden fees, no cancellation charges.',
  safe: 'Safety is our top priority. Our community is moderated 24/7, and all content is age-appropriate. Parents can monitor progress through the dashboard.',
  age: 'Lumora is designed for teens and young adults (13-25), but anyone can join. The content is beginner-friendly regardless of age.',
  tools: 'You\'ll use Runway, ChatGPT, Suno, Make.com, Midjourney, Eleven Labs, Canva, and Notion AI — the same tools professionals use.',
  discord: 'Yes! Premium members get access to our private Discord community with 10,000+ creators, mentors, and weekly challenges.',
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(RESPONSES)) {
    if (lower.includes(key)) return response;
  }
  return 'Great question! For detailed info, check out our course modules above or start your free trial to explore everything Lumora offers. Is there something specific I can help with?';
}

export default function BrutalistChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: 'Hey! 👋 I\'m Lumora AI. Ask me anything about our courses, pricing, or how students earn with AI!', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  // Show button after 10% scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setIsVisible(scrollPercent > 0.1);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: nextId.current++, text: text.trim(), sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(text);
      const botMsg: Message = { id: nextId.current++, text: response, sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  const handleQuickAction = (key: string) => {
    const action = QUICK_ACTIONS.find(a => a.key === key);
    if (action) sendMessage(action.label.replace(/^.{2}\s/, ''));
  };

  const hasUserMessages = messages.some(m => m.sender === 'user');

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="fixed z-50 flex flex-col items-center justify-center cursor-pointer"
            style={{
              bottom: '24px',
              right: '24px',
              width: '64px',
              height: '64px',
              backgroundColor: '#000',
              border: '3px solid #BFFF00',
              color: '#BFFF00',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(191,255,0,0.5)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <>
                <MessageCircle className="w-6 h-6" />
                <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.5px', marginTop: '2px' }}>
                  ASK AI
                </span>
              </>
            )}
            {/* Pulse ring */}
            {!isOpen && (
              <motion.div
                className="absolute inset-0"
                style={{ border: '3px solid #BFFF00', pointerEvents: 'none' }}
                animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed z-[65] flex flex-col font-mono"
            style={{
              bottom: '100px',
              right: '24px',
              width: '380px',
              maxHeight: '550px',
              backgroundColor: '#000',
              border: '4px solid #BFFF00',
            }}
            initial={{ scale: 0, opacity: 0, transformOrigin: 'bottom right' }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: '3px solid #BFFF00' }}
            >
              <span
                className="font-extrabold uppercase text-sm tracking-wider"
                style={{ color: '#BFFF00' }}
              >
                LUMORA AI
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer"
                style={{ color: '#BFFF00', background: 'none', border: 'none' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-3"
              style={{ maxHeight: '350px', minHeight: '200px' }}
            >
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[80%] px-3 py-2 text-sm"
                    style={{
                      backgroundColor: msg.sender === 'user' ? '#BFFF00' : '#000',
                      color: msg.sender === 'user' ? '#000' : '#FFF',
                      border: `2px solid #BFFF00`,
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div
                    className="px-3 py-2 text-sm"
                    style={{ color: '#BFFF00', border: '2px solid #BFFF00' }}
                  >
                    <motion.span
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      THINKING...
                    </motion.span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {!hasUserMessages && (
              <div
                className="px-4 py-2 flex flex-wrap gap-2"
                style={{ borderTop: '2px solid #333' }}
              >
                {QUICK_ACTIONS.map(action => (
                  <button
                    key={action.key}
                    onClick={() => handleQuickAction(action.key)}
                    className="text-xs font-bold uppercase cursor-pointer px-3 py-2 transition-colors"
                    style={{
                      backgroundColor: '#000',
                      color: '#BFFF00',
                      border: '2px solid #BFFF00',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = '#BFFF00';
                      e.currentTarget.style.color = '#000';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = '#000';
                      e.currentTarget.style.color = '#BFFF00';
                    }}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div
              className="flex gap-2 p-3"
              style={{ borderTop: '3px solid #BFFF00' }}
            >
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(input);
                  }
                }}
                placeholder="ASK ANYTHING..."
                className="flex-1 px-3 py-2 text-sm font-mono"
                style={{
                  backgroundColor: '#000',
                  color: '#FFF',
                  border: '2px solid #BFFF00',
                  outline: 'none',
                }}
              />
              <button
                onClick={() => sendMessage(input)}
                className="px-4 py-2 font-extrabold cursor-pointer"
                style={{
                  backgroundColor: '#BFFF00',
                  color: '#000',
                  border: 'none',
                }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile responsive styles via media query in inline style */}
      <style>{`
        /* Hide global AITutor button and chat window on this landing page */
        button.fixed.bottom-6.right-6.rounded-full.bg-gradient-to-r { display: none !important; }
        div.fixed.bottom-6.right-6.w-96 { display: none !important; }

        @media (max-width: 480px) {
          .fixed[style*="width: 380px"] {
            width: calc(100vw - 32px) !important;
            right: 16px !important;
            bottom: 96px !important;
            max-height: 70vh !important;
          }
        }
      `}</style>
    </>
  );
}
