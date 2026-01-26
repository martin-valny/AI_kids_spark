import { motion } from 'framer-motion';
import { Play, BarChart2, Layout, Video } from 'lucide-react';

interface UIScreenshotPlaceholderProps {
  section: 'lesson' | 'project' | 'dashboard' | 'editor';
  showLabels?: boolean;
  aspectRatio?: '16:9' | '4:3' | 'square';
}

/**
 * UIScreenshotPlaceholder - Wireframe placeholder for platform UI screenshots
 *
 * Shows intentional layout structure, not "under construction"
 */
export default function UIScreenshotPlaceholder({
  section,
  showLabels = true,
  aspectRatio = '16:9',
}: UIScreenshotPlaceholderProps) {
  const aspectRatios = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    'square': 'aspect-square',
  };

  const layouts = {
    lesson: {
      title: 'Lesson Interface',
      icon: Play,
      elements: (
        <>
          {/* Video player area */}
          <div
            className="rounded-xl border flex items-center justify-center"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.05)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              height: '60%',
            }}
          >
            <Play className="w-12 h-12" style={{ color: '#5eead4', opacity: 0.3 }} />
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <div
              className="h-1 rounded-full"
              style={{ backgroundColor: 'rgba(94, 234, 212, 0.2)' }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  backgroundColor: '#5eead4',
                  width: '35%',
                }}
              />
            </div>
            {showLabels && (
              <p className="text-xs mt-1" style={{ color: '#64748b' }}>
                Progress: 35%
              </p>
            )}
          </div>

          {/* Content area */}
          <div className="mt-4 space-y-2">
            <div className="h-4 rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', width: '80%' }} />
            <div className="h-4 rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', width: '60%' }} />
          </div>
        </>
      ),
    },
    project: {
      title: 'Project Editor',
      icon: Video,
      elements: (
        <div className="flex gap-3 h-full">
          {/* Toolbar */}
          <div
            className="rounded-xl border p-2 space-y-2"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.05)',
              width: '20%',
            }}
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-8 rounded"
                style={{ backgroundColor: 'rgba(196, 181, 253, 0.1)' }}
              />
            ))}
          </div>

          {/* Canvas area */}
          <div
            className="flex-1 rounded-xl border flex items-center justify-center"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.05)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
            }}
          >
            <Video className="w-16 h-16" style={{ color: '#c4b5fd', opacity: 0.3 }} />
          </div>
        </div>
      ),
    },
    dashboard: {
      title: 'Student Dashboard',
      icon: BarChart2,
      elements: (
        <>
          {/* Stats cards */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl border p-3"
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.05)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                }}
              >
                <div className="h-3 rounded mb-2" style={{ backgroundColor: 'rgba(94, 234, 212, 0.2)', width: '60%' }} />
                <div className="h-6 rounded" style={{ backgroundColor: 'rgba(94, 234, 212, 0.3)', width: '40%' }} />
              </div>
            ))}
          </div>

          {/* Recent projects list */}
          <div className="space-y-2">
            {showLabels && (
              <p className="text-xs mb-2" style={{ color: '#64748b' }}>
                Recent Projects
              </p>
            )}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-8 rounded flex items-center px-2 gap-2"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#fda4af' }} />
                <div className="h-2 rounded flex-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
              </div>
            ))}
          </div>
        </>
      ),
    },
    editor: {
      title: 'AI Video Editor',
      icon: Layout,
      elements: (
        <>
          {/* Timeline */}
          <div
            className="rounded-xl border p-2 mb-3"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.05)',
              height: '30%',
            }}
          >
            <div className="flex gap-1 h-full">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 rounded"
                  style={{
                    backgroundColor: i % 2 === 0 ? 'rgba(94, 234, 212, 0.2)' : 'rgba(196, 181, 253, 0.2)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Preview + Controls */}
          <div className="flex gap-3 flex-1">
            <div
              className="flex-1 rounded-xl border flex items-center justify-center"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.05)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              <Layout className="w-12 h-12" style={{ color: '#5eead4', opacity: 0.3 }} />
            </div>
          </div>
        </>
      ),
    },
  };

  const layout = layouts[section];
  const Icon = layout.icon;

  return (
    <motion.div
      className={`w-full ${aspectRatios[aspectRatio]} rounded-2xl border p-6`}
      style={{
        borderColor: 'rgba(255, 255, 255, 0.05)',
        backgroundColor: '#1c1c24',
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Header */}
      {showLabels && (
        <div className="flex items-center gap-3 mb-4 pb-3 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
          <Icon className="w-5 h-5" style={{ color: '#5eead4' }} />
          <h3 className="text-sm font-medium" style={{ color: '#9898a2' }}>
            {layout.title}
          </h3>
        </div>
      )}

      {/* Layout elements */}
      <div className="h-full">{layout.elements}</div>
    </motion.div>
  );
}
