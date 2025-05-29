
import React, { useState } from 'react';
import { DeploymentPrompt } from './deployment/DeploymentPrompt';
import { ParsedConfiguration } from './deployment/ParsedConfiguration';
import { CloudProviderCards } from './deployment/CloudProviderCards';
import { CostInsights } from './deployment/CostInsights';
import { ActiveDeployments } from './deployment/ActiveDeployments';

const DeploymentInterface = () => {
  const [prompt, setPrompt] = useState("Deploy a high-performance Ubuntu 22.04 server with 16GB RAM, GPU support for ML workloads, and Docker pre-installed across AWS and Azure in US-East regions");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(true);

  const handleDeploy = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-primary mb-6">
            Smart Deployment Interface
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Describe your infrastructure requirements in natural language
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Deployment Area */}
          <div className="lg:col-span-2 space-y-6">
            <DeploymentPrompt 
              prompt={prompt}
              onPromptChange={setPrompt}
              onDeploy={handleDeploy}
              isAnalyzing={isAnalyzing}
            />

            {showResults && <ParsedConfiguration />}
            {showResults && <CloudProviderCards />}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <CostInsights />
            <ActiveDeployments />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeploymentInterface;
