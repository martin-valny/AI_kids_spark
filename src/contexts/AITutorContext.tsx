import { createContext, useContext, useState } from 'react';
import OpenAI from 'openai';

// Only initialize OpenAI if API key is available (prevents crash in production without env vars)
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const openai = apiKey
  ? new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true // Only for MVP, move to backend later
    })
  : null;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AITutorContextType {
  messages: Message[];
  sendMessage: (message: string, lessonContext?: string) => Promise<void>;
  clearChat: () => void;
  isLoading: boolean;
}

export const AITutorContext = createContext<AITutorContextType | null>(null);

export function AITutorProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    content: 'Hi! I\'m your AI learning assistant. Ask me anything about the lesson!'
  }]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string, lessonContext?: string) => {
    setIsLoading(true);

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: message }]);

    try {
      // If OpenAI isn't configured, show a friendly message
      if (!openai) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'AI Tutor is not available in demo mode. The full experience requires API configuration.'
        }]);
        return;
      }

      const systemPrompt = `You are a friendly AI tutor helping teens (ages 13-25)
learn about AI and creative applications. You are encouraging, clear, and
educational. Keep responses concise (2-3 paragraphs max).

${lessonContext ? `Current lesson context: ${lessonContext}` : ''}

Guidelines:
- Be encouraging and positive
- Explain concepts clearly
- Use analogies and examples
- Don't just give answers - guide students to understand
- Relate to creative applications when possible`;

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map(m => ({ role: m.role, content: m.content })),
          { role: 'user', content: message }
        ],
        max_tokens: 200,
        temperature: 0.7,
      });

      const assistantMessage = response.choices[0].message.content ||
        'Sorry, I couldn\'t generate a response.';

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: assistantMessage
      }]);
    } catch (error) {
      console.error('AI Tutor error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I\'m having trouble right now. Please try again!'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: 'Hi! I\'m your AI learning assistant. Ask me anything about the lesson!'
    }]);
  };

  return (
    <AITutorContext.Provider value={{ messages, sendMessage, clearChat, isLoading }}>
      {children}
    </AITutorContext.Provider>
  );
}

export const useAITutor = () => {
  const context = useContext(AITutorContext);
  if (!context) throw new Error('useAITutor must be used within AITutorProvider');
  return context;
};
