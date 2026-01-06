
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle: string;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, lessonTitle }) => {
  if (!isOpen) return null;

  const handleSubscribe = () => {
    // In a real implementation, this would redirect to a payment page or API
    alert('This would redirect to a payment page in a real implementation');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Unlock Premium Content</h2>
          <p className="text-gray-600">
            Subscribe to unlock "{lessonTitle}" and all other premium lessons!
          </p>
        </div>
        
        <div className="bg-kids-blue/10 p-4 rounded-lg mb-6">
          <h3 className="font-bold text-lg mb-2">Premium Subscription Benefits:</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-kids-green mr-2">✓</span> Access to all premium lessons
            </li>
            <li className="flex items-start">
              <span className="text-kids-green mr-2">✓</span> Hands-on activities and projects
            </li>
            <li className="flex items-start">
              <span className="text-kids-green mr-2">✓</span> Downloadable resources
            </li>
            <li className="flex items-start">
              <span className="text-kids-green mr-2">✓</span> Progress tracking
            </li>
          </ul>
        </div>
        
        <div className="text-center mb-4">
          <p className="font-bold text-xl mb-1">$9.99/month</p>
          <p className="text-sm text-gray-500">Cancel anytime</p>
        </div>
        
        <div className="flex flex-col space-y-3">
          <Button 
            onClick={handleSubscribe}
            className="w-full kid-button primary"
          >
            Subscribe Now
          </Button>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:underline text-sm"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
