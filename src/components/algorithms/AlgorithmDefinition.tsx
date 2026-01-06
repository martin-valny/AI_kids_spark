
import React from 'react';
import { Brain } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import NarratedBox from '@/components/NarratedBox';

const AlgorithmDefinition = () => {
  return (
    <GlassCard variant="blue" className="hover:shadow-glass-hover hover:-translate-y-1 transition-all duration-300">
      <div className="bg-gradient-to-r from-kids-blue/10 to-kids-green/10 backdrop-blur-sm p-6 rounded-t-glass border-b border-kids-blue/20">
        <h2 className="text-xl text-kids-blue flex items-center gap-2 font-bold">
          <Brain className="w-6 h-6" />
          🤖 What Is an Algorithm?
        </h2>
      </div>
      <div className="p-6">
        <NarratedBox 
          text="An algorithm is a set of step-by-step instructions that tell a computer how to solve a problem or complete a task. Think of it like a recipe — if you follow it in the right order, you'll get cookies. If the computer follows its algorithm, it gets the answer!"
          className="bg-gradient-to-r from-blue-100/80 to-purple-100/80 backdrop-blur-sm border border-blue-200/30"
          showSpeaker={true}
        >
          <div className="space-y-4">
            <p className="text-base text-gray-700">
              An algorithm is a set of step-by-step instructions that tell a computer how to solve a problem or complete a task.
            </p>
            <p className="text-base text-gray-700">
              Think of it like a recipe — if you follow it in the right order, you'll get cookies. If the computer follows its algorithm, it gets the answer!
            </p>
          </div>
        </NarratedBox>
      </div>
    </GlassCard>
  );
};

export default AlgorithmDefinition;
