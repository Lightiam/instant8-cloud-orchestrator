
import React, { useState } from 'react';
import { RAGConfigPreview } from './RAGConfigPreview';
import { DeploymentProgress } from './DeploymentProgress';
import { IaCCodePreview } from '../deployment/IaCCodePreview';
import { FeaturesBanner } from './FeaturesBanner';
import { CompletedDeployment } from './CompletedDeployment';
import { DeploymentConfig } from '@/services/deploymentService';
import { DeploymentDashboardHeader } from './DeploymentDashboardHeader';
import { DeploymentDashboardContent } from './DeploymentDashboardContent';

type DeploymentStep = 'chat' | 'iac-preview' | 'preview' | 'deploying' | 'completed';

export function DeploymentDashboard() {
  const [currentStep, setCurrentStep] = useState<DeploymentStep>('chat');
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [config, setConfig] = useState<DeploymentConfig>({
    os: 'Ubuntu 22.04 LTS',
    cpu: '8 cores',
    ram: '16GB',
    storage: '100GB SSD',
    region: 'US-East-1',
    type: 'web-application'
  });

  const handleConfigGenerated = (newConfig: DeploymentConfig) => {
    console.log('AI generated configuration:', newConfig);
    setConfig(newConfig);
    setCurrentStep('iac-preview');
  };

  const handleQuickDeploy = (provider: string) => {
    console.log(`Quick deploying to ${provider}`);
    setSelectedProvider(provider);
    setCurrentStep('iac-preview');
  };

  const handleDeploy = (provider: string) => {
    console.log(`Starting deployment to ${provider}`);
    setSelectedProvider(provider);
    setCurrentStep('deploying');
  };

  const handleEditConfig = () => {
    setCurrentStep('chat');
  };

  const handleBackToChat = () => {
    setCurrentStep('chat');
  };

  const handleDeploymentComplete = () => {
    setCurrentStep('completed');
  };

  const handleNewDeployment = () => {
    setCurrentStep('chat');
    setSelectedProvider('');
  };

  const handleNewInfrastructure = () => {
    setCurrentStep('chat');
  };

  if (currentStep === 'iac-preview') {
    return (
      <IaCCodePreview 
        config={config}
        onDeploy={handleDeploy}
        onBack={handleBackToChat}
      />
    );
  }

  if (currentStep === 'preview') {
    return (
      <RAGConfigPreview 
        config={config}
        onDeploy={handleDeploy}
        onEdit={handleEditConfig}
      />
    );
  }

  if (currentStep === 'deploying') {
    return (
      <DeploymentProgress 
        provider={selectedProvider}
        onComplete={handleDeploymentComplete}
        onCancel={() => setCurrentStep('iac-preview')}
      />
    );
  }

  if (currentStep === 'completed') {
    return (
      <CompletedDeployment 
        selectedProvider={selectedProvider}
        onNewDeployment={handleNewDeployment}
      />
    );
  }

  return (
    <div className="space-y-6">
      <DeploymentDashboardHeader 
        credentialsValid={true}
        onNewInfrastructure={handleNewInfrastructure}
      />

      <DeploymentDashboardContent
        credentialsValid={true}
        onConfigGenerated={handleConfigGenerated}
        onQuickDeploy={handleQuickDeploy}
      />

      <FeaturesBanner />
    </div>
  );
}
