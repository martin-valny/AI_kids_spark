
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
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-kids-blue to-kids-purple flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">AI</span>
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-kids-yellow animate-bounce-gentle shadow-md"></div>
          </div>
          <span className="font-extrabold text-2xl heading-primary">
            AI Kids Spark
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/lessons" className="font-medium text-gray-800 hover:text-kids-blue transition-colors duration-300 relative group">
            Lessons
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-kids-blue transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/projects" className="font-medium text-gray-800 hover:text-kids-blue transition-colors duration-300 relative group">
            Projects
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-kids-blue transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/games" className="font-medium text-gray-800 hover:text-kids-blue transition-colors duration-300 relative group">
            Games
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-kids-blue transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/resources" className="font-medium text-gray-800 hover:text-kids-blue transition-colors duration-300 relative group">
            Resources
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-kids-blue transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/design-pilot" className="font-medium text-kids-purple hover:text-kids-blue transition-colors duration-300 relative group">
            Design Pilot
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-kids-blue transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <GradientButton variant="primary" size="default">
            Get Started
          </GradientButton>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-10 w-10 glass-card flex items-center justify-center">
                <Menu className="h-6 w-6" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60 glass-card-strong border-white/40 p-3">
              <div className="flex flex-col space-y-2">
                <DropdownMenuItem asChild className="rounded-xl px-3 py-2 hover:bg-white/20">
                  <Link to="/lessons">Lessons</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl px-3 py-2 hover:bg-white/20">
                  <Link to="/projects">Projects</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl px-3 py-2 hover:bg-white/20">
                  <Link to="/games">Games</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl px-3 py-2 hover:bg-white/20">
                  <Link to="/resources">Resources</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl px-3 py-2 hover:bg-white/20">
                  <Link to="/design-pilot" className="text-kids-purple">Design Pilot</Link>
                </DropdownMenuItem>
                <GradientButton variant="primary" size="default" className="mt-2">
                  Get Started
                </GradientButton>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
