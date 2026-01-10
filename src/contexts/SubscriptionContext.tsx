import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/lib/supabase';
import {
  Subscription,
  SubscriptionStatus,
  PREMIUM_LESSONS,
  PREMIUM_PROJECTS,
  PRICING,
  PricingPlan
} from '@/lib/stripe';

interface SubscriptionContextType {
  subscription: Subscription | null;
  loading: boolean;
  isPremium: boolean;
  canAccessLesson: (lessonId: string) => boolean;
  canAccessProject: (projectId: string) => boolean;
  createCheckoutSession: (plan: PricingPlan) => Promise<{ url: string | null; error: Error | null }>;
  openCustomerPortal: () => Promise<{ url: string | null; error: Error | null }>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user has active premium subscription
  const isPremium = subscription?.status === 'active' || subscription?.status === 'trialing';

  // Fetch subscription on user change
  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) {
        setSubscription(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .in('status', ['active', 'trialing', 'past_due'])
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error);
      }

      setSubscription(data as Subscription | null);
      setLoading(false);
    };

    fetchSubscription();

    // Subscribe to subscription changes
    const channel = supabase
      .channel('subscription-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'subscriptions',
          filter: `user_id=eq.${user?.id}`,
        },
        (payload) => {
          if (payload.eventType === 'DELETE') {
            setSubscription(null);
          } else {
            setSubscription(payload.new as Subscription);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Check if user can access a specific lesson
  const canAccessLesson = (lessonId: string): boolean => {
    // Free lessons are always accessible
    if (!PREMIUM_LESSONS.includes(lessonId)) {
      return true;
    }
    // Premium lessons require subscription
    return isPremium;
  };

  // Check if user can access a specific project
  const canAccessProject = (projectId: string): boolean => {
    // Free projects are always accessible
    if (!PREMIUM_PROJECTS.includes(projectId)) {
      return true;
    }
    // Premium projects require subscription
    return isPremium;
  };

  // Create Stripe checkout session
  const createCheckoutSession = async (
    plan: PricingPlan
  ): Promise<{ url: string | null; error: Error | null }> => {
    if (!user) {
      return { url: null, error: new Error('Please sign in to subscribe') };
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          priceId: PRICING[plan].priceId,
          userId: user.id,
          customerEmail: user.email,
        },
      });

      if (error) throw error;
      return { url: data.url, error: null };
    } catch (error) {
      console.error('Checkout error:', error);
      return { url: null, error: error as Error };
    }
  };

  // Open Stripe customer portal
  const openCustomerPortal = async (): Promise<{ url: string | null; error: Error | null }> => {
    if (!user) {
      return { url: null, error: new Error('Please sign in first') };
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-portal-session', {
        body: { userId: user.id },
      });

      if (error) throw error;
      return { url: data.url, error: null };
    } catch (error) {
      console.error('Portal error:', error);
      return { url: null, error: error as Error };
    }
  };

  const value = {
    subscription,
    loading,
    isPremium,
    canAccessLesson,
    canAccessProject,
    createCheckoutSession,
    openCustomerPortal,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
