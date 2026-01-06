
import React from 'react';
import { Gamepad2 } from 'lucide-react';
import ActivityCard from '@/components/ActivityCard';

const AlgorithmFunActivities = () => {
  const activities = [
    {
      title: "🤖 Robot Islands",
      description: "Program a robot to navigate through islands, collecting stars and avoiding obstacles using step-by-step commands.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
      difficulty: "Easy" as const,
      estimatedTime: "10-15 min",
      path: "/activities/algorithms/robot-islands"
    },
    {
      title: "🧠 Rodocodo",
      description: "Learn programming fundamentals like sequencing, loops, and conditionals through fun puzzles designed for kids.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80",
      difficulty: "Easy" as const,
      estimatedTime: "15-20 min",
      path: "/activities/algorithms/rodocodo"
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Gamepad2 className="w-6 h-6 text-purple-600" />
        🎮 Fun Activities
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {activities.map((activity, index) => (
          <ActivityCard
            key={index}
            title={activity.title}
            description={activity.description}
            image={activity.image}
            difficulty={activity.difficulty}
            estimatedTime={activity.estimatedTime}
            path={activity.path}
          />
        ))}
      </div>
    </div>
  );
};

export default AlgorithmFunActivities;
