
import React from 'react';
import { Play } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import VideoPlayer from '@/components/VideoPlayer';

const AlgorithmVideoSection = () => {
  return (
    <GlassCard variant="blue" className="hover:shadow-glass-hover hover:-translate-y-1 transition-all duration-300">
      <div className="bg-gradient-to-r from-kids-blue/10 to-kids-green/10 backdrop-blur-sm p-6 rounded-t-glass border-b border-kids-blue/20">
        <h2 className="text-xl text-kids-blue flex items-center gap-2 font-bold">
          <Play className="w-6 h-6" />
          📺 Watch: What Are Algorithms?
        </h2>
      </div>
      <div className="p-6">
        <VideoPlayer 
          videoId="578hB0E6y4o"
          title="What Are Algorithms? - Introduction Video"
        />
      </div>
    </GlassCard>
  );
};

export default AlgorithmVideoSection;
