import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GradientButton } from '@/components/ui/GradientButton';

const COOKIE_CONSENT_KEY = 'ai-spark-cookie-consent';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always required
  analytics: false,
  marketing: false,
  timestamp: '',
};

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    // Check if user has already consented
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    const toSave = {
      ...prefs,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(toSave));
    setIsVisible(false);
  };

  const acceptAll = () => {
    savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: '',
    });
  };

  const acceptNecessary = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: '',
    });
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Main banner */}
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-kids-purple/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-kids-purple" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    We value your privacy
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    We use cookies to enhance your learning experience, analyze site traffic, and personalize content.
                    You can choose which cookies you'd like to allow.{' '}
                    <Link to="/privacy" className="text-kids-blue hover:underline">
                      Learn more
                    </Link>
                  </p>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-3">
                    <GradientButton variant="primary" onClick={acceptAll}>
                      <Check className="w-4 h-4 mr-2" />
                      Accept All
                    </GradientButton>
                    <GradientButton variant="secondary" onClick={acceptNecessary}>
                      Necessary Only
                    </GradientButton>
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Customize
                    </button>
                  </div>
                </div>
                <button
                  onClick={acceptNecessary}
                  className="text-gray-400 hover:text-gray-600 p-1"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Detailed preferences */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-gray-100 overflow-hidden"
                >
                  <div className="p-6 bg-gray-50 space-y-4">
                    {/* Necessary cookies */}
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                      <div>
                        <h4 className="font-medium text-gray-900">Necessary Cookies</h4>
                        <p className="text-sm text-gray-500">
                          Required for the site to function properly. Cannot be disabled.
                        </p>
                      </div>
                      <div className="w-12 h-6 bg-kids-green rounded-full flex items-center justify-end px-1">
                        <div className="w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>

                    {/* Analytics cookies */}
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                      <div>
                        <h4 className="font-medium text-gray-900">Analytics Cookies</h4>
                        <p className="text-sm text-gray-500">
                          Help us understand how you use the site to improve your experience.
                        </p>
                      </div>
                      <button
                        onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                        className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                          preferences.analytics ? 'bg-kids-green justify-end' : 'bg-gray-200 justify-start'
                        }`}
                      >
                        <div className="w-4 h-4 bg-white rounded-full shadow" />
                      </button>
                    </div>

                    {/* Marketing cookies */}
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                      <div>
                        <h4 className="font-medium text-gray-900">Marketing Cookies</h4>
                        <p className="text-sm text-gray-500">
                          Used to show you relevant content and advertisements.
                        </p>
                      </div>
                      <button
                        onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                        className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                          preferences.marketing ? 'bg-kids-green justify-end' : 'bg-gray-200 justify-start'
                        }`}
                      >
                        <div className="w-4 h-4 bg-white rounded-full shadow" />
                      </button>
                    </div>

                    <div className="flex justify-end pt-2">
                      <GradientButton variant="primary" onClick={saveCustomPreferences}>
                        Save Preferences
                      </GradientButton>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook to get current cookie preferences
export const useCookiePreferences = (): CookiePreferences | null => {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored) {
      setPreferences(JSON.parse(stored));
    }
  }, []);

  return preferences;
};

export default CookieConsent;
