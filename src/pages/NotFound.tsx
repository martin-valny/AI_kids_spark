
import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon } from "lucide-react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="mb-6 relative inline-block">
            <div className="text-8xl font-extrabold text-kids-blue">404</div>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-kids-yellow rounded-full animate-bounce-gentle"></div>
            <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-kids-purple rounded-full animate-float"></div>
          </div>
          <h1 className="text-2xl font-bold mb-4">Oops! Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            The page you're looking for seems to have wandered off on its own adventure.
          </p>
          <Link to="/" className="kid-button primary inline-flex items-center">
            <HomeIcon className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
