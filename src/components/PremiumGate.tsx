import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Crown, Sparkles } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';

interface PremiumGateProps {
  children: React.ReactNode;
  contentType?: 'lesson' | 'project' | 'feature';
  contentId?: string;
  fallback?: React.ReactNode;
}

export const PremiumGate: React.FC<PremiumGateProps> = ({
  children,
  contentType = 'feature',
  contentId,
  fallback,
}) => {
  const { user } = useAuth();
  const { isPremium, canAccessLesson, canAccessProject, loading } = useSubscription();

  // Check access based on content type
  const hasAccess = React.useMemo(() => {
    if (!contentId) return isPremium;

    switch (contentType) {
      case 'lesson':
        return canAccessLesson(contentId);
      case 'project':
        return canAccessProject(contentId);
      default:
        return isPremium;
    }
  }, [contentType, contentId, isPremium, canAccessLesson, canAccessProject]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-4 border-kids-purple border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // User has access - render children
  if (hasAccess) {
    return <>{children}</>;
  }

  // Custom fallback provided
  if (fallback) {
    return <>{fallback}</>;
  }

  // Default premium gate UI
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="my-8"
    >
      <GlassCard className="p-8 md:p-12 text-center max-w-2xl mx-auto border-2 border-kids-purple/20">
        <div className="w-20 h-20 bg-gradient-to-br from-kids-purple to-kids-blue rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-10 h-10 text-white" />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Premium Content
        </h2>

        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          {!user ? (
            <>
              Sign up for a free account to access basic lessons, or upgrade to Premium for unlimited access to all content.
            </>
          ) : (
            <>
              This {contentType} is part of our Premium collection. Upgrade to unlock all lessons, projects, and exclusive features.
            </>
          )}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!user ? (
            <>
              <Link to="/sign-up">
                <GradientButton variant="primary">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Sign Up Free
                </GradientButton>
              </Link>
              <Link to="/sign-in">
                <GradientButton variant="secondary">
                  Sign In
                </GradientButton>
              </Link>
            </>
          ) : (
            <Link to="/pricing">
              <GradientButton variant="primary">
                <Crown className="w-5 h-5 mr-2" />
                Upgrade to Premium
              </GradientButton>
            </Link>
          )}
        </div>

        {/* Feature highlights */}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-500 mb-4">Premium includes:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {[
              'All 50+ lessons',
              'Hands-on projects',
              'Progress tracking',
              'Certificates',
            ].map((feature, index) => (
              <span
                key={index}
                className="bg-kids-purple/10 text-kids-purple px-3 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

// Premium badge component for cards
export const PremiumBadge: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`inline-flex items-center gap-1 bg-gradient-to-r from-kids-purple to-kids-blue text-white text-xs font-bold px-2 py-1 rounded-full ${className}`}
  >
    <Crown className="w-3 h-3" />
    PREMIUM
  </div>
);

export default PremiumGate;
