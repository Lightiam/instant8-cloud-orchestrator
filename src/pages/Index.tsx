
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import DeploymentInterface from '@/components/DeploymentInterface';
import { ChangeLog } from '@/components/ChangeLog';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <DeploymentInterface />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ChangeLog />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
