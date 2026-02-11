import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { neoBrutalist } from '@/constants/landingColors';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: 'DO I NEED ANY EXPERIENCE?',
    answer: 'Nope. Zero. If you can use TikTok, you can use this. Every module starts from absolute beginner level and builds up step by step.',
  },
  {
    question: 'WHAT TOOLS WILL I LEARN?',
    answer: 'You\'ll master Runway, ChatGPT, Suno, Make.com, Midjourney, Eleven Labs, Canva, and Notion AI — the same tools professionals use every day.',
  },
  {
    question: 'CAN I ACTUALLY MAKE MONEY?',
    answer: 'Yes. Our students have collectively earned $847K+. Sarah Chen earned $2,150 in 45 days. Marcus Johnson landed his first gig in a week. We teach real, marketable skills.',
  },
  {
    question: 'HOW LONG DOES IT TAKE?',
    answer: 'Most students complete their first project in 7-14 days and start earning within 30 days. The full curriculum is 45 lessons across 60+ hours, done at your own pace.',
  },
  {
    question: 'CAN I CANCEL ANYTIME?',
    answer: 'Absolutely. No contracts, no cancellation fees. Cancel from your account settings anytime. Your access continues until the end of your billing period.',
  },
  {
    question: 'IS THERE A REFUND POLICY?',
    answer: 'We offer a 7-day free trial on premium. If you\'re not satisfied during that time, you pay nothing. After the trial, you can cancel anytime.',
  },
  {
    question: 'WHAT AGE RANGE IS THIS FOR?',
    answer: 'Lumora is designed for teens and young adults (13-25), but anyone can join. Our community is moderated 24/7 and all content is age-appropriate.',
  },
];

function FAQItemComponent({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      style={{
        border: `4px solid ${neoBrutalist.lime}`,
        backgroundColor: neoBrutalist.black,
        marginBottom: '8px',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 cursor-pointer text-left"
        style={{ background: 'none', border: 'none', color: '#fff' }}
      >
        <span className="font-bold uppercase text-sm md:text-base pr-4">
          {item.question}
        </span>
        <span
          className="text-2xl font-bold flex-shrink-0 transition-transform duration-200"
          style={{
            color: neoBrutalist.lime,
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          +
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="px-6 pb-5 text-sm md:text-base leading-relaxed"
              style={{
                borderLeft: `8px solid ${neoBrutalist.lime}`,
                marginLeft: '16px',
                paddingLeft: '16px',
                color: '#ccc',
              }}
            >
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-4xl md:text-6xl font-bold uppercase mb-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          QUESTIONS?
        </motion.h2>
        <p
          className="text-lg font-bold uppercase mb-16 tracking-wider text-center"
          style={{ color: neoBrutalist.lime }}
        >
          WE GOT ANSWERS.
        </p>

        <div>
          {FAQ_DATA.map((item, i) => (
            <FAQItemComponent
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
