import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { useAITutor } from '@/contexts/AITutorContext';
import { GlassCard } from './ui/GlassCard';

interface AITutorProps {
  lessonContext?: string;
}

export default function AITutor({ lessonContext }: AITutorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, sendMessage, isLoading } = useAITutor();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    await sendMessage(input, lessonContext);
    setInput('');
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-kids-purple to-kids-pink rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50"
        >
          <Sparkles className="w-8 h-8 text-white" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] z-50">
          <GlassCard className="h-full flex flex-col p-0">
            {/* Header */}
            <div className="bg-gradient-to-r from-kids-purple to-kids-pink p-4 rounded-t-3xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-white" />
                <div>
                  <h3 className="font-bold text-white">AI Tutor</h3>
                  <p className="text-xs text-white/80">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-kids-blue text-white'
                        : 'bg-white/50 text-gray-800 border border-gray-200'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/50 border border-gray-200 p-3 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-kids-purple rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-kids-purple rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-kids-purple rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 rounded-full border-2 border-gray-300 focus:border-kids-purple focus:outline-none"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-12 h-12 bg-kids-purple text-white rounded-full flex items-center justify-center hover:bg-kids-purple/90 disabled:opacity-50 transition"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>

              {/* Suggested Questions */}
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setInput('Can you explain this in simpler terms?')}
                  className="text-xs px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                >
                  Explain simpler
                </button>
                <button
                  type="button"
                  onClick={() => setInput('Give me a real-world example')}
                  className="text-xs px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                >
                  Real example
                </button>
                <button
                  type="button"
                  onClick={() => setInput('What should I learn next?')}
                  className="text-xs px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                >
                  What's next?
                </button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </>
  );
}
