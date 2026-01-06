import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Lock, Clock, Award } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { Button } from './ui/button';

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isCompleted?: boolean;
  isLocked?: boolean;
  path: string;
  subscriptionRequired?: boolean;
  estimatedTime?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon,
  isCompleted = false,
  isLocked = false,
  path,
  subscriptionRequired = false,
  estimatedTime = '30 min',
  difficulty = 'Beginner',
}) => {
  // Color schemes based on completion/lock status
  const getCardColor = () => {
    if (isCompleted) return 'from-kids-green to-emerald-500';
    if (isLocked) return 'from-gray-400 to-gray-500';
    return 'from-kids-blue to-kids-purple';
  };

  const difficultyColors = {
    'Beginner': 'bg-kids-green text-white',
    'Intermediate': 'bg-kids-yellow text-gray-800',
    'Advanced': 'bg-kids-red text-white'
  };

  return (
    <Link
      to={isLocked ? '#' : path}
      className={`block ${isLocked ? 'cursor-not-allowed' : ''}`}
    >
      <GlassCard
        className={`relative overflow-hidden transition-all duration-300 ${!isLocked ? 'hover:scale-105 hover:shadow-xl' : 'opacity-75'
          }`}
      >
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getCardColor()} opacity-10`} />

        <div className="relative p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              {/* Icon */}
              <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full ${isCompleted ? 'bg-kids-green/20' :
                  isLocked ? 'bg-gray-300/20' :
                    'bg-gradient-to-br from-kids-blue/20 to-kids-purple/20'
                }`}>
                <div className="text-2xl">
                  {icon}
                </div>
              </div>

              {/* Title and Badges */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-1 leading-tight">
                  {title}
                  {subscriptionRequired && (
                    <span className="ml-2 text-xs bg-gradient-to-r from-kids-purple to-kids-pink text-white px-2 py-0.5 rounded-full">
                      Premium
                    </span>
                  )}
                </h3>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColors[difficulty]}`}>
                    {difficulty}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {estimatedTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Status Icon */}
            {isCompleted && (
              <div className="bg-kids-green text-white p-2 rounded-full">
                <CheckCircle className="w-5 h-5" />
              </div>
            )}
            {isLocked && (
              <div className="bg-gray-400 text-white p-2 rounded-full">
                <Lock className="w-5 h-5" />
              </div>
            )}
            {!isCompleted && !isLocked && (
              <div className="bg-kids-blue text-white p-2 rounded-full">
                <Award className="w-5 h-5" />
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
            {description}
          </p>

          {/* Action Button/Status */}
          {!isLocked ? (
            <Button
              className={`w-full bg-gradient-to-r ${getCardColor()} text-white hover:opacity-90 transition-opacity text-sm`}
              onClick={(e) => {
                if (isLocked) {
                  e.preventDefault();
                }
              }}
            >
              {isCompleted ? 'Review Lesson →' : 'Start Lesson →'}
            </Button>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
              <p className="text-xs font-semibold text-yellow-800 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Complete previous lessons to unlock
              </p>
            </div>
          )}
        </div>
      </GlassCard>
    </Link>
  );
};

export default ModuleCard;
