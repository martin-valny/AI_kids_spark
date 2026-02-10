import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { ArrowRight, ArrowLeft, Check, Video, Sparkles, Save, Clock, Trash2 } from 'lucide-react';

interface MLPProject {
  id: string;
  template: string;
  hook: string;
  captions: string;
  savedAt: string;
}

const STORAGE_KEY = 'lumora-mlp-projects';

const loadProjects = (): MLPProject[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveProjects = (projects: MLPProject[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

const templates = [
  {
    id: 'trending-explainer',
    title: 'Trending Explainer',
    description: '"Did you know...?" format. Great for education, tech, or curiosity content.',
    icon: '🧠',
    promptHint: 'Write 3 scroll-stopping hooks for a "Did you know?" explainer short about [your topic]. Keep each under 10 words.',
    captionHint: 'Write captions for a 30-60 second explainer video with the hook: "[your hook]". Include a CTA to follow for more.',
  },
  {
    id: 'day-in-the-life',
    title: 'Day in the Life',
    description: 'Show your process. Great for creators, students, freelancers.',
    icon: '📷',
    promptHint: 'Write 3 scroll-stopping hooks for a "day in the life" short about [your role/activity]. Keep each under 10 words.',
    captionHint: 'Write captions for a 30-60 second day-in-the-life video with the hook: "[your hook]". Make it relatable and end with a question.',
  },
  {
    id: 'product-showcase',
    title: 'Product Showcase',
    description: 'Highlight a tool, product, or project. Great for reviews and portfolios.',
    icon: '🎬',
    promptHint: 'Write 3 scroll-stopping hooks for a product showcase short about [tool/product]. Keep each under 10 words.',
    captionHint: 'Write captions for a 30-60 second product showcase video with the hook: "[your hook]". Include a clear takeaway.',
  },
];

const FirstShort = () => {
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [hook, setHook] = useState('');
  const [captions, setCaptions] = useState('');
  const [savedProjects, setSavedProjects] = useState<MLPProject[]>(loadProjects());
  const [justSaved, setJustSaved] = useState(false);

  const template = templates.find(t => t.id === selectedTemplate);

  const handleSelectTemplate = (id: string) => {
    setSelectedTemplate(id);
    setStep(2);
  };

  const handleSave = () => {
    if (!selectedTemplate || !hook.trim()) return;

    const project: MLPProject = {
      id: `mlp-${Date.now()}`,
      template: template?.title || selectedTemplate,
      hook: hook.trim(),
      captions: captions.trim(),
      savedAt: new Date().toISOString(),
    };

    const updated = [project, ...savedProjects];
    saveProjects(updated);
    setSavedProjects(updated);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 3000);
  };

  const handleDelete = (id: string) => {
    const updated = savedProjects.filter(p => p.id !== id);
    saveProjects(updated);
    setSavedProjects(updated);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedTemplate(null);
    setHook('');
    setCaptions('');
    setJustSaved(false);
  };

  return (
    <LessonLayout
      title="Make Your First AI-Boosted Short"
      subtitle="60-90 min guided project. Pick a template, generate your hook, and ship it."
      backLink="/"
      backLabel="Back to Home"
    >
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Time Badge */}
        <div className="flex items-center justify-center gap-3">
          <span className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-bold flex items-center gap-2">
            <Clock className="w-4 h-4" />
            ~60-90 minutes
          </span>
          <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-bold">
            Beginner Friendly
          </span>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  s < step
                    ? 'bg-green-500 text-white'
                    : s === step
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {s < step ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 3 && (
                <div className={`w-12 h-1 rounded ${s < step ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Pick a Template */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 1: Pick a Template</h2>
              <p className="text-gray-600">Choose a format for your short. Each one works great on TikTok, Reels, and Shorts.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {templates.map(t => (
                <button
                  key={t.id}
                  onClick={() => handleSelectTemplate(t.id)}
                  className="text-left p-6 rounded-xl border-2 border-gray-200 hover:border-indigo-400 hover:shadow-lg transition-all bg-white group"
                >
                  <div className="text-4xl mb-4">{t.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {t.title}
                  </h3>
                  <p className="text-sm text-gray-600">{t.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Generate & Refine */}
        {step === 2 && template && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 2: Generate & Refine</h2>
              <p className="text-gray-600">Use AI to generate your hook and captions, then refine them.</p>
            </div>

            <GlassCard variant="blue" className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-gray-900">AI Prompt for Your Hook</h3>
              </div>
              <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-4 font-mono mb-4">
                {template.promptHint}
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Copy this prompt into ChatGPT, Claude, or any AI tool. Then paste your favorite hook below.
              </p>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Hook</label>
              <input
                type="text"
                value={hook}
                onChange={e => setHook(e.target.value)}
                placeholder="e.g., This AI tool replaced my entire editing workflow"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              />
            </GlassCard>

            <GlassCard variant="purple" className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Video className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-gray-900">AI Prompt for Captions</h3>
              </div>
              <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-4 font-mono mb-4">
                {template.captionHint}
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Generate captions with AI, then edit to match your voice.
              </p>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Captions</label>
              <textarea
                value={captions}
                onChange={e => setCaptions(e.target.value)}
                placeholder="Paste your AI-generated captions here and refine them..."
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-none"
              />
            </GlassCard>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <GradientButton
                variant="primary"
                onClick={() => setStep(3)}
                disabled={!hook.trim()}
              >
                Continue to Export <ArrowRight className="w-4 h-4 ml-2" />
              </GradientButton>
            </div>
          </div>
        )}

        {/* Step 3: Export & Save */}
        {step === 3 && template && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 3: Export & Save</h2>
              <p className="text-gray-600">Review your short plan, then save it to your portfolio.</p>
            </div>

            <GlassCard variant="green" className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">Your Short Plan</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-gray-700">Template:</span>
                    <span className="text-sm text-gray-600 ml-2">{template.title}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-gray-700">Hook:</span>
                    <span className="text-sm text-gray-600 ml-2">{hook}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  {captions.trim() ? (
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded border-2 border-gray-300 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <span className="text-sm font-semibold text-gray-700">Captions:</span>
                    <span className="text-sm text-gray-600 ml-2">
                      {captions.trim() ? `${captions.slice(0, 80)}...` : 'Not added yet'}
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard variant="blue" className="p-6">
              <h3 className="font-bold text-gray-900 mb-3">Next Steps (in CapCut or your editor)</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded border-2 border-gray-300 flex-shrink-0" />
                  Film or source your clips (30-60 seconds)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded border-2 border-gray-300 flex-shrink-0" />
                  Add your hook as text overlay in the first 3 seconds
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded border-2 border-gray-300 flex-shrink-0" />
                  Add captions/subtitles
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded border-2 border-gray-300 flex-shrink-0" />
                  Export and post to TikTok, Reels, or Shorts
                </li>
              </ul>
            </GlassCard>

            <div className="flex justify-between items-center">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <div className="flex items-center gap-3">
                {justSaved && (
                  <span className="text-sm text-green-600 font-semibold">Saved!</span>
                )}
                <GradientButton variant="primary" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" /> Save to Portfolio
                </GradientButton>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={handleReset}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
              >
                Start a new short
              </button>
            </div>
          </div>
        )}

        {/* My Projects Section */}
        {savedProjects.length > 0 && (
          <div className="border-t border-gray-200 pt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6">My Projects</h2>
            <div className="space-y-4">
              {savedProjects.map(project => (
                <div
                  key={project.id}
                  className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                          {project.template}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(project.savedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {project.hook}
                      </p>
                      {project.captions && (
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {project.captions}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="ml-3 p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </LessonLayout>
  );
};

export default FirstShort;
