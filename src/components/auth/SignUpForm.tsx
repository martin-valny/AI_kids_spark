import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';

// Calculate minimum birth date (must be 13+ years old)
const getMaxBirthDate = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 13);
  return date.toISOString().split('T')[0];
};

const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  displayName: z.string().min(2, 'Display name must be at least 2 characters').optional(),
  birthDate: z.string().refine((date) => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      return age - 1 >= 13;
    }
    return age >= 13;
  }, 'You must be at least 13 years old to create an account'),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    setError(null);

    const { error } = await signUp(
      data.email,
      data.password,
      new Date(data.birthDate),
      data.displayName
    );

    setIsLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <GlassCard className="max-w-md mx-auto p-8 text-center">
        <div className="w-16 h-16 bg-kids-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-kids-green" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Check your email!</h2>
        <p className="text-gray-600 mb-6">
          We've sent you a confirmation link. Please check your email and click the link to activate your account.
        </p>
        <Link to="/sign-in">
          <GradientButton variant="primary">
            Go to Sign In
          </GradientButton>
        </Link>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="max-w-md mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
        <p className="text-gray-600">Join Lumora and start creating!</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Display Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Display Name (optional)
          </label>
          <input
            type="text"
            {...register('displayName')}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-kids-blue focus:ring-2 focus:ring-kids-blue/20 outline-none transition-all"
            placeholder="How should we call you?"
          />
          {errors.displayName && (
            <p className="mt-1 text-sm text-red-500">{errors.displayName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-kids-blue focus:ring-2 focus:ring-kids-blue/20 outline-none transition-all"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Birth Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth *
          </label>
          <input
            type="date"
            {...register('birthDate')}
            max={getMaxBirthDate()}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-kids-blue focus:ring-2 focus:ring-kids-blue/20 outline-none transition-all"
          />
          {errors.birthDate && (
            <p className="mt-1 text-sm text-red-500">{errors.birthDate.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            You must be 13 years or older to create an account.
          </p>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password *
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-kids-blue focus:ring-2 focus:ring-kids-blue/20 outline-none transition-all"
              placeholder="Create a strong password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password *
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
              className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-kids-blue focus:ring-2 focus:ring-kids-blue/20 outline-none transition-all"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Terms Agreement */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            {...register('agreeToTerms')}
            id="agreeToTerms"
            className="mt-1 w-4 h-4 rounded border-gray-300 text-kids-blue focus:ring-kids-blue"
          />
          <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
            I agree to the{' '}
            <Link to="/terms" className="text-kids-blue hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-kids-blue hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-sm text-red-500">{errors.agreeToTerms.message}</p>
        )}

        {/* Submit Button */}
        <GradientButton
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </GradientButton>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{' '}
        <Link to="/sign-in" className="text-kids-blue font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </GlassCard>
  );
};

export default SignUpForm;
