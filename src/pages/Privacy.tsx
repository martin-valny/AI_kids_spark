import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GlassCard } from '@/components/ui/GlassCard';

const Privacy: React.FC = () => {
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
              Privacy Policy
            </h1>
            <p className="text-gray-500">Last updated: {lastUpdated}</p>
          </motion.div>

          <div className="space-y-8">
            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                Lumora ("we", "our", or "us") is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard
                your information when you use our website and services.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                Our platform is designed for users aged 13 and older. We do not knowingly
                collect personal information from children under 13 years of age.
              </p>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Email address (required for account creation)</li>
                    <li>Date of birth (for age verification)</li>
                    <li>Display name (optional)</li>
                    <li>Payment information (processed securely by Stripe)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Usage Information</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Lesson and project progress</li>
                    <li>Learning activity and completion data</li>
                    <li>Device and browser information</li>
                    <li>IP address and general location</li>
                  </ul>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>To provide and maintain our educational services</li>
                <li>To track your learning progress and achievements</li>
                <li>To process payments and manage subscriptions</li>
                <li>To send important updates about your account</li>
                <li>To improve our content and user experience</li>
                <li>To respond to your inquiries and support requests</li>
              </ul>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Sharing and Disclosure</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We do not sell your personal information. We may share your data with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li><strong>Service Providers:</strong> Supabase (database), Stripe (payments), Vercel (hosting)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger or acquisition</li>
              </ul>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights (GDPR)</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you are in the European Economic Area, you have the following rights:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Restriction:</strong> Limit how we process your data</li>
                <li><strong>Objection:</strong> Object to certain processing activities</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                To exercise these rights, visit your Account Settings or contact us at privacy@lumora.ai.
              </p>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
              <p className="text-gray-600 leading-relaxed">
                We implement industry-standard security measures to protect your data, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mt-4">
                <li>Encryption in transit (HTTPS/TLS)</li>
                <li>Encryption at rest for sensitive data</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
                <li>Secure payment processing via Stripe (PCI-DSS compliant)</li>
              </ul>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies</h2>
              <p className="text-gray-600 leading-relaxed">
                We use cookies and similar technologies to enhance your experience.
                You can manage your cookie preferences through our cookie consent banner
                or your browser settings. See our cookie categories:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 mt-4">
                <li><strong>Necessary:</strong> Required for site functionality</li>
                <li><strong>Analytics:</strong> Help us understand usage patterns</li>
                <li><strong>Marketing:</strong> Used for relevant content and ads</li>
              </ul>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
              <p className="text-gray-600 leading-relaxed">
                We retain your personal data for as long as your account is active or as needed
                to provide services. Upon account deletion, we will delete or anonymize your
                data within 30 days, except where retention is required by law.
              </p>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have questions about this Privacy Policy or our data practices,
                please contact us:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@lumora.ai<br />
                  <strong>Data Protection Officer:</strong> dpo@lumora.ai
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

export default Privacy;
