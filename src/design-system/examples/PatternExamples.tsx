/**
 * Pattern Examples - Live Visual Reference
 *
 * This page demonstrates all design patterns from patterns.md
 * with interactive examples that can be viewed in the browser.
 *
 * Use this as a visual reference when building new components.
 *
 * @see src/design-system/patterns.md - Pattern documentation
 * @see src/design-system/tokens.ts - Design tokens
 */

import React from 'react';
import { LessonLayout } from '@/components/layout/LessonLayout';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import {
  Brain,
  Sparkles,
  Star,
  Zap,
  ArrowRight,
  Play,
  Heart,
  Lightbulb,
  Target,
  Rocket,
  X,
  BookOpen,
  Palette,
  Code
} from 'lucide-react';

// Import new component library
import {
  FeatureCard,
  ActivityCard,
  LessonCard,
  TipBox,
  WarningBox,
  SuccessBox,
  InfoBox,
  CardGrid,
  SectionHeader
} from '@/components/cards';
import { DesignTokens, getInnerCardClasses, getIconContainerClasses, getHighlightBoxClasses } from '@/design-system/tokens';

const PatternExamples = () => {
  return (
    <LessonLayout
      title="Design Pattern Library"
      subtitle="Live examples of all UI patterns from the High-Opacity Glass design system"
      backLink="/design-pilot"
      backLabel="Back to Design Pilot"
    >
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Pattern 1: Main Container (GlassCard) */}
        <section>
          <div className="mb-6">
            <span className="px-3 py-1 bg-kids-blue/10 text-kids-blue rounded-full text-sm font-bold border border-kids-blue/20">
              PATTERN 1
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Main Container (GlassCard)</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Blue Variant */}
            <GlassCard variant="blue" className="p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Blue Variant</h3>
              <p className="text-gray-700 mb-4">
                Standard container with <code className="bg-kids-blue/10 px-2 py-1 rounded text-sm">bg-white/90</code> opacity.
              </p>
              <p className="text-sm text-gray-600">Variant: "blue"</p>
            </GlassCard>

            {/* Purple Variant */}
            <GlassCard variant="purple" className="p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Purple Variant</h3>
              <p className="text-gray-700 mb-4">
                Subtle pastel tint with backdrop blur effect.
              </p>
              <p className="text-sm text-gray-600">Variant: "purple"</p>
            </GlassCard>

            {/* Green Variant */}
            <GlassCard variant="green" className="p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Green Variant</h3>
              <p className="text-gray-700 mb-4">
                Perfect readability on all backgrounds.
              </p>
              <p className="text-sm text-gray-600">Variant: "green"</p>
            </GlassCard>

            {/* Pink Variant */}
            <GlassCard variant="pink" className="p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Pink Variant</h3>
              <p className="text-gray-700 mb-4">
                All variants maintain consistent spacing.
              </p>
              <p className="text-sm text-gray-600">Variant: "pink"</p>
            </GlassCard>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl">
            <p className="text-sm text-gray-700 font-mono">
              {`<GlassCard variant="blue" className="p-8">`}
              <br />
              {`  {/* Your content */}`}
              <br />
              {`</GlassCard>`}
            </p>
          </div>
        </section>

        {/* Pattern 2: Inner Card (Grid Item) */}
        <section>
          <div className="mb-6">
            <span className="px-3 py-1 bg-kids-purple/10 text-kids-purple rounded-full text-sm font-bold border border-kids-purple/20">
              PATTERN 2
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Inner Card (Grid Item)</h2>

          <div className={DesignTokens.grid.threeCol}>
            {/* Blue Card */}
            <div className={getInnerCardClasses('blue')}>
              <div className={getIconContainerClasses('blue', 'md')}>
                <Brain className="w-6 h-6 text-kids-blue" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-kids-blue transition-colors">
                Consistent Framing
              </h4>
              <p className="text-sm text-gray-600">
                Visible 2px border with standard opacity. Hover to see lift effect!
              </p>
            </div>

            {/* Purple Card */}
            <div className={getInnerCardClasses('purple')}>
              <div className={getIconContainerClasses('purple', 'md')}>
                <Sparkles className="w-6 h-6 text-kids-purple" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-kids-purple transition-colors flex items-center gap-2">
                Interactive Hover
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </h4>
              <p className="text-sm text-gray-600">
                Border color change, shadow increase, smooth lift animation.
              </p>
            </div>

            {/* Green Card */}
            <div className={getInnerCardClasses('green')}>
              <div className={getIconContainerClasses('green', 'md')}>
                <Star className="w-6 h-6 text-kids-green" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-kids-green transition-colors">
                Readability First
              </h4>
              <p className="text-sm text-gray-600">
                High contrast text ensures content is always legible.
              </p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl mt-6">
            <p className="text-sm text-gray-700 font-mono">
              {`<div className={getInnerCardClasses('blue')}>`}
              <br />
              {`  <div className={getIconContainerClasses('blue')}>`}
              <br />
              {`    <Icon className="w-6 h-6 text-kids-blue" />`}
              <br />
              {`  </div>`}
              <br />
              {`  <h4>Card Title</h4>`}
              <br />
              {`  <p>Description</p>`}
              <br />
              {`</div>`}
            </p>
          </div>
        </section>

        {/* Pattern 3: Highlight Box */}
        <section>
          <div className="mb-6">
            <span className="px-3 py-1 bg-kids-yellow/10 text-kids-yellow rounded-full text-sm font-bold border border-kids-yellow/20">
              PATTERN 3
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Highlight Box (Tips, Callouts)</h2>

          <div className="space-y-4">
            {/* Pro Tip - Purple */}
            <div className={getHighlightBoxClasses('purple')}>
              <p className="text-sm text-gray-700 font-medium flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-kids-purple" />
                <strong>Pro Tip:</strong> Use these boxes for key takeaways and important insights.
              </p>
            </div>

            {/* Warning - Yellow */}
            <div className={getHighlightBoxClasses('yellow')}>
              <p className="text-sm text-gray-700 font-medium flex items-center gap-2">
                <Zap className="w-4 h-4 text-kids-yellow" />
                <strong>Warning:</strong> Pay attention to this important information.
              </p>
            </div>

            {/* Success - Green */}
            <div className={getHighlightBoxClasses('green')}>
              <p className="text-sm text-gray-700 font-medium flex items-center gap-2">
                <Star className="w-4 h-4 text-kids-green" />
                <strong>Success:</strong> Great job! You've completed this step correctly.
              </p>
            </div>

            {/* Info - Blue */}
            <div className={getHighlightBoxClasses('blue')}>
              <p className="text-sm text-gray-700 font-medium flex items-center gap-2">
                <Brain className="w-4 h-4 text-kids-blue" />
                <strong>Did you know?</strong> Highlight boxes use bg-white/80 for subtle transparency.
              </p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl mt-6">
            <p className="text-sm text-gray-700 font-mono">
              {`<div className={getHighlightBoxClasses('purple')}>`}
              <br />
              {`  <p className="text-sm flex items-center gap-2">`}
              <br />
              {`    <Icon /> <strong>Tip:</strong> Your message`}
              <br />
              {`  </p>`}
              <br />
              {`</div>`}
            </p>
          </div>
        </section>

        {/* Pattern 4: Standard Grids */}
        <section>
          <div className="mb-6">
            <span className="px-3 py-1 bg-kids-green/10 text-kids-green rounded-full text-sm font-bold border border-kids-green/20">
              PATTERN 4
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Standard Grid Patterns</h2>

          <h3 className="text-lg font-bold text-gray-800 mb-4">Three Column Grid</h3>
          <div className={DesignTokens.grid.threeCol}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/90 p-6 rounded-2xl border-2 border-kids-blue/20 text-center">
                <p className="text-gray-700">Grid Item {i}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-4 mt-8">Two Column Grid</h3>
          <div className={DesignTokens.grid.twoCol}>
            {[1, 2].map((i) => (
              <div key={i} className="bg-white/90 p-6 rounded-2xl border-2 border-kids-purple/20 text-center">
                <p className="text-gray-700">Grid Item {i}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-4 mt-8">Four Column Grid</h3>
          <div className={DesignTokens.grid.fourCol}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/90 p-4 rounded-xl border-2 border-kids-green/20 text-center">
                <p className="text-sm text-gray-700">Item {i}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-100 p-4 rounded-xl mt-6">
            <p className="text-sm text-gray-700 font-mono">
              {`<div className={DesignTokens.grid.threeCol}>`}
              <br />
              {`  {/* Cards */}`}
              <br />
              {`</div>`}
            </p>
          </div>
        </section>

        {/* Pattern 5: Button Patterns */}
        <section>
          <div className="mb-6">
            <span className="px-3 py-1 bg-kids-pink/10 text-kids-pink rounded-full text-sm font-bold border border-kids-pink/20">
              PATTERN 5
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Button Patterns</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Primary Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-kids-blue hover:bg-kids-blue/90 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  Blue Primary
                </Button>
                <Button className="bg-kids-purple hover:bg-kids-purple/90 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  Purple Primary
                </Button>
                <Button className="bg-kids-green hover:bg-kids-green/90 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  Green Primary
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Secondary Buttons (Outline)</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" className="border-2 border-kids-blue text-kids-blue hover:bg-kids-blue/5">
                  Blue Outline
                </Button>
                <Button variant="outline" className="border-2 border-kids-purple text-kids-purple hover:bg-kids-purple/5">
                  Purple Outline
                </Button>
                <Button variant="outline" className="border-2 border-kids-green text-kids-green hover:bg-kids-green/5">
                  Green Outline
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Buttons with Icons</h3>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-kids-purple hover:bg-kids-purple/90 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  Start Learning <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button className="bg-kids-blue hover:bg-kids-blue/90 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  <Play className="mr-2 w-4 h-4" /> Watch Video
                </Button>
                <Button className="bg-kids-pink hover:bg-kids-pink/90 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  <Heart className="mr-2 w-4 h-4" /> Favorite
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl mt-6">
            <p className="text-sm text-gray-700 font-mono">
              {`<Button className="bg-kids-blue hover:bg-kids-blue/90`}
              <br />
              {`                 text-white shadow-lg hover:shadow-xl`}
              <br />
              {`                 hover:-translate-y-0.5 transition-all">`}
              <br />
              {`  Primary Action`}
              <br />
              {`</Button>`}
            </p>
          </div>
        </section>

        {/* Pattern 6: Split Layout */}
        <section>
          <div className="mb-6">
            <span className="px-3 py-1 bg-kids-orange/10 text-kids-orange rounded-full text-sm font-bold border border-kids-orange/20">
              PATTERN 6
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Split Layout (Text + Visual)</h2>

          <GlassCard variant="purple" className="p-0 overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Text Side */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Structured Content
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  For complex explanations, use this split layout. The text side is clean and focused, while the visual side provides engaging context.
                </p>
                <div className={getHighlightBoxClasses('purple') + ' mb-6'}>
                  <p className="text-sm text-gray-700 font-medium flex items-center gap-2">
                    <Zap className="w-4 h-4 text-kids-purple" />
                    <strong>Pro Tip:</strong> Perfect for detailed lessons!
                  </p>
                </div>
                <Button className="w-fit bg-kids-purple hover:bg-kids-purple/90 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>

              {/* Visual Side */}
              <div className="bg-gradient-to-br from-kids-purple/10 to-kids-pink/10 p-12 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-kids-purple/5 backdrop-blur-sm" />
                <div className="relative bg-white/90 p-6 rounded-2xl shadow-xl border-2 border-white transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="w-32 h-32 bg-kids-purple/20 rounded-xl flex items-center justify-center mb-4">
                    <Rocket className="w-12 h-12 text-kids-purple" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-32 bg-gray-100 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Pattern 7: Icon Containers */}
        <section>
          <div className="mb-6">
            <span className="px-3 py-1 bg-kids-teal/10 text-kids-teal rounded-full text-sm font-bold border border-kids-teal/20">
              PATTERN 7
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Icon Container Sizes</h2>

          <div className="flex flex-wrap items-end gap-8">
            {/* Small */}
            <div className="text-center">
              <div className="group">
                <div className={getIconContainerClasses('blue', 'sm')}>
                  <Brain className="w-5 h-5 text-kids-blue" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Small (w-10 h-10)</p>
            </div>

            {/* Medium */}
            <div className="text-center">
              <div className="group">
                <div className={getIconContainerClasses('purple', 'md')}>
                  <Sparkles className="w-6 h-6 text-kids-purple" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Medium (w-12 h-12)</p>
            </div>

            {/* Large */}
            <div className="text-center">
              <div className="group">
                <div className={getIconContainerClasses('green', 'lg')}>
                  <Star className="w-8 h-8 text-kids-green" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Large (w-16 h-16)</p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl mt-6">
            <p className="text-sm text-gray-700 font-mono">
              {`<div className={getIconContainerClasses('blue', 'md')}>`}
              <br />
              {`  <Icon className="w-6 h-6 text-kids-blue" />`}
              <br />
              {`</div>`}
            </p>
          </div>
        </section>

        {/* Pattern 8: Pastel Gradients */}
        <section>
          <div className="mb-6">
            <span className="px-3 py-1 bg-kids-red/10 text-kids-red rounded-full text-sm font-bold border border-kids-red/20">
              PATTERN 8
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Pastel Gradient Backgrounds (45% Opacity)</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-6 rounded-xl bg-gradient-to-br from-kids-blue/45 to-cyan-400/45 border border-kids-blue/20 flex flex-col items-center justify-center text-center min-h-[120px]">
              <span className="font-bold text-kids-blue mb-1">Blue</span>
              <span className="text-xs text-gray-600">/45 Opacity</span>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-kids-purple/45 to-kids-pink/45 border border-kids-purple/20 flex flex-col items-center justify-center text-center min-h-[120px]">
              <span className="font-bold text-kids-purple mb-1">Purple</span>
              <span className="text-xs text-gray-600">/45 Opacity</span>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-kids-green/45 to-emerald-400/45 border border-kids-green/20 flex flex-col items-center justify-center text-center min-h-[120px]">
              <span className="font-bold text-kids-green mb-1">Green</span>
              <span className="text-xs text-gray-600">/45 Opacity</span>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-kids-orange/45 to-kids-yellow/45 border border-kids-orange/20 flex flex-col items-center justify-center text-center min-h-[120px]">
              <span className="font-bold text-kids-orange mb-1">Orange</span>
              <span className="text-xs text-gray-600">/45 Opacity</span>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl mt-6">
            <p className="text-sm text-gray-700 font-mono">
              {`<div className="bg-gradient-to-br from-kids-blue/45 to-cyan-400/45`}
              <br />
              {`             border border-kids-blue/20">`}
              <br />
              {`  {/* Decorative background only */}`}
              <br />
              {`</div>`}
            </p>
          </div>
        </section>

        {/* Pattern 9: Hover States */}
        <section>
          <div className="mb-6">
            <span className="px-3 py-1 bg-kids-yellow/10 text-kids-yellow rounded-full text-sm font-bold border border-kids-yellow/20">
              PATTERN 9
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Hover State Patterns</h2>

          <div className="space-y-4">
            <div className="group bg-white/90 p-6 rounded-2xl border-2 border-kids-blue/20 shadow-sm hover:border-kids-blue hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={getIconContainerClasses('blue', 'md')}>
                    <Target className="w-6 h-6 text-kids-blue" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-kids-blue transition-colors">
                      Hover to see all effects
                    </h4>
                    <p className="text-sm text-gray-600">
                      Border color change, lift, shadow increase, icon scale
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-kids-blue opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-xl">
              <p className="text-sm text-gray-700 mb-2 font-bold">Standard Hover Classes:</p>
              <p className="text-sm text-gray-700 font-mono">
                {`group                        {/* Enable group hover */}`}
                <br />
                {`hover:border-kids-blue      {/* Border color */}`}
                <br />
                {`hover:shadow-lg             {/* Shadow increase */}`}
                <br />
                {`hover:-translate-y-1        {/* Lift effect */}`}
                <br />
                {`transition-all duration-300 {/* Smooth animation */}`}
              </p>
            </div>
          </div>
        </section>

        {/* Pattern 10: Accessibility */}
        <section>
          <div className="mb-6">
            <span className="px-3 py-1 bg-kids-green/10 text-kids-green rounded-full text-sm font-bold border border-kids-green/20">
              PATTERN 10
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Accessibility Patterns</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Touch Targets (44px minimum)</h3>
              <div className="flex gap-4">
                <button className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-6 py-3 bg-kids-blue hover:bg-kids-blue/90 text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  Accessible Button
                </button>
                <button className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-4 py-2 border-2 border-kids-purple text-kids-purple hover:bg-kids-purple/5 rounded-full transition-all">
                  Touch-Friendly
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Focus States</h3>
              <button className="px-6 py-3 bg-kids-purple hover:bg-kids-purple/90 text-white rounded-full focus:outline-none focus:ring-4 focus:ring-kids-purple/30 shadow-lg transition-all">
                Tab to see focus ring
              </button>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">ARIA Labels</h3>
              <div className="flex gap-4">
                <button aria-label="Close dialog" className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-all">
                  <X className="w-6 h-6" />
                </button>
                <div
                  role="button"
                  tabIndex={0}
                  aria-label="Learn about AI basics"
                  className="group bg-white/90 p-4 rounded-xl border-2 border-kids-blue/20 hover:border-kids-blue transition-all cursor-pointer"
                >
                  <p className="text-sm text-gray-700">Interactive card with ARIA label</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl mt-6">
            <p className="text-sm text-gray-700 font-mono">
              {`<button aria-label="Close dialog"`}
              <br />
              {`        className="min-w-[44px] min-h-[44px]`}
              <br />
              {`                   focus:ring-4 focus:ring-kids-blue/30">`}
              <br />
              {`  <Icon />`}
              <br />
              {`</button>`}
            </p>
          </div>
        </section>

        {/* NEW: Component Library Showcase */}
        <section>
          <div className="mb-6">
            <span className="px-3 py-1 bg-gradient-to-r from-kids-blue/20 to-kids-purple/20 text-kids-purple rounded-full text-sm font-bold border border-kids-purple/20">
              NEW COMPONENTS
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Component Library</h2>
          <p className="text-gray-600 mb-8">
            Reusable React components that encapsulate all the patterns above. Import from <code className="bg-gray-100 px-2 py-1 rounded">@/components/cards</code>
          </p>

          {/* FeatureCard Examples */}
          <SectionHeader title="FeatureCard" description="For displaying features and benefits" />
          <CardGrid columns={3} className="mt-4 mb-12">
            <FeatureCard
              title="Interactive Learning"
              description="Hands-on exercises that make concepts stick"
              icon={Brain}
              color="blue"
            />
            <FeatureCard
              title="Creative Projects"
              description="Build real AI applications with guidance"
              icon={Palette}
              color="purple"
            />
            <FeatureCard
              title="Code Challenges"
              description="Test your skills with fun puzzles"
              icon={Code}
              color="green"
            />
          </CardGrid>

          {/* ActivityCard Examples */}
          <SectionHeader title="ActivityCard" description="For interactive activities and exercises" />
          <CardGrid columns={3} className="mt-4 mb-12">
            <ActivityCard
              title="Pattern Detective"
              description="Can you spot the patterns in data?"
              icon={Target}
              color="purple"
              duration="10 min"
              difficulty="easy"
              onClick={() => alert('Activity started!')}
            />
            <ActivityCard
              title="AI Art Generator"
              description="Create amazing art with AI assistance"
              icon={Palette}
              color="pink"
              duration="15 min"
              difficulty="medium"
              badge="Popular"
            />
            <ActivityCard
              title="Code Challenge"
              description="Solve real-world coding problems"
              icon={Code}
              color="orange"
              duration="20 min"
              difficulty="hard"
            />
          </CardGrid>

          {/* LessonCard Examples */}
          <SectionHeader title="LessonCard" description="For educational lessons with progress tracking" />
          <CardGrid columns={3} className="mt-4 mb-12">
            <LessonCard
              title="What is AI?"
              description="Introduction to artificial intelligence concepts"
              icon={Brain}
              color="blue"
              lessonNumber={1}
              duration="15 min"
              status="completed"
              progress={100}
            />
            <LessonCard
              title="Machine Learning"
              description="How computers learn from data"
              icon={Sparkles}
              color="purple"
              lessonNumber={2}
              duration="20 min"
              status="in-progress"
              progress={60}
            />
            <LessonCard
              title="Neural Networks"
              description="Building blocks of modern AI"
              icon={BookOpen}
              color="green"
              lessonNumber={3}
              duration="25 min"
              status="locked"
            />
          </CardGrid>

          {/* HighlightBox Examples */}
          <SectionHeader title="HighlightBox Variants" description="For tips, warnings, and callouts" />
          <div className="space-y-4 mt-4 mb-12">
            <TipBox>Use TipBox for helpful hints and best practices!</TipBox>
            <WarningBox>WarningBox highlights important cautions.</WarningBox>
            <SuccessBox>SuccessBox celebrates achievements and confirmations.</SuccessBox>
            <InfoBox>InfoBox provides additional context and information.</InfoBox>
          </div>

          {/* Code Example */}
          <div className="bg-gray-100 p-4 rounded-xl">
            <p className="text-sm text-gray-700 font-mono">
              {`import { FeatureCard, ActivityCard, LessonCard, TipBox, CardGrid } from '@/components/cards';`}
              <br /><br />
              {`<CardGrid columns={3}>`}
              <br />
              {`  <FeatureCard title="..." description="..." icon={Brain} color="blue" />`}
              <br />
              {`  <ActivityCard title="..." icon={Star} duration="10 min" difficulty="easy" />`}
              <br />
              {`  <LessonCard title="..." icon={Book} status="completed" progress={100} />`}
              <br />
              {`</CardGrid>`}
            </p>
          </div>
        </section>

        {/* Quick Reference */}
        <section>
          <GlassCard variant="blue" className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Reference</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">Opacity Standards</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li><code className="bg-gray-100 px-2 py-1 rounded">/90</code> - Main containers</li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">/80</code> - Highlight boxes</li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">/10</code> - Icon backgrounds</li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">/20</code> - Inner borders</li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">/50</code> - Subtle borders</li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">/45</code> - Gradients</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">Spacing Standards</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li><code className="bg-gray-100 px-2 py-1 rounded">p-6</code> - Card padding</li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">p-8 md:p-12</code> - Hero padding</li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">gap-6</code> - Grid gap</li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">gap-4</code> - Button gap</li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">space-y-12</code> - Section spacing</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">Border Standards</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li><code className="bg-gray-100 px-2 py-1 rounded">border</code> - GlassCard (1px)</li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">border-2</code> - Inner cards (2px)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">Animation Standards</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li><code className="bg-gray-100 px-2 py-1 rounded">duration-300</code> - Always</li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">hover:-translate-y-1</code> - Lift</li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">group-hover:scale-110</code> - Icon</li>
                  <li><code className="bg-gray-100 px-2 py-1 rounded">hover:shadow-lg</code> - Shadow</li>
                </ul>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Documentation Links */}
        <section>
          <div className={getHighlightBoxClasses('purple')}>
            <p className="text-sm text-gray-700 font-medium flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-kids-purple" />
              <strong>Documentation:</strong> See <code className="bg-kids-purple/10 px-2 py-1 rounded">src/design-system/patterns.md</code> for detailed code examples and <code className="bg-kids-purple/10 px-2 py-1 rounded">src/design-system/tokens.ts</code> for design tokens.
            </p>
          </div>
        </section>

      </div>
    </LessonLayout>
  );
};

export default PatternExamples;
