import React, { useState } from 'react';
import { completeLesson, uncompleteLesson, isLessonCompleted, resetProgress, getProgressSummary } from '@/utils/progressTracker';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/GlassCard';
import { LESSON_IDS } from '@/utils/progressTracker';
import { getLessonName } from '@/data/projectsData';

const ProgressDebugger = () => {
    const [, forceUpdate] = useState({});
    const refresh = () => forceUpdate({});

    const handleToggleLesson = (lessonId: string) => {
        if (isLessonCompleted(lessonId)) {
            uncompleteLesson(lessonId);
        } else {
            completeLesson(lessonId);
        }
        refresh();
    };

    const handleReset = () => {
        if (confirm('Are you sure you want to reset all progress?')) {
            resetProgress();
            refresh();
        }
    };

    const handleCompleteAll = () => {
        LESSON_IDS.forEach(id => completeLesson(id));
        refresh();
    };

    const summary = getProgressSummary();

    return (
        <div className="min-h-screen bg-gradient-to-br from-kids-blue/10 to-kids-purple/10 p-8">
            <div className="max-w-4xl mx-auto">
                <GlassCard className="p-8">
                    <h1 className="text-3xl font-bold mb-6">🔧 Progress Debugger</h1>

                    <div className="mb-6 p-4 bg-kids-blue/10 rounded-lg">
                        <h2 className="font-bold mb-2">Progress Summary</h2>
                        <p>Completed Lessons: {summary.completedLessons}/{summary.totalLessons}</p>
                        <p>Unlocked Projects: {summary.unlockedProjects}/{summary.totalProjects}</p>
                        <p>Overall Progress: {summary.overallProgress}%</p>
                    </div>

                    <div className="space-y-4 mb-6">
                        <h2 className="text-xl font-bold">Toggle Lesson Completion:</h2>
                        {LESSON_IDS.map(lessonId => (
                            <div key={lessonId} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                                <span className="font-medium">{getLessonName(lessonId)}</span>
                                <Button
                                    onClick={() => handleToggleLesson(lessonId)}
                                    variant={isLessonCompleted(lessonId) ? "default" : "outline"}
                                    size="sm"
                                >
                                    {isLessonCompleted(lessonId) ? '✓ Completed' : 'Mark Complete'}
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <Button onClick={handleCompleteAll} className="bg-kids-green text-white">
                            Complete All Lessons
                        </Button>
                        <Button onClick={handleReset} variant="destructive">
                            Reset All Progress
                        </Button>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                            <strong>Note:</strong> Use this page to test the project unlocking system.
                            Complete lessons to unlock projects, then visit the Lessons page to see the changes.
                        </p>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default ProgressDebugger;
