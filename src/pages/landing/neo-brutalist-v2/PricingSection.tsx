import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { neoBrutalist } from '@/constants/landingColors';

const FEATURES = [
  'All 45 Lessons',
  '60+ Hours of Content',
  'Lifetime Access',
  'Certificate of Completion',
  'Private Discord Community',
  'Downloadable Resources',
  '4 Portfolio Projects',
  'AI Editor Access',
];

export default function PricingSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-6xl font-bold uppercase mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          ONE PRICE. FULL ACCESS.
        </motion.h2>
        <p
          className="text-lg font-bold uppercase mb-16 tracking-wider"
          style={{ color: neoBrutalist.lime }}
        >
          NO TIERS. NO UPSELLS. NO BS.
        </p>

        <motion.div
          className="text-left mx-auto"
          style={{
            maxWidth: '480px',
            backgroundColor: neoBrutalist.black,
            border: `8px solid ${neoBrutalist.lime}`,
            padding: '40px',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          {/* Price */}
          <div className="mb-8">
            <div className="flex items-baseline gap-1">
              <span
                className="text-2xl font-bold"
                style={{ color: neoBrutalist.mediumGray }}
              >
                $
              </span>
              <span
                className="text-7xl font-extrabold"
                style={{ color: neoBrutalist.lime }}
              >
                9.99
              </span>
              <span
                className="text-xl font-bold uppercase"
                style={{ color: neoBrutalist.mediumGray }}
              >
                /month
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4 mb-10">
            {FEATURES.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <Check
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: neoBrutalist.lime }}
                />
                <span className="font-bold uppercase text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            className="w-full py-4 font-extrabold uppercase text-lg flex items-center justify-center gap-3 cursor-pointer transition-all duration-200"
            style={{
              backgroundColor: neoBrutalist.lime,
              color: neoBrutalist.black,
              border: `4px solid ${neoBrutalist.lime}`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = `0 0 30px ${neoBrutalist.limeGlow}`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            START FREE TRIAL
            <ArrowRight className="w-6 h-6" />
          </button>

          <p
            className="text-center text-sm font-bold uppercase mt-4"
            style={{ color: neoBrutalist.mediumGray }}
          >
            FREE FOR 7 DAYS. CANCEL ANYTIME.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
