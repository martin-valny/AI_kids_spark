import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SignInForm from '@/components/auth/SignInForm';

const SignIn: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <SignInForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
