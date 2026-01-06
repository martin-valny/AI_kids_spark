import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, CheckCircle, Clock, Award } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { Button } from './ui/button';
import { Project } from '@/data/projectsData';
import { getLessonName } from '@/data/projectsData';

interface ProjectCardProps {
    project: Project;
    isUnlocked: boolean;
    isCompleted: boolean;
    missingLessons: string[];
    compact?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    isUnlocked,
    isCompleted,
    missingLessons,
    compact = false
}) => {
    const difficultyColors = {
        'Beginner': 'bg-kids-green text-white',
        'Intermediate': 'bg-kids-yellow text-gray-800',
        'Advanced': 'bg-kids-red text-white'
    };

    return (
        <div className={`relative rounded-xl p-[3px] bg-gradient-to-br ${project.color} shadow-xl transition-all duration-300 ${isUnlocked ? 'hover:scale-105 hover:shadow-2xl' : 'opacity-75'}`}>
            <GlassCard
                className={`relative overflow-hidden h-full flex flex-col ${compact ? 'min-h-[200px]' : 'min-h-[520px]'}`}
                variant="default"
                hover={false}
            >
                {/* PROJECT Badge */}
                <div className={`absolute top-0 right-0 px-4 py-1 rounded-bl-xl font-bold text-xs text-white bg-gradient-to-r ${project.color} shadow-md z-10`}>
                    PROJECT
                </div>

                {/* Gradient Background Tint - more visible than lesson cards */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-15 pointer-events-none`} />

                <div className={`relative ${compact ? 'p-4' : 'p-6'} flex flex-col flex-1`}>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className={compact ? "text-2xl" : "text-4xl"}>{project.icon}</div>
                            <div>
                                <h3 className={`font-bold text-gray-800 ${compact ? 'text-base' : 'text-xl'}`}>{project.title}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[project.difficulty]}`}>
                                        {project.difficulty}
                                    </span>
                                    {!compact && (
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {project.estimatedTime}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Status Icon */}
                        {isCompleted && (
                            <div className="bg-kids-green text-white p-2 rounded-full">
                                <CheckCircle className={compact ? "w-4 h-4" : "w-5 h-5"} />
                            </div>
                        )}
                        {!isCompleted && !isUnlocked && (
                            <div className="bg-gray-400 text-white p-2 rounded-full">
                                <Lock className={compact ? "w-4 h-4" : "w-5 h-5"} />
                            </div>
                        )}
                        {/* If unlocked and not completed, maybe show a "Start" icon or just nothing? 
                             The badge already says "Project". 
                             Let's keep the existing logic but maybe spruce up the container?
                             Existing logic only showed Completed or Locked icons.
                        */}
                    </div>

                    {/* Description */}
                    <p className={`text-gray-700 mb-4 leading-relaxed ${compact ? 'text-sm' : 'text-sm flex-1'}`}>
                        {compact
                            ? project.description.split('.')[0] + '.'
                            : project.description
                        }
                    </p>

                    {/* Tools - Only show in full mode */}
                    {!compact && (
                        <div className="mb-4">
                            <p className="text-xs font-semibold text-gray-600 mb-2">🛠️ Tools You'll Use:</p>
                            <div className="flex flex-wrap gap-2">
                                {project.tools.map((tool, index) => (
                                    <span
                                        key={index}
                                        className="text-xs bg-white/50 px-2 py-1 rounded-md border border-gray-200 text-gray-700"
                                    >
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Unlock Status */}
                    {!isUnlocked && missingLessons.length > 0 && (
                        <div className={`bg-yellow-50 border border-yellow-200 rounded-lg mb-4 ${compact ? 'p-2' : 'p-3'}`}>
                            <p className={`font-semibold text-yellow-800 flex items-center gap-2 ${compact ? 'text-xs mb-1' : 'text-sm mb-2'}`}>
                                <Lock className={compact ? "w-3 h-3" : "w-4 h-4"} />
                                {compact ? 'Locked' : 'Complete these lessons to unlock:'}
                            </p>
                            {!compact && (
                                <ul className="text-xs text-yellow-700 space-y-1">
                                    {missingLessons.map((lessonId, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full" />
                                            {getLessonName(lessonId)}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

                    {/* Completed Badge */}
                    {isCompleted && (
                        <div className={`bg-green-50 border border-green-200 rounded-lg mb-4 ${compact ? 'p-2' : 'p-3'}`}>
                            <p className={`font-semibold text-green-800 flex items-center gap-2 ${compact ? 'text-xs' : 'text-sm'}`}>
                                <Award className={compact ? "w-3 h-3" : "w-4 h-4"} />
                                {compact ? 'Completed! 🎉' : 'Project Completed! 🎉'}
                            </p>
                        </div>
                    )}

                    {/* Action Button */}
                    {isUnlocked ? (
                        <Link to={project.path}>
                            <Button
                                className={`w-full bg-gradient-to-r ${project.color} text-white hover:opacity-90 transition-opacity ${compact ? 'text-sm py-2' : ''}`}
                            >
                                {isCompleted ? 'View Project Again' : 'Start Project'} →
                            </Button>
                        </Link>
                    ) : (
                        <Button
                            disabled
                            className={`w-full bg-gray-300 text-gray-500 cursor-not-allowed ${compact ? 'text-sm py-2' : ''}`}
                        >
                            <Lock className={compact ? "w-3 h-3 mr-2" : "w-4 h-4 mr-2"} />
                            Locked
                        </Button>
                    )}
                </div>
            </GlassCard>
        </div>
    );
};
