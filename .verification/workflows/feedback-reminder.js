#!/usr/bin/env node

/**
 * Feedback Loop Reminder System
 *
 * Analyzes git changes and suggests relevant feedback loops to run
 * without blocking the workflow.
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';

class FeedbackLoopReminder {
  constructor() {
    this.changes = {
      ui: false,
      tests: false,
      components: false,
      styles: false,
      routes: false,
      config: false
    };
    this.recommendations = [];
  }

  analyzeChanges() {
    try {
      // Get staged files
      const staged = execSync('git diff --cached --name-only', { encoding: 'utf8' })
        .split('\n')
        .filter(Boolean);

      // Get unstaged files
      const unstaged = execSync('git diff --name-only', { encoding: 'utf8' })
        .split('\n')
        .filter(Boolean);

      const allFiles = [...new Set([...staged, ...unstaged])];

      // Analyze file types
      allFiles.forEach(file => {
        if (file.match(/\.(tsx|jsx)$/)) {
          this.changes.components = true;
        }
        if (file.match(/\.(css|scss|sass|tailwind|style)/) || file.includes('tailwind.config')) {
          this.changes.styles = true;
        }
        if (file.match(/\.(spec|test)\.(ts|tsx|js|jsx)$/) || file.includes('playwright.config')) {
          this.changes.tests = true;
        }
        if (file.includes('/pages/') || file.includes('/routes/') || file.includes('App.tsx')) {
          this.changes.routes = true;
        }
        if (file.includes('src/components/') || file.includes('src/ui/')) {
          this.changes.ui = true;
        }
      });

      return allFiles;
    } catch (error) {
      // No changes or git not initialized
      return [];
    }
  }

  generateRecommendations() {
    // Browser Testing Loop recommendations
    if (this.changes.components || this.changes.routes || this.changes.ui) {
      this.recommendations.push({
        loop: 'Browser Testing',
        command: 'npm run feedback:browser',
        reason: 'UI components or routes were modified',
        priority: 'high',
        emoji: '🌐',
        quickOption: 'npm run feedback:browser -- --test-suite smoke --max-iterations 2'
      });
    }

    // Visual Comparison Loop recommendations
    if (this.changes.styles || this.changes.ui) {
      this.recommendations.push({
        loop: 'Visual Comparison',
        command: 'npm run feedback:visual',
        reason: 'Styles or UI components were modified',
        priority: 'medium',
        emoji: '📸',
        quickOption: 'npm run feedback:visual -- --threshold 0.5'
      });
    }

    // TDD Loop recommendations
    if (this.changes.tests) {
      this.recommendations.push({
        loop: 'Test-Driven Development',
        command: 'npm run feedback:tdd -- --test-file <path>',
        reason: 'Test files were modified',
        priority: 'low',
        emoji: '🔴',
        quickOption: 'Review your TDD cycle (RED → GREEN → REFACTOR)'
      });
    }

    // If significant changes, recommend full suite
    const significantChanges = Object.values(this.changes).filter(Boolean).length >= 3;
    if (significantChanges) {
      this.recommendations.push({
        loop: 'All Feedback Loops',
        command: 'npm run feedback:all',
        reason: 'Multiple types of changes detected',
        priority: 'high',
        emoji: '🔄',
        quickOption: 'npm run feedback:all -- --stop-on-failure'
      });
    }
  }

  display(options = {}) {
    const { compact = false, showQuick = true } = options;

    if (this.recommendations.length === 0) {
      if (!compact) {
        console.log('\n✨ No specific feedback loops recommended for these changes.\n');
      }
      return;
    }

    console.log('\n╭─────────────────────────────────────────────────────────────────╮');
    console.log('│  💡 Feedback Loop Recommendations                               │');
    console.log('╰─────────────────────────────────────────────────────────────────╯\n');

    const highPriority = this.recommendations.filter(r => r.priority === 'high');
    const mediumPriority = this.recommendations.filter(r => r.priority === 'medium');
    const lowPriority = this.recommendations.filter(r => r.priority === 'low');

    if (highPriority.length > 0) {
      console.log('🔴 High Priority:\n');
      highPriority.forEach(rec => this.displayRecommendation(rec, showQuick));
    }

    if (mediumPriority.length > 0 && !compact) {
      console.log('🟡 Medium Priority:\n');
      mediumPriority.forEach(rec => this.displayRecommendation(rec, showQuick));
    }

    if (lowPriority.length > 0 && !compact) {
      console.log('🟢 Low Priority:\n');
      lowPriority.forEach(rec => this.displayRecommendation(rec, showQuick));
    }

    console.log('───────────────────────────────────────────────────────────────────\n');
    console.log('💡 Tip: Run \'npm run feedback:list\' to see all available loops');
    console.log('📊 Tip: Run \'npm run feedback:log\' to see execution history\n');
  }

  displayRecommendation(rec, showQuick) {
    console.log(`${rec.emoji} ${rec.loop}`);
    console.log(`   Reason: ${rec.reason}`);
    console.log(`   Command: ${rec.command}`);
    if (showQuick && rec.quickOption) {
      console.log(`   Quick: ${rec.quickOption}`);
    }
    console.log('');
  }

  getQuickCommand() {
    // Return the highest priority recommendation's quick command
    const high = this.recommendations.find(r => r.priority === 'high');
    if (high && high.quickOption) {
      return high.quickOption;
    }
    return null;
  }

  run(options = {}) {
    const files = this.analyzeChanges();

    if (files.length === 0) {
      if (options.verbose) {
        console.log('\n✨ No changes detected.\n');
      }
      return { hasRecommendations: false };
    }

    this.generateRecommendations();

    if (options.display !== false) {
      this.display(options);
    }

    return {
      hasRecommendations: this.recommendations.length > 0,
      recommendations: this.recommendations,
      quickCommand: this.getQuickCommand()
    };
  }
}

// CLI Interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const options = {
    compact: args.includes('--compact'),
    showQuick: !args.includes('--no-quick'),
    verbose: args.includes('--verbose'),
    display: !args.includes('--silent')
  };

  if (args.includes('--help')) {
    console.log(`
Feedback Loop Reminder

Analyzes git changes and suggests relevant feedback loops to run.

Usage: node feedback-reminder.js [options]

Options:
  --compact      Show only high priority recommendations
  --no-quick     Don't show quick command options
  --verbose      Show additional information
  --silent       Don't display output (returns exit code only)
  --help         Show this help message

Exit Codes:
  0 - No recommendations
  1 - Has recommendations (suggestions available)

Examples:
  node feedback-reminder.js
  node feedback-reminder.js --compact
  node feedback-reminder.js --silent && echo "Has recommendations"
    `);
    process.exit(0);
  }

  const reminder = new FeedbackLoopReminder();
  const result = reminder.run(options);

  // Exit with code 1 if there are recommendations (can be used in scripts)
  process.exit(result.hasRecommendations ? 1 : 0);
}

export default FeedbackLoopReminder;
