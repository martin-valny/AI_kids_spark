import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LessonLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  backLink?: string;
  backLabel?: string;
  className?: string;
  showPattern?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  iconBgColor?: string;
  iconColor?: string;
}

export const LessonLayout: React.FC<LessonLayoutProps> = ({
  children,
  title,
  subtitle,
  backLink = '/lessons',
  backLabel = 'Back to Lessons',
  className,
  showPattern = true,
  icon,
  iconBgColor,
  iconColor,
}) => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />

      <main className={cn("flex-1 relative", className)}>
        {/* Background Pattern */}
        {showPattern && (
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Gradient removed to show Matrix background */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-kids-blue/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-kids-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          </div>
        )}

        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
          {/* Navigation */}
          <div className="mb-8">
            <Link
              to={backLink}
              className="inline-flex items-center text-kids-blue hover:text-kids-purple font-medium transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center mr-2 group-hover:bg-white transition-colors shadow-sm">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </div>
              {backLabel}
            </Link>
          </div>

          {/* Header Section */}
          {(title || subtitle) && (
            <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
              {title && (
                <div className="flex flex-col items-center gap-4 mb-4">
                  {icon && (
                    <div className={cn("p-3 rounded-xl shadow-sm", iconBgColor || "bg-kids-blue")}>
                      {React.createElement(icon, { className: cn("w-8 h-8", iconColor || "text-white") })}
                    </div>
                  )}
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-kids-blue via-kids-purple to-kids-pink bg-clip-text text-transparent leading-tight pb-2">
                    {title}
                  </h1>
                </div>
              )}
              {subtitle && (
                <p className="text-xl text-gray-600 leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Main Content */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
