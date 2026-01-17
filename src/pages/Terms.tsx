import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GlassCard } from '@/components/ui/GlassCard';

const Terms: React.FC = () => {
  const lastUpdated = 'January 2026';

  return (
    <div className="min-h-screen font-sans">
      <Header />
      <main className="pt-32 pb-20 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Terms of Service
            </h1>
            <p className="text-gray-500">Last updated: {lastUpdated}</p>
          </motion.div>

          <div className="space-y-8">
            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing or using Lumora ("Service"), you agree to be bound by these
                Terms of Service. If you do not agree to these terms, please do not use our Service.
              </p>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Eligibility</h2>
              <p className="text-gray-600 leading-relaxed">
                You must be at least 13 years old to use Lumora. By creating an account,
                you represent that you are at least 13 years of age. Users between 13 and 18
                should have parental or guardian consent to use our services.
              </p>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Account Registration</h2>
              <div className="space-y-4 text-gray-600">
                <p>When creating an account, you agree to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>Be responsible for all activities under your account</li>
                </ul>
              </div>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Subscription and Payments</h2>
              <div className="space-y-4 text-gray-600">
                <p><strong>Free Tier:</strong> Basic access to introductory lessons at no cost.</p>
                <p><strong>Premium Subscription:</strong> Full access to all content for $9.99/month or $99.99/year.</p>
                <ul className="list-disc list-inside space-y-2 mt-4">
                  <li>Subscriptions auto-renew unless canceled</li>
                  <li>Cancel anytime through your account settings</li>
                  <li>Refunds are handled on a case-by-case basis</li>
                  <li>Price changes will be communicated 30 days in advance</li>
                </ul>
              </div>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Acceptable Use</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Share your account credentials with others</li>
                <li>Copy, distribute, or modify our content without permission</li>
                <li>Use the Service for any illegal purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Harass, abuse, or harm other users</li>
              </ul>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
              <p className="text-gray-600 leading-relaxed">
                All content on Lumora, including lessons, projects, graphics, and software,
                is owned by Lumora or its licensors and is protected by copyright and other
                intellectual property laws. You may not reproduce, distribute, or create
                derivative works without our express permission.
              </p>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. User Content</h2>
              <p className="text-gray-600 leading-relaxed">
                Any content you create or submit while using our Service (such as project
                submissions or comments) remains your property. However, you grant us a
                non-exclusive, royalty-free license to use, display, and distribute such
                content in connection with our Service.
              </p>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimers</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. We do not guarantee
                  that the Service will be uninterrupted, secure, or error-free.
                </p>
                <p>
                  Educational content is for informational purposes only and should not be considered
                  professional advice. AI concepts and technologies evolve rapidly; some content may
                  become outdated.
                </p>
              </div>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                To the maximum extent permitted by law, Lumora shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages arising from
                your use of the Service. Our total liability shall not exceed the amount you
                paid for the Service in the 12 months preceding the claim.
              </p>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
              <p className="text-gray-600 leading-relaxed">
                We may terminate or suspend your account at any time for violation of these Terms
                or for any other reason at our discretion. Upon termination, your right to use
                the Service will immediately cease. You may also delete your account at any time
                through your account settings.
              </p>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update these Terms from time to time. We will notify you of significant
                changes via email or through the Service. Continued use after changes constitutes
                acceptance of the new Terms.
              </p>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-600 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of
                the jurisdiction in which Lumora operates, without regard to conflict of law principles.
              </p>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have questions about these Terms, please contact us:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@lumora.ai
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
