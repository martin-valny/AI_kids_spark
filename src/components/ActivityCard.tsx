
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Play, Star, Zap } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { Badge } from '@/components/ui/badge';

interface ActivityCardProps {
  title: string;
  description: string;
  image: string;
  difficulty: 'Easy' | 'Medium' | 'Challenging';
  estimatedTime: string;
  path: string;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-gradient-to-r from-kids-green to-emerald-500 text-white border-0';
    case 'Medium':
      return 'bg-gradient-to-r from-kids-yellow to-orange-500 text-white border-0';
    case 'Challenging':
      return 'bg-gradient-to-r from-kids-red to-pink-500 text-white border-0';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

const getDifficultyIcon = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return <Star className="w-3 h-3" />;
    case 'Medium':
      return <Zap className="w-3 h-3" />;
    case 'Challenging':
      return <Star className="w-3 h-3" />;
    default:
      return <Star className="w-3 h-3" />;
  }
};

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  description,
  image,
  difficulty,
  estimatedTime,
  path,
}) => {
  return (
    <GlassCard className="activity-card shine-effect">
      {/* Image container with play overlay */}
      <div className="activity-header">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
        
        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="glass-card-strong rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-8 h-8 text-kids-blue ml-1" fill="currentColor" />
          </div>
        </div>
        
        {/* Difficulty badge */}
        <Badge className={`absolute top-4 right-4 ${getDifficultyColor(difficulty)} shadow-lg`}>
          {getDifficultyIcon(difficulty)}
          {difficulty}
        </Badge>
      </div>
      
      {/* Content area */}
      <div className="activity-content">
        <h3 className="activity-title">
          {title}
        </h3>
        
        <p className="activity-description">
          {description}
        </p>
        
        {/* Time and action row */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-gray-500 flex items-center glass-card px-3 py-1 rounded-full">
            <Clock className="mr-2 h-4 w-4" />
            {estimatedTime}
          </span>
          
          <Link to={path}>
            <GradientButton variant="primary" size="small" icon={ArrowRight}>
              Start Activity
            </GradientButton>
          </Link>
        </div>
      </div>
    </GlassCard>
  );
};

export default ActivityCard;
