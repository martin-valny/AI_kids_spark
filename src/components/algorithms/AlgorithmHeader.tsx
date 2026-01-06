
import React from 'react';
import { BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AlgorithmHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="w-8 h-8 text-kids-blue" />
        <h1 className="text-3xl font-bold">🤖 Simple Algorithms</h1>
        <Badge variant="secondary" className="ml-auto">30 minutes</Badge>
      </div>
      <p className="text-lg text-gray-600">
        Learn how computers follow step-by-step instructions to solve problems, just like following a recipe!
      </p>
    </div>
  );
};

export default AlgorithmHeader;
