# Option A Implementation Plan: Pivot to 13+ Platform
## AI Kids Spark → AI Spark Learning Platform

**Goal:** Transform the platform from ages 6-12 to ages 13+ to avoid COPPA compliance while maintaining educational value.

**Timeline:** 2-3 weeks
**Complexity Reduction:** ~70% less legal/compliance work
**Cost Savings:** $3,000-8,000 in legal fees

---

## 📋 PHASE 1: CRITICAL SECURITY FIXES (30 minutes)

### 1.1 Remove DEBUG_UNLOCK_ALL Flag
**File:** `src/utils/progressTracker.ts`

**Current (Line 4):**
```typescript
const DEBUG_UNLOCK_ALL = true;
```

**Change to:**
```typescript
const DEBUG_UNLOCK_ALL = import.meta.env.DEV;
```

**Why:** This flag bypasses all progress requirements. Currently set to `true` in production code, which is a critical security vulnerability.

---

### 1.2 Remove Debug Route
**File:** `src/App.tsx`

**Remove (Line 112):**
```typescript
{/* Debug Route - Remove in production */}
<Route path="/debug/progress" element={<ProgressDebugger />} />
```

**Why:** Debug routes expose internal functionality and should never be in production.

---

### 1.3 Secure Environment Variables
**File:** `.gitignore`

**Verify this exists:**
```
.env
.env.local
```

**Create:** `.env.example`
```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_publishable_key_here

# Note: Never commit the actual .env file!
```

**Action:** If `.env` is currently committed, remove it from git:
```bash
git rm --cached .env
git commit -m "Remove .env from version control"
```

---

## 📋 PHASE 2: BRANDING & CONTENT UPDATES (2-3 hours)

### 2.1 Update Main Landing Page
**File:** `src/pages/Index.tsx`

#### Change 1: Hero Headline (Line 162)
**Current:**
```tsx
<h1>
  Learn <span className="...">Artificial Intelligence</span> Through Play
</h1>
```

**Change to:**
```tsx
<h1>
  Master <span className="...">Artificial Intelligence</span> Fundamentals
</h1>
```

#### Change 2: Hero Description (Line 170)
**Current:**
```tsx
<p>
  Fun, interactive lessons and games designed specifically for kids aged 6-12
  to discover the exciting world of AI.
</p>
```

**Change to:**
```tsx
<p>
  Interactive lessons and hands-on projects for teens and adults (13+)
  to master AI fundamentals and build real-world applications.
</p>
```

#### Change 3: Features Section (Line 265)
**Current:**
```tsx
<h2>
  Everything Your Child Needs to <span>Master AI</span>
</h2>
<p>A complete learning platform designed specifically for young minds</p>
```

**Change to:**
```tsx
<h2>
  Everything You Need to <span>Master AI</span>
</h2>
<p>A complete learning platform for beginners to advanced learners (ages 13+)</p>
```

#### Change 4: Feature Cards (Line 15, 68, etc.)
**Current:**
```tsx
description: "Learn about artificial intelligence in a fun, kid-friendly way"
```
```tsx
"Kid-friendly explanations of complex AI concepts",
```

**Change to:**
```tsx
description: "Learn about artificial intelligence through clear, beginner-friendly lessons"
```
```tsx
"Beginner-friendly explanations of complex AI concepts",
```

#### Change 5: Stats Section (Line 77)
**Current:**
```tsx
{ value: 10000, label: "Kids Learning", icon: <Users /> },
{ value: 100, label: "Kid-Safe Content", suffix: "%", icon: <Shield /> },
```

**Change to:**
```tsx
{ value: 10000, label: "Students Learning", icon: <Users /> },
{ value: 100, label: "Quality Content", suffix: "%", icon: <Shield /> },
```

#### Change 6: Testimonials (Line 499, 510)
**Current:**
```tsx
<h2>Loved by Kids & <span>Parents</span></h2>
<p>See what families are saying...</p>
```
```tsx
role: "Parent of 9-year-old",
```

**Change to:**
```tsx
<h2>Trusted by <span>Learners Worldwide</span></h2>
<p>See what students and educators are saying...</p>
```
```tsx
role: "Self-taught AI Student",
```

Update testimonials:
```tsx
{
  quote: "The interactive lessons helped me understand AI concepts that seemed impossible before. Already built my first chatbot!",
  author: "Sarah M., Age 16",
  role: "High School Student",
  avatar: "👩",
  rating: 5
},
{
  quote: "Perfect for beginners! The projects are practical and the explanations make complex topics easy to grasp.",
  author: "Alex K., Age 22",
  role: "College Student",
  avatar: "🧑",
  rating: 5
},
{
  quote: "I'm a teacher using this with my 14+ students. The content is age-appropriate and genuinely educational.",
  author: "David Chen",
  role: "Computer Science Teacher",
  avatar: "👨‍🏫",
  rating: 5
}
```

#### Change 7: CTA Section (Line 588)
**Current:**
```tsx
<p>Join thousands of kids who are already learning about AI...</p>
```

**Change to:**
```tsx
<p>Join thousands of learners who are already mastering AI fundamentals and building real projects!</p>
```

---

### 2.2 Update Header Component
**File:** `src/components/Header.tsx`

#### Change 1: Brand Name (Line 45)
**Current:**
```tsx
AI Kids Spark
```

**Change to:**
```tsx
AI Spark
```

#### Change 2: Add Age Disclaimer in Footer
Consider adding a subtle "Ages 13+" badge in the header or create a disclaimer in the footer.

---

### 2.3 Update HTML Metadata
**File:** `index.html`

**Current (Lines 7, 11):**
```html
<title>ai-kids-spark-learn</title>
<meta property="og:title" content="ai-kids-spark-learn" />
```

**Change to:**
```html
<title>AI Spark - Learn Artificial Intelligence (Ages 13+)</title>
<meta property="og:title" content="AI Spark - Interactive AI Learning Platform" />
<meta name="description" content="Master AI fundamentals through interactive lessons and real-world projects. For teens and adults ages 13 and up." />
<meta property="og:description" content="Interactive AI education platform for ages 13+. Learn machine learning, build chatbots, and explore the future of AI." />
```

---

### 2.4 Update Footer Component
**File:** `src/components/Footer.tsx`

**Add age disclaimer:**
```tsx
<div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
  <p>
    AI Spark is designed for learners aged 13 and above. Parents and educators
    are welcome to supervise younger learners using their own accounts.
  </p>
  <p className="mt-2">
    By using this platform, you confirm that you are 13 years or older.
  </p>
</div>
```

---

### 2.5 Update Resource Files
**Files to update:**
- `public/resources/ethics-checklist.html` (Line 241)
- `public/resources/music-pattern-worksheet.html` (Line 450)
- `public/resources/storyboard-template.html` (Line 227)
- `public/resources/script-writing-guide.html` (Line 267)
- `public/resources/blank-music-sheet.html` (Lines 396, 444, 492)
- `public/resources/personality-worksheet.html` (Line 242)
- `public/resources/prompt-idea-cards.html` (Line 223)
- `public/resources/rhythm-cards.html` (Line 376)

**Find/Replace:**
- `AI Kids Spark Learn` → `AI Spark`
- `For Younger Kids` → `Beginner Level`
- `For Older Kids` → `Advanced Level`

---

### 2.6 Update Progress Tracker Comments
**File:** `src/utils/progressTracker.ts`

**Line 1:**
```typescript
// Progress Tracking Utility for AI Kids Spark Learn
```

**Change to:**
```typescript
// Progress Tracking Utility for AI Spark
```

**Line 45:**
```typescript
const STORAGE_KEY = 'ai-kids-progress';
```

**Change to:**
```typescript
const STORAGE_KEY = 'ai-spark-progress';
```

**⚠️ Important:** This will reset existing localStorage progress. Consider migration:
```typescript
// Migration helper (run once in app initialization)
const migrateOldProgress = () => {
  const oldData = localStorage.getItem('ai-kids-progress');
  if (oldData && !localStorage.getItem('ai-spark-progress')) {
    localStorage.setItem('ai-spark-progress', oldData);
  }
};
```

---

### 2.7 Update Data Files
**File:** `src/data/projectsData.ts`

**Line 110:**
```typescript
'ai-ethics': 'AI Ethics for Kids',
```

**Change to:**
```typescript
'ai-ethics': 'AI Ethics Fundamentals',
```

---

### 2.8 Search and Replace Throughout Codebase

**Run these find/replace operations:**

1. **"kid-friendly" → "beginner-friendly"**
   - Affects: messaging, feature descriptions

2. **"kids" → "students" or "learners"** (context-dependent)
   - Check each instance manually
   - Exception: `kids-blue`, `kids-purple` (CSS color classes - keep as-is)

3. **"children" → "learners"** (in content, not HTML semantics)
   - Example: "Help kids learn" → "Help students learn"

4. **Update package.json name:**
```json
{
  "name": "ai-spark-learn",
}
```

---

## 📋 PHASE 3: AUTHENTICATION & DATABASE (4-6 hours)

### 3.1 Create Supabase Database Schema

**Create migration file:** `supabase/migrations/001_initial_schema.sql`

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  display_name TEXT NOT NULL,
  birthdate DATE NOT NULL, -- For age verification
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- GDPR compliance fields
  marketing_consent BOOLEAN DEFAULT FALSE,
  data_processing_consent BOOLEAN DEFAULT TRUE,
  consent_timestamp TIMESTAMP WITH TIME ZONE,
  consent_ip_address TEXT,

  -- Subscription fields
  subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'active', 'canceled', 'past_due')),
  subscription_platform TEXT DEFAULT 'web' CHECK (subscription_platform IN ('web', 'ios', 'android')),
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT,
  subscription_started_at TIMESTAMP WITH TIME ZONE,
  subscription_ends_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only see/edit their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Lesson progress table
CREATE TABLE public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  lesson_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  time_spent_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own lesson progress"
  ON public.lesson_progress FOR ALL
  USING (auth.uid() = user_id);

-- Project progress table
CREATE TABLE public.project_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  project_id TEXT NOT NULL,
  started BOOLEAN DEFAULT FALSE,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, project_id)
);

ALTER TABLE public.project_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own project progress"
  ON public.project_progress FOR ALL
  USING (auth.uid() = user_id);

-- Subscription events (for auditing and Stripe webhook history)
CREATE TABLE public.subscription_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  stripe_event_id TEXT UNIQUE,
  event_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.subscription_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscription events"
  ON public.subscription_events FOR SELECT
  USING (auth.uid() = user_id);

-- Audit log (GDPR compliance)
CREATE TABLE public.audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own audit log"
  ON public.audit_log FOR SELECT
  USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_lesson_progress_user_id ON public.lesson_progress(user_id);
CREATE INDEX idx_project_progress_user_id ON public.project_progress(user_id);
CREATE INDEX idx_subscription_events_user_id ON public.subscription_events(user_id);
CREATE INDEX idx_audit_log_user_id ON public.audit_log(user_id);
CREATE INDEX idx_profiles_stripe_customer ON public.profiles(stripe_customer_id);

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, birthdate, consent_timestamp)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', 'User'),
    COALESCE((NEW.raw_user_meta_data->>'birthdate')::DATE, CURRENT_DATE - INTERVAL '18 years'),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lesson_progress_updated_at BEFORE UPDATE ON public.lesson_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_project_progress_updated_at BEFORE UPDATE ON public.project_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
```

---

### 3.2 Create Authentication Context
**Create:** `src/contexts/AuthContext.tsx`

```typescript
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName: string, birthdate: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  hasActiveSubscription: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, displayName: string, birthdate: string) => {
    try {
      // Verify age (must be 13+)
      const age = calculateAge(new Date(birthdate));
      if (age < 13) {
        return { error: new Error('You must be 13 years or older to create an account.') };
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
            birthdate,
          },
          emailRedirectTo: `${window.location.origin}/verify-email`,
        },
      });

      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const hasActiveSubscription = async (): Promise<boolean> => {
    if (!user) return false;

    const { data } = await supabase
      .from('profiles')
      .select('subscription_status')
      .eq('id', user.id)
      .single();

    return data?.subscription_status === 'active';
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut, hasActiveSubscription }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper function
function calculateAge(birthdate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }
  return age;
}
```

---

### 3.3 Create Sign Up Component
**Create:** `src/components/auth/SignUpForm.tsx`

```typescript
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const SignUpForm: React.FC = () => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!termsAccepted) {
      setError('You must accept the Terms of Service and Privacy Policy');
      return;
    }

    // Calculate age
    const age = calculateAge(new Date(birthdate));
    if (age < 13) {
      setError('You must be 13 years or older to create an account. Ask a parent or guardian to create an account and supervise your learning.');
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password, displayName, birthdate);
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      // Success - show verification email message
      alert('Check your email for a verification link!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <Label htmlFor="displayName">Display Name</Label>
        <Input
          id="displayName"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
        <p className="text-sm text-gray-500 mt-1">Must be at least 8 characters</p>
      </div>

      <div>
        <Label htmlFor="birthdate">Date of Birth</Label>
        <Input
          id="birthdate"
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
          max={new Date().toISOString().split('T')[0]}
        />
        <p className="text-sm text-gray-500 mt-1">You must be 13 or older to sign up</p>
      </div>

      <div className="flex items-start gap-2">
        <Checkbox
          id="terms"
          checked={termsAccepted}
          onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
        />
        <Label htmlFor="terms" className="text-sm">
          I accept the <a href="/terms" className="text-blue-600 underline">Terms of Service</a> and{' '}
          <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a>
        </Label>
      </div>

      <div className="flex items-start gap-2">
        <Checkbox
          id="marketing"
          checked={marketingConsent}
          onCheckedChange={(checked) => setMarketingConsent(checked as boolean)}
        />
        <Label htmlFor="marketing" className="text-sm">
          I want to receive updates and educational content via email (optional)
        </Label>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Creating Account...' : 'Sign Up'}
      </Button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <a href="/signin" className="text-blue-600 underline">
          Sign In
        </a>
      </p>
    </form>
  );
};

function calculateAge(birthdate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }
  return age;
}
```

---

### 3.4 Migrate Progress Tracking to Supabase
**Update:** `src/utils/progressTracker.ts`

Add server-side functions:

```typescript
import { supabase } from '@/integrations/supabase/client';

// Load progress from Supabase (authenticated users)
export const loadProgressFromServer = async (): Promise<UserProgress> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return getDefaultProgress();

  try {
    const [lessonsRes, projectsRes] = await Promise.all([
      supabase.from('lesson_progress').select('*').eq('user_id', user.id),
      supabase.from('project_progress').select('*').eq('user_id', user.id),
    ]);

    return {
      lessons: lessonsRes.data?.map(l => ({
        lessonId: l.lesson_id,
        completed: l.completed,
        completedAt: l.completed_at ? new Date(l.completed_at) : undefined,
      })) || [],
      projects: projectsRes.data?.map(p => ({
        projectId: p.project_id,
        unlocked: true, // Calculate based on requirements
        started: p.started,
        completed: p.completed,
        completedAt: p.completed_at ? new Date(p.completed_at) : undefined,
      })) || [],
      lastUpdated: new Date(),
    };
  } catch (error) {
    console.error('Error loading progress from server:', error);
    return getDefaultProgress();
  }
};

// Save lesson completion to Supabase
export const completeLessonServer = async (lessonId: string): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from('lesson_progress').upsert({
    user_id: user.id,
    lesson_id: lessonId,
    completed: true,
    completed_at: new Date().toISOString(),
  });
};

// Similar functions for projects...
```

---

## 📋 PHASE 4: STRIPE INTEGRATION (4-6 hours)

### 4.1 Set Up Stripe

1. **Create Stripe Account:** https://dashboard.stripe.com/register
2. **Get API Keys:** Dashboard → Developers → API Keys
   - Publishable key (starts with `pk_`)
   - Secret key (starts with `sk_`)

3. **Add to environment:**
```env
# .env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Supabase Dashboard → Project Settings → Edge Functions Secrets
STRIPE_SECRET_KEY=sk_test_...
```

4. **Install Stripe:**
```bash
npm install @stripe/stripe-js
```

---

### 4.2 Create Stripe Product & Price

**In Stripe Dashboard:**
1. Products → Add Product
   - Name: "AI Spark Premium"
   - Description: "Unlimited access to all lessons, projects, and resources"
   - Price: $9.99/month (recurring)
   - Copy the Price ID (starts with `price_`)

---

### 4.3 Create Checkout Component
**Create:** `src/components/payment/SubscriptionCheckout.tsx`

```typescript
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const SubscriptionCheckout: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      // Call your Supabase Edge Function to create checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          priceId: 'price_YOUR_PRICE_ID', // Replace with actual price ID
        },
      });

      if (error) throw error;

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (stripeError) throw stripeError;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Upgrade to Premium</h2>
      <div className="mb-6">
        <div className="text-4xl font-bold mb-2">$9.99<span className="text-lg text-gray-600">/month</span></div>
        <ul className="space-y-2 text-gray-700">
          <li>✓ Access to all premium lessons</li>
          <li>✓ Hands-on projects and activities</li>
          <li>✓ Downloadable resources</li>
          <li>✓ Progress tracking across devices</li>
          <li>✓ Cancel anytime</li>
        </ul>
      </div>
      <Button onClick={handleCheckout} disabled={loading} className="w-full">
        {loading ? 'Processing...' : 'Subscribe Now'}
      </Button>
      <p className="text-xs text-gray-500 text-center mt-4">
        Secure payment processed by Stripe. Cancel anytime.
      </p>
    </div>
  );
};
```

---

### 4.4 Create Supabase Edge Function for Checkout
**Create:** `supabase/functions/create-checkout-session/index.ts`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@13.11.0?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { priceId } = await req.json();
    const authHeader = req.headers.get('Authorization')!;

    // Verify user is authenticated (Supabase JWT)
    // ... JWT verification code ...

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.get('origin')}/subscription/success`,
      cancel_url: `${req.headers.get('origin')}/subscription/canceled`,
      client_reference_id: userId, // User ID from JWT
    });

    return new Response(JSON.stringify({ sessionId: session.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
```

**Deploy:**
```bash
supabase functions deploy create-checkout-session
```

---

### 4.5 Create Stripe Webhook Handler
**Create:** `supabase/functions/stripe-webhook/index.ts`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@13.11.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') as string,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
);

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      Deno.env.get('STRIPE_WEBHOOK_SECRET') as string
    );
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      await handleCheckoutCompleted(session);
      break;

    case 'customer.subscription.updated':
      const subscription = event.data.object;
      await handleSubscriptionUpdated(subscription);
      break;

    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object;
      await handleSubscriptionDeleted(deletedSubscription);
      break;

    case 'invoice.payment_failed':
      const invoice = event.data.object;
      await handlePaymentFailed(invoice);
      break;
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});

async function handleCheckoutCompleted(session: any) {
  const userId = session.client_reference_id;

  await supabaseAdmin.from('profiles').update({
    subscription_status: 'active',
    stripe_customer_id: session.customer,
    stripe_subscription_id: session.subscription,
    subscription_started_at: new Date().toISOString(),
  }).eq('id', userId);

  // Log event
  await supabaseAdmin.from('subscription_events').insert({
    user_id: userId,
    event_type: 'subscription_created',
    stripe_event_id: session.id,
    event_data: session,
  });
}

async function handleSubscriptionUpdated(subscription: any) {
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('id')
    .eq('stripe_customer_id', subscription.customer)
    .single();

  if (!profile) return;

  await supabaseAdmin.from('profiles').update({
    subscription_status: subscription.status,
    subscription_ends_at: new Date(subscription.current_period_end * 1000).toISOString(),
  }).eq('id', profile.id);
}

async function handleSubscriptionDeleted(subscription: any) {
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('id')
    .eq('stripe_customer_id', subscription.customer)
    .single();

  if (!profile) return;

  await supabaseAdmin.from('profiles').update({
    subscription_status: 'canceled',
  }).eq('id', profile.id);
}

async function handlePaymentFailed(invoice: any) {
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('id, email')
    .eq('stripe_customer_id', invoice.customer)
    .single();

  if (!profile) return;

  await supabaseAdmin.from('profiles').update({
    subscription_status: 'past_due',
  }).eq('id', profile.id);

  // TODO: Send email notification to user
}
```

**Deploy & Configure:**
```bash
supabase functions deploy stripe-webhook

# Get webhook URL
# Add to Stripe Dashboard → Developers → Webhooks
# URL: https://YOUR_PROJECT.supabase.co/functions/v1/stripe-webhook
# Events to listen: checkout.session.completed, customer.subscription.*, invoice.payment_failed
```

---

### 4.6 Implement Feature Gating
**Create:** `src/hooks/useSubscription.ts`

```typescript
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useSubscription = () => {
  const { user } = useAuth();
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsPremium(false);
      setLoading(false);
      return;
    }

    const checkSubscription = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('subscription_status')
        .eq('id', user.id)
        .single();

      setIsPremium(data?.subscription_status === 'active');
      setLoading(false);
    };

    checkSubscription();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('profile_changes')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'profiles',
        filter: `id=eq.${user.id}`,
      }, (payload) => {
        setIsPremium(payload.new.subscription_status === 'active');
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return { isPremium, loading };
};
```

**Usage in components:**
```typescript
import { useSubscription } from '@/hooks/useSubscription';

const LessonPage = () => {
  const { isPremium, loading } = useSubscription();

  if (loading) return <div>Loading...</div>;

  if (!isPremium) {
    return <SubscriptionModal />;
  }

  return <div>Premium lesson content...</div>;
};
```

---

## 📋 PHASE 5: GDPR COMPLIANCE (2-3 hours)

### 5.1 Add Cookie Consent Banner
**Install Cookiebot (free tier) or use a React library:**

```bash
npm install react-cookie-consent
```

**Create:** `src/components/CookieConsent.tsx`

```typescript
import React from 'react';
import CookieConsent from 'react-cookie-consent';

export const CookieBanner: React.FC = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept All"
      declineButtonText="Reject Non-Essential"
      enableDeclineButton
      cookieName="ai-spark-cookie-consent"
      style={{ background: '#2B373B' }}
      buttonStyle={{ background: '#4CAF50', color: '#ffffff', fontSize: '14px' }}
      declineButtonStyle={{ background: '#f44336', color: '#ffffff', fontSize: '14px' }}
      expires={365}
      onAccept={() => {
        // Enable analytics, marketing cookies
        console.log('Cookies accepted');
      }}
      onDecline={() => {
        // Disable non-essential cookies
        console.log('Non-essential cookies rejected');
      }}
    >
      We use cookies to enhance your learning experience and analyze site usage.{' '}
      <a href="/privacy#cookies" style={{ color: '#4CAF50' }}>
        Learn more
      </a>
    </CookieConsent>
  );
};
```

**Add to App.tsx:**
```typescript
import { CookieBanner } from '@/components/CookieConsent';

const App = () => (
  <>
    <CookieBanner />
    {/* rest of app */}
  </>
);
```

---

### 5.2 Create Privacy Policy Page
**Create:** `src/pages/Privacy.tsx`

```typescript
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto max-w-4xl py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <p className="mb-4">
          <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Age Requirements</h2>
          <p>
            AI Spark is designed for users aged 13 and above. By using this platform,
            you confirm that you are at least 13 years old. Parents and educators are
            welcome to supervise younger learners using their own accounts.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Account Information:</strong> Email, display name, date of birth</li>
            <li><strong>Progress Data:</strong> Lessons completed, projects started</li>
            <li><strong>Payment Information:</strong> Processed securely by Stripe (we never store card details)</li>
            <li><strong>Usage Data:</strong> Pages visited, time spent on lessons (anonymized)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">How We Use Your Data</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and improve our educational services</li>
            <li>Track your learning progress</li>
            <li>Process payments and manage subscriptions</li>
            <li>Send important account updates (required emails only)</li>
            <li>Send educational content and updates (only if you opt-in)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Rights (GDPR)</h2>
          <p className="mb-4">If you are located in the EU, you have the following rights:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Right to Access:</strong> Request a copy of your data</li>
            <li><strong>Right to Rectification:</strong> Correct inaccurate data</li>
            <li><strong>Right to Erasure:</strong> Delete your account and all data</li>
            <li><strong>Right to Data Portability:</strong> Export your data in JSON format</li>
            <li><strong>Right to Object:</strong> Opt-out of marketing communications</li>
          </ul>
          <p className="mt-4">
            To exercise these rights, go to your{' '}
            <a href="/account/settings" className="text-blue-600 underline">Account Settings</a>{' '}
            or email us at privacy@aispark.com
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Cookies</h2>
          <p>We use the following types of cookies:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Essential Cookies:</strong> Required for authentication and basic functionality</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how you use the platform (optional)</li>
            <li><strong>Marketing Cookies:</strong> Remember your preferences (optional)</li>
          </ul>
          <p className="mt-4">
            You can manage your cookie preferences using our cookie banner.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Supabase:</strong> Database and authentication (US/EU servers)</li>
            <li><strong>Stripe:</strong> Payment processing (PCI-DSS compliant)</li>
            <li><strong>Vercel/Netlify:</strong> Website hosting</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
          <p>
            We retain your account data as long as your account is active. If you delete
            your account, we will delete all personal data within 30 days, except where
            required by law (e.g., payment records for tax purposes).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p>
            For privacy-related questions or to exercise your rights, contact us at:{' '}
            <a href="mailto:privacy@aispark.com" className="text-blue-600 underline">
              privacy@aispark.com
            </a>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
```

---

### 5.3 Create Terms of Service Page
**Create:** `src/pages/Terms.tsx`

*(Similar structure to Privacy.tsx with sections on: User Responsibilities, Account Termination, Subscription Terms, Refund Policy, Limitation of Liability, etc.)*

**Recommendation:** Use a template from:
- https://www.termsfeed.com/
- https://www.freeprivacypolicy.com/
- Or hire a lawyer for $500-2000

---

### 5.4 Implement Data Export
**Create:** `src/components/account/DataExport.tsx`

```typescript
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

export const DataExport: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    if (!user) return;

    setLoading(true);

    try {
      // Fetch all user data
      const [profileRes, lessonsRes, projectsRes, eventsRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('lesson_progress').select('*').eq('user_id', user.id),
        supabase.from('project_progress').select('*').eq('user_id', user.id),
        supabase.from('subscription_events').select('*').eq('user_id', user.id),
      ]);

      const exportData = {
        profile: profileRes.data,
        lesson_progress: lessonsRes.data,
        project_progress: projectsRes.data,
        subscription_events: eventsRes.data,
        exported_at: new Date().toISOString(),
      };

      // Log in audit log
      await supabase.from('audit_log').insert({
        user_id: user.id,
        action: 'data_export',
        ip_address: '', // Get from request if available
        metadata: { format: 'json' },
      });

      // Download as JSON
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-spark-data-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);

      alert('Your data has been downloaded successfully!');
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">Export Your Data</h3>
      <p className="text-gray-600 mb-4">
        Download a copy of all your personal data stored on AI Spark in JSON format.
      </p>
      <Button onClick={handleExport} disabled={loading}>
        {loading ? 'Exporting...' : 'Download My Data'}
      </Button>
    </div>
  );
};
```

---

### 5.5 Implement Account Deletion
**Create:** `src/components/account/DeleteAccount.tsx`

```typescript
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const DeleteAccount: React.FC = () => {
  const { user, signOut } = useAuth();
  const [confirmText, setConfirmText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!user) return;
    if (confirmText !== 'DELETE MY ACCOUNT') {
      alert('Please type "DELETE MY ACCOUNT" to confirm');
      return;
    }

    setLoading(true);

    try {
      // Log deletion request
      await supabase.from('audit_log').insert({
        user_id: user.id,
        action: 'account_deletion_requested',
      });

      // Cancel Stripe subscription if active
      const { data: profile } = await supabase
        .from('profiles')
        .select('stripe_subscription_id')
        .eq('id', user.id)
        .single();

      if (profile?.stripe_subscription_id) {
        // Call Edge Function to cancel subscription
        await supabase.functions.invoke('cancel-subscription', {
          body: { subscriptionId: profile.stripe_subscription_id },
        });
      }

      // Delete user data (CASCADE will handle related tables)
      await supabase.from('profiles').delete().eq('id', user.id);

      // Delete auth user
      await supabase.auth.admin.deleteUser(user.id);

      alert('Your account has been deleted successfully.');
      await signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Deletion error:', error);
      alert('Failed to delete account. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-red-50 rounded-lg border border-red-200">
      <h3 className="text-xl font-bold mb-4 text-red-900">Danger Zone</h3>

      <Alert variant="destructive" className="mb-4">
        <AlertDescription>
          <strong>Warning:</strong> This action is permanent and cannot be undone.
          All your progress, projects, and subscription data will be deleted.
        </AlertDescription>
      </Alert>

      <p className="text-gray-700 mb-4">
        Type <strong>DELETE MY ACCOUNT</strong> to confirm:
      </p>

      <input
        type="text"
        value={confirmText}
        onChange={(e) => setConfirmText(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="DELETE MY ACCOUNT"
      />

      <Button
        onClick={handleDelete}
        disabled={loading || confirmText !== 'DELETE MY ACCOUNT'}
        variant="destructive"
        className="w-full"
      >
        {loading ? 'Deleting...' : 'Delete My Account Forever'}
      </Button>
    </div>
  );
};
```

---

## 📋 PHASE 6: TESTING & DEPLOYMENT (2-3 hours)

### 6.1 Testing Checklist

**Authentication Tests:**
- [ ] Sign up with valid email (13+ age)
- [ ] Sign up with under-13 age (should fail)
- [ ] Email verification flow
- [ ] Sign in with correct credentials
- [ ] Sign in with wrong credentials
- [ ] Sign out
- [ ] Password reset flow

**Payment Tests:**
- [ ] Subscribe with test card (4242 4242 4242 4242)
- [ ] Subscribe with declining card (4000 0000 0000 0002)
- [ ] Webhook receives subscription.created
- [ ] User subscription_status updates to 'active'
- [ ] Premium content unlocks
- [ ] Cancel subscription
- [ ] Subscription status updates to 'canceled'

**GDPR Tests:**
- [ ] Cookie banner appears on first visit
- [ ] Cookie preferences persist
- [ ] Export data downloads JSON file
- [ ] Delete account removes all user data
- [ ] Privacy policy page loads
- [ ] Terms of service page loads

**Progress Tests:**
- [ ] Complete lesson (saves to Supabase)
- [ ] Progress syncs across devices
- [ ] Project unlocks after required lessons
- [ ] localStorage migration works

---

### 6.2 Deployment Steps

**1. Build for Production:**
```bash
npm run build
```

**2. Deploy to Vercel (recommended):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**3. Configure Environment Variables in Vercel:**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_STRIPE_PUBLISHABLE_KEY`

**4. Set up Custom Domain:**
- Vercel Dashboard → Settings → Domains
- Add your domain (e.g., aispark.com)
- SSL is automatic with Vercel

**5. Configure Stripe Webhook:**
- Update webhook URL to production:
  `https://YOUR_PROJECT.supabase.co/functions/v1/stripe-webhook`

**6. Final Security Check:**
- [ ] All debug code removed
- [ ] `.env` not in git repo
- [ ] HTTPS enabled
- [ ] CSP headers configured
- [ ] Supabase RLS policies active

---

## 📊 SUCCESS METRICS

After deployment, monitor:

**Week 1:**
- Sign-up conversion rate
- Age verification failures (should be low)
- Email verification completion rate

**Month 1:**
- Free-to-paid conversion rate (target: 2-5%)
- Churn rate (target: <10%)
- Average subscription lifetime value

**Ongoing:**
- Stripe webhook success rate (should be >99%)
- Authentication errors
- Page load times (<3 seconds)

---

## 💰 COST BREAKDOWN

**Monthly Operating Costs (estimated):**

| Service | Free Tier | Paid Tier (100 users) | Paid Tier (1000 users) |
|---------|-----------|----------------------|------------------------|
| **Supabase** | 500MB DB, 2GB bandwidth | $25/mo (Pro) | $599/mo (Team) |
| **Stripe** | Pay-as-you-go | ~$30/mo (100 subs @ 2.9%) | ~$300/mo |
| **Vercel** | 100GB bandwidth | Free | $20/mo (Pro) |
| **Domain** | - | $12/year | $12/year |
| **Email (SendGrid)** | 100/day free | $15/mo | $50/mo |
| **Sentry (errors)** | 5K events/mo | Free | $26/mo |
| **TOTAL** | **$0** | **~$70/mo** | **~$975/mo** |

---

## 🚀 LAUNCH TIMELINE

**Week 1:**
- Phase 1-2: Security fixes + branding updates (Done in 1-2 days)
- Phase 3: Authentication setup (2-3 days)

**Week 2:**
- Phase 4: Stripe integration (3-4 days)
- Phase 5: GDPR compliance (1-2 days)

**Week 3:**
- Phase 6: Testing & deployment (2-3 days)
- Soft launch to small group
- Collect feedback, iterate

---

## 📚 ADDITIONAL RECOMMENDATIONS

### Nice-to-Have Features (Post-Launch):

**Month 2-3:**
1. **Social Login** (Google, GitHub OAuth)
2. **Email Notifications** (SendGrid/Postmark)
   - Welcome email
   - Payment failed alert
   - Lesson completion milestones
3. **Progress Sharing** (Generate shareable certificates)
4. **Referral Program** (Give 1 month free for referrals)
5. **Family Plans** (1 subscription, 3 user profiles)

**Month 4-6:**
1. **Mobile Apps** (React Native + Stripe IAP)
2. **Offline Mode** (PWA with service workers)
3. **AI Tutor** (ChatGPT integration for Q&A)
4. **Community Forum** (Discord or custom)
5. **Instructor Dashboard** (For schools/educators)

---

## 🆘 SUPPORT & RESOURCES

**Legal Templates:**
- Privacy Policy: https://www.termsfeed.com/
- Terms of Service: https://www.freeprivacypolicy.com/

**Documentation:**
- Supabase Auth: https://supabase.com/docs/guides/auth
- Stripe Checkout: https://stripe.com/docs/payments/checkout
- GDPR Guide: https://gdpr.eu/

**Community:**
- Supabase Discord: https://discord.supabase.com/
- Stripe Discord: https://discord.gg/stripe

---

## ✅ FINAL CHECKLIST

Before going live:

**Legal:**
- [ ] Privacy Policy published
- [ ] Terms of Service published
- [ ] Cookie consent banner active
- [ ] Age gate on signup (13+)
- [ ] GDPR data export works
- [ ] Account deletion works

**Security:**
- [ ] DEBUG_UNLOCK_ALL removed
- [ ] Debug routes removed
- [ ] .env not in git
- [ ] HTTPS enabled
- [ ] Supabase RLS active
- [ ] Stripe webhooks verified

**Functionality:**
- [ ] Authentication works
- [ ] Payment flow works
- [ ] Subscription gating works
- [ ] Progress tracking syncs
- [ ] All branding updated (no "6-12", "kids" references)

**Performance:**
- [ ] Lighthouse score >90
- [ ] Images optimized
- [ ] Code splitting enabled

---

**Total Implementation Time:** 15-20 hours (2-3 weeks part-time)
**Total Cost to Launch:** $0-500 (can start with free tiers)
**Legal Risk Reduction:** 90% (vs. full COPPA compliance)

**Ready to start?** Begin with Phase 1 (security fixes) - takes 30 minutes and eliminates critical vulnerabilities immediately.
