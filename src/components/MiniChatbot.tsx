import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const predefinedResponses: Record<string, string> = {
    'hello': 'Hi there! 👋 I\'m an AI chatbot. I can answer questions about AI!',
    'hi': 'Hello! 😊 Want to learn something cool about AI?',
    'what is ai': 'AI stands for Artificial Intelligence! It\'s when computers learn to think and solve problems like humans do. Pretty cool, right?',
    'how do you work': 'I use machine learning! I was trained on lots of conversations so I can understand what you\'re asking and give helpful answers.',
    'tell me a joke': 'Why did the robot go to school? To improve its AI-Q! 🤖😄',
    'what can you do': 'I can chat with you, answer questions about AI, and help you learn! Try asking me "What is AI?" or "How do you work?"',
    'bye': 'Goodbye! Keep learning about AI! 🚀',
    'default': 'That\'s an interesting question! In a full chatbot, I\'d have more answers. Try asking: "What is AI?" or "Tell me a joke!"'
};

export const MiniChatbot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: 'Hi! I\'m an AI chatbot. Ask me anything about AI! Try "What is AI?" or "Tell me a joke!"',
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const getResponse = (userMessage: string): string => {
        const lowerMessage = userMessage.toLowerCase().trim();

        for (const [key, response] of Object.entries(predefinedResponses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }

        return predefinedResponses.default;
    };

    const handleSend = () => {
        if (!input.trim()) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now(),
            text: input,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate bot thinking and responding
        setTimeout(() => {
            const botResponse: Message = {
                id: Date.now() + 1,
                text: getResponse(input),
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
        >
            {/* Header */}
            <div className="bg-gradient-to-r from-kids-blue to-kids-purple p-4 text-white">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Bot className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">AI Chatbot Demo</h3>
                        <p className="text-xs text-blue-100">Try chatting with me!</p>
                    </div>
                    <motion.div
                        className="ml-auto"
                        animate={{
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        <Sparkles className="w-5 h-5" />
                    </motion.div>
                </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
                <AnimatePresence>
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                {/* Avatar */}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === 'user'
                                        ? 'bg-gradient-to-br from-kids-purple to-kids-blue'
                                        : 'bg-gradient-to-br from-kids-blue to-kids-green'
                                    }`}>
                                    {message.sender === 'user' ? (
                                        <User className="w-5 h-5 text-white" />
                                    ) : (
                                        <Bot className="w-5 h-5 text-white" />
                                    )}
                                </div>

                                {/* Message bubble */}
                                <div className={`rounded-2xl px-4 py-2 ${message.sender === 'user'
                                        ? 'bg-gradient-to-r from-kids-blue to-kids-purple text-white'
                                        : 'bg-white border border-gray-200 text-gray-800'
                                    }`}>
                                    <p className="text-sm leading-relaxed">{message.text}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Typing indicator */}
                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                    >
                        <div className="flex gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-kids-blue to-kids-green flex items-center justify-center">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                                <div className="flex gap-1">
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            className="w-2 h-2 bg-gray-400 rounded-full"
                                            animate={{
                                                y: [0, -8, 0],
                                            }}
                                            transition={{
                                                duration: 0.6,
                                                repeat: Infinity,
                                                delay: i * 0.2,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-kids-blue focus:border-transparent text-sm"
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="px-4 py-2 bg-gradient-to-r from-kids-blue to-kids-purple text-white rounded-full hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-5 h-5" />
                    </motion.button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                    This is a demo chatbot. Try asking about AI!
                </p>
            </div>
        </motion.div>
    );
};
