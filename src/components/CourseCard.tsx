import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image?: string; // Kept for backward compatibility but optional
  icon?: ReactNode;
  color?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  path: string;
}

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Beginner':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'Intermediate':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Advanced':
      return 'bg-rose-100 text-rose-700 border-rose-200';
    default:
      return 'bg-blue-100 text-blue-700 border-blue-200';
  }
};

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  icon,
  color = "from-blue-500 to-cyan-500",
  level,
  duration,
  path,
}) => {
  return (
    <Link to={path} className="block h-full">
      <div className="h-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group relative">
        {/* Gradient Header */}
        <div className={`h-32 bg-gradient-to-br ${color} relative p-6 flex items-start justify-between`}>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

          {/* Decorative circles */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/20 rounded-full blur-xl group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute top-10 -left-6 w-16 h-16 bg-white/10 rounded-full blur-lg" />

          <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl relative z-10 text-white shadow-sm border border-white/20">
            {icon || <BookOpen className="w-8 h-8" />}
          </div>

          <Badge className={`${getLevelColor(level)} shadow-sm backdrop-blur-md bg-white/90 border relative z-10`}>
            {level}
          </Badge>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
              {title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1.5 text-gray-400" />
              {duration}
            </div>

            <span className="inline-flex items-center text-sm font-semibold text-kids-blue group-hover:translate-x-1 transition-transform cursor-pointer">
              Start Creating
              <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
