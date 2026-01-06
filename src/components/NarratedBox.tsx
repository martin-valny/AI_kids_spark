import React from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/GlassCard';

interface NarratedBoxProps {
  text?: string;
  children: React.ReactNode;
  className?: string;
  showSpeaker?: boolean; // Deprecated but kept for compatibility
  showText?: boolean;
  variant?: 'default' | 'strong' | 'blue' | 'purple' | 'green' | 'pink' | 'orange' | 'yellow' | 'red';
}

const NarratedBox: React.FC<NarratedBoxProps> = ({
  text,
  children,
  className,
  showText = false,
  variant = 'default'
}) => {
  return (
    <GlassCard variant={variant} className={cn("p-6", className)}>
      <div>
        {children}
      </div>

      {showText && text && (
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-sm text-gray-600 italic">
            💬 {text}
          </p>
        </div>
      )}
    </GlassCard>
  );
};

export default NarratedBox;
