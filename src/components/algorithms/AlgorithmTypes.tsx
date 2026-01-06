
import React from 'react';
import { Brain, Search, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import NarratedBox from '@/components/NarratedBox';

const AlgorithmTypes = () => {
  return (
    <GlassCard variant="purple" className="hover:shadow-glass-hover hover:-translate-y-1 transition-all duration-300">
      <div className="bg-gradient-to-r from-kids-orange/10 to-kids-blue/10 backdrop-blur-sm p-6 rounded-t-glass border-b border-kids-orange/20">
        <h2 className="text-xl text-kids-orange flex items-center gap-2 font-bold">
          <Brain className="w-6 h-6" />
          🧠 Simple Algorithms for Computers
        </h2>
      </div>
      <div className="p-6 space-y-6">
        {/* Sorting Algorithms */}
        <NarratedBox 
          text="Sorting algorithms help computers put things in order — like numbers from smallest to biggest, or names from A to Z. For example, unsorted numbers 5, 2, 9, 1, 7 become sorted as 1, 2, 5, 7, 9."
          className="bg-green-50/80 backdrop-blur-sm border border-green-200/30"
          showSpeaker={true}
        >
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              🗂️ Sorting Algorithms
            </h3>
            <p className="text-base text-gray-700">
              These help computers put things in order — like numbers from smallest to biggest, or names from A to Z.
            </p>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-glass border border-kids-green/20">
              <h4 className="font-semibold mb-2">🧮 Example:</h4>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Unsorted:</span> 5, 2, 9, 1, 7
                </div>
                <ArrowRight className="w-5 h-5 text-blue-500 mx-auto" />
                <div>
                  <span className="font-medium">Sorted:</span> 1, 2, 5, 7, 9
                </div>
              </div>
            </div>
          </div>
        </NarratedBox>

        {/* Search Algorithms */}
        <NarratedBox 
          text="Search algorithms help computers find something in a list. For example, to find 'apple' in a list of banana, orange, apple, kiwi, the computer would find it at position 3!"
          className="bg-blue-50/80 backdrop-blur-sm border border-blue-200/30"
          showSpeaker={true}
        >
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Search className="w-6 h-6" />
              🔍 Search Algorithms
            </h3>
            <p className="text-base text-gray-700">
              These help computers find something in a list.
            </p>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-glass border border-kids-blue/20">
              <h4 className="font-semibold mb-2">🧮 Example:</h4>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Find "apple" in list:</span> banana, orange, <span className="bg-yellow-200 px-1 rounded">apple</span>, kiwi
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-700 font-semibold">Found at position 3!</span>
                </div>
              </div>
            </div>
          </div>
        </NarratedBox>
      </div>
    </GlassCard>
  );
};

export default AlgorithmTypes;
