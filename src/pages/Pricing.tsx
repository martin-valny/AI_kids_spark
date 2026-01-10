import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Sparkles, Loader2, Crown, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { PRICING, FREE_FEATURES, PricingPlan } from '@/lib/stripe';

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPremium, createCheckoutSession } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan>('monthly');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (plan: PricingPlan) => {
    if (!user) {
      navigate('/sign-up');
      return;
    }

    if (isPremium) {
      return;
    }

    setLoading(true);
    setError(null);

    const { url, error: checkoutError } = await createCheckoutSession(plan);

    if (checkoutError) {
      setError(checkoutError.message);
      setLoading(false);
      return;
    }

    if (url) {
      window.location.href = url;
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <Header />
      <main className="pt-32 pb-20 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-kids-purple/10 text-kids-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Simple, transparent pricing
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
              Unlock Your Full{' '}
              <span className="bg-gradient-to-r from-kids-blue to-kids-purple bg-clip-text text-transparent">
                AI Learning
              </span>{' '}
              Potential
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start with our free lessons, or go premium for unlimited access to all content, projects, and features.
            </p>
          </motion.div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-full p-1 shadow-lg border border-gray-100">
              <button
                onClick={() => setSelectedPlan('monthly')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedPlan === 'monthly'
                    ? 'bg-gradient-to-r from-kids-blue to-kids-purple text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedPlan('yearly')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedPlan === 'yearly'
                    ? 'bg-gradient-to-r from-kids-blue to-kids-purple text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-2 text-xs bg-kids-green text-white px-2 py-0.5 rounded-full">
                  Save 17%
                </span>
              </button>
            </div>
          </div>

          {error && (
            <div className="max-w-md mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-center text-red-700">
              {error}
            </div>
          )}

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <GlassCard className="p-8 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Free</h3>
                    <p className="text-sm text-gray-500">Get started</p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-500">/forever</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {FREE_FEATURES.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-kids-green flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <GradientButton
                  variant="secondary"
                  className="w-full"
                  onClick={() => navigate('/lessons')}
                >
                  Start Free
                </GradientButton>
              </GlassCard>
            </motion.div>

            {/* Premium Tier */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard className="p-8 h-full border-2 border-kids-purple relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-gradient-to-r from-kids-purple to-kids-blue text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-kids-purple to-kids-blue rounded-xl flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Premium</h3>
                    <p className="text-sm text-gray-500">Full access</p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ${PRICING[selectedPlan].price}
                  </span>
                  <span className="text-gray-500">/{PRICING[selectedPlan].interval}</span>
                  {selectedPlan === 'yearly' && (
                    <div className="text-sm text-kids-green mt-1">
                      Save ${(9.99 * 12 - 99.99).toFixed(2)}/year
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {PRICING[selectedPlan].features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-kids-purple flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <GradientButton
                  variant="primary"
                  className="w-full"
                  onClick={() => handleSubscribe(selectedPlan)}
                  disabled={loading || isPremium}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : isPremium ? (
                    'Already Subscribed'
                  ) : (
                    'Start Premium'
                  )}
                </GradientButton>

                <p className="text-center text-xs text-gray-500 mt-4">
                  Cancel anytime. No questions asked.
                </p>
              </GlassCard>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-20 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: 'Can I try premium features before subscribing?',
                  a: 'Yes! Our free tier includes introductory lessons so you can experience the quality of our content. You can upgrade anytime to unlock all lessons and projects.',
                },
                {
                  q: 'Can I cancel my subscription?',
                  a: 'Absolutely. You can cancel anytime from your account settings. Your access will continue until the end of your billing period.',
                },
                {
                  q: 'Is there a family plan?',
                  a: "Not yet, but it's on our roadmap! Sign up for our newsletter to be notified when family plans become available.",
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards (Visa, Mastercard, American Express) through our secure payment partner, Stripe.',
                },
              ].map((faq, index) => (
                <GlassCard key={index} className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
