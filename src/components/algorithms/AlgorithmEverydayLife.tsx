
import React from 'react';
import { Cookie, Puzzle } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import NarratedBox from '@/components/NarratedBox';

const AlgorithmEverydayLife = () => {
  return (
    <GlassCard variant="green" className="hover:shadow-glass-hover hover:-translate-y-1 transition-all duration-300">
      <div className="bg-gradient-to-r from-kids-green/10 to-kids-orange/10 backdrop-blur-sm p-6 rounded-t-glass border-b border-kids-green/20">
        <h2 className="text-xl text-kids-green flex items-center gap-2 font-bold">
          <Cookie className="w-6 h-6" />
          🍪 Algorithms in Everyday Life
        </h2>
      </div>
      <div className="p-6">
        <NarratedBox 
          text="Algorithms aren't just for computers — you use them all the time! Like following a recipe to bake cookies, building a LEGO set with instructions, using directions to get from home to school, or playing a board game by the rules."
          className="bg-yellow-50/80 backdrop-blur-sm border border-yellow-200/30"
          showSpeaker={true}
        >
          <div className="space-y-4">
            <p className="text-base text-gray-700 mb-4">
              Algorithms aren't just for computers — you use them all the time!
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-white/70 backdrop-blur-sm rounded-glass border border-kids-blue/20">
                <Cookie className="w-6 h-6 text-orange-500" />
                <span>Following a recipe to bake cookies</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/70 backdrop-blur-sm rounded-glass border border-kids-blue/20">
                <Puzzle className="w-6 h-6 text-blue-500" />
                <span>Building a LEGO set with instructions</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/70 backdrop-blur-sm rounded-glass border border-kids-blue/20">
                <span className="text-2xl">🗺️</span>
                <span>Using directions to get from home to school</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/70 backdrop-blur-sm rounded-glass border border-kids-blue/20">
                <span className="text-2xl">🎲</span>
                <span>Playing a board game by the rules</span>
              </div>
            </div>
          </div>
        </NarratedBox>
      </div>
    </GlassCard>
  );
};

export default AlgorithmEverydayLife;
