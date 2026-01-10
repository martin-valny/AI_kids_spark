import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, Mail, Calendar, Download, Trash2, CreditCard,
  Shield, Bell, Loader2, AlertTriangle, Check, LogOut
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { supabase } from '@/lib/supabase';

const AccountSettings: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, signOut, updateProfile } = useAuth();
  const { subscription, isPremium, openCustomerPortal } = useSubscription();

  const [displayName, setDisplayName] = useState(profile?.display_name || '');
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Redirect if not logged in
  if (!user) {
    navigate('/sign-in');
    return null;
  }

  const handleSaveProfile = async () => {
    setSaving(true);
    setMessage(null);

    const { error } = await updateProfile({ display_name: displayName });

    setSaving(false);
    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    }
  };

  const handleExportData = async () => {
    setExporting(true);
    setMessage(null);

    try {
      // Fetch all user data
      const [profileData, lessonProgress, projectProgress] = await Promise.all([
        supabase.from('user_profiles').select('*').eq('id', user.id).single(),
        supabase.from('lesson_progress').select('*').eq('user_id', user.id),
        supabase.from('project_progress').select('*').eq('user_id', user.id),
      ]);

      const exportData = {
        exportDate: new Date().toISOString(),
        profile: profileData.data,
        lessonProgress: lessonProgress.data,
        projectProgress: projectProgress.data,
      };

      // Create and download JSON file
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-spark-data-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setMessage({ type: 'success', text: 'Your data has been exported successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to export data. Please try again.' });
    }

    setExporting(false);
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') return;

    setDeleting(true);
    setMessage(null);

    try {
      // Cancel subscription first if active
      if (subscription) {
        await supabase.functions.invoke('cancel-subscription', {
          body: { subscriptionId: subscription.id },
        });
      }

      // Delete user data (RLS will handle cascading deletes)
      await supabase.from('user_profiles').delete().eq('id', user.id);

      // Sign out and redirect
      await signOut();
      navigate('/');
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete account. Please contact support.' });
      setDeleting(false);
    }
  };

  const handleManageSubscription = async () => {
    const { url, error } = await openCustomerPortal();
    if (url) {
      window.location.href = url;
    } else if (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <Header />
      <main className="pt-32 pb-20 px-4 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold mb-2 text-gray-900">Account Settings</h1>
            <p className="text-gray-500">Manage your profile, subscription, and data</p>
          </motion.div>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                message.type === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}
            >
              {message.type === 'success' ? (
                <Check className="w-5 h-5" />
              ) : (
                <AlertTriangle className="w-5 h-5" />
              )}
              {message.text}
            </motion.div>
          )}

          <div className="space-y-6">
            {/* Profile Section */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-kids-blue/10 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-kids-blue" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Profile</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-kids-blue focus:ring-2 focus:ring-kids-blue/20 outline-none"
                    placeholder="Your display name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email || ''}
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Member Since
                  </label>
                  <input
                    type="text"
                    value={new Date(profile?.created_at || '').toLocaleDateString()}
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500"
                  />
                </div>

                <GradientButton
                  variant="primary"
                  onClick={handleSaveProfile}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </GradientButton>
              </div>
            </GlassCard>

            {/* Subscription Section */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-kids-purple/10 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-kids-purple" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Subscription</h2>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      {isPremium ? 'Premium Plan' : 'Free Plan'}
                    </p>
                    {subscription && (
                      <p className="text-sm text-gray-500">
                        {subscription.cancel_at_period_end
                          ? `Cancels on ${new Date(subscription.current_period_end).toLocaleDateString()}`
                          : `Renews on ${new Date(subscription.current_period_end).toLocaleDateString()}`}
                      </p>
                    )}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isPremium
                        ? 'bg-kids-green/10 text-kids-green'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {isPremium ? 'Active' : 'Free'}
                  </span>
                </div>
              </div>

              {isPremium ? (
                <GradientButton variant="secondary" onClick={handleManageSubscription}>
                  Manage Subscription
                </GradientButton>
              ) : (
                <GradientButton variant="primary" onClick={() => navigate('/pricing')}>
                  Upgrade to Premium
                </GradientButton>
              )}
            </GlassCard>

            {/* Data & Privacy Section */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-kids-green/10 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-kids-green" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Data & Privacy</h2>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-start gap-4">
                    <Download className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">Export Your Data</h3>
                      <p className="text-sm text-gray-500 mb-3">
                        Download a copy of all your data including profile, progress, and settings.
                      </p>
                      <GradientButton
                        variant="secondary"
                        onClick={handleExportData}
                        disabled={exporting}
                      >
                        {exporting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            Exporting...
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            Export Data
                          </>
                        )}
                      </GradientButton>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Danger Zone */}
            <GlassCard className="p-6 border-2 border-red-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <h2 className="text-xl font-bold text-red-600">Danger Zone</h2>
              </div>

              {!showDeleteConfirm ? (
                <div className="p-4 bg-red-50 rounded-xl">
                  <h3 className="font-medium text-red-900 mb-2">Delete Account</h3>
                  <p className="text-sm text-red-700 mb-4">
                    Permanently delete your account and all associated data.
                    This action cannot be undone.
                  </p>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-red-50 rounded-xl">
                  <h3 className="font-medium text-red-900 mb-2">Confirm Account Deletion</h3>
                  <p className="text-sm text-red-700 mb-4">
                    Type <strong>DELETE</strong> to confirm permanent account deletion.
                  </p>
                  <input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    placeholder="Type DELETE to confirm"
                    className="w-full px-4 py-3 rounded-xl border border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none mb-4"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleDeleteAccount}
                      disabled={deleteConfirmText !== 'DELETE' || deleting}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deleting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4" />
                          Delete Forever
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setShowDeleteConfirm(false);
                        setDeleteConfirmText('');
                      }}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </GlassCard>

            {/* Sign Out */}
            <div className="text-center pt-4">
              <button
                onClick={async () => {
                  await signOut();
                  navigate('/');
                }}
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountSettings;
