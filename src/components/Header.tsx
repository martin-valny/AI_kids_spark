
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
        ? 'glass-card-strong py-3 mx-4 mt-4 rounded-glass'
        : 'bg-white/85 backdrop-blur-glass py-5'
        } border border-white/10 px-4 md:px-6`}
    >
      <div className="container-max flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 z-10">
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <span className="text-white font-bold text-lg">AI</span>
          </div>
          <span className="font-extrabold text-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
            AI Spark
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/lessons" className="font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-300 relative group">
            Lessons
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/projects" className="font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-300 relative group">
            Projects
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/games" className="font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-300 relative group">
            Activities
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/resources" className="font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-300 relative group">
            Resources
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <GradientButton variant="primary" size="default">
            Get Started
          </GradientButton>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-10 w-10 bg-white/90 rounded-lg flex items-center justify-center border border-gray-200/60 shadow-sm">
                <Menu className="h-5 w-5 text-gray-700" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white/98 backdrop-blur-lg border border-gray-200/60 p-2 shadow-lg rounded-xl">
              <div className="flex flex-col space-y-1">
                <DropdownMenuItem asChild className="rounded-lg px-3 py-2.5 hover:bg-indigo-50 cursor-pointer">
                  <Link to="/lessons" className="text-gray-700 hover:text-indigo-600">Lessons</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg px-3 py-2.5 hover:bg-indigo-50 cursor-pointer">
                  <Link to="/projects" className="text-gray-700 hover:text-indigo-600">Projects</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg px-3 py-2.5 hover:bg-indigo-50 cursor-pointer">
                  <Link to="/games" className="text-gray-700 hover:text-indigo-600">Activities</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg px-3 py-2.5 hover:bg-indigo-50 cursor-pointer">
                  <Link to="/resources" className="text-gray-700 hover:text-indigo-600">Resources</Link>
                </DropdownMenuItem>
                <div className="pt-2 border-t border-gray-100 mt-1">
                  <GradientButton variant="primary" size="default" className="w-full">
                    Get Started
                  </GradientButton>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
