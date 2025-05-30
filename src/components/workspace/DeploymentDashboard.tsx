
import React, { useState } from 'react';
import { RAGConfigPreview } from './RAGConfigPreview';
import { DeploymentProgress } from './DeploymentProgress';
import { IaCCodePreview } from '../deployment/IaCCodePreview';
import { FeaturesBanner } from './FeaturesBanner';
import { CompletedDeployment } from './CompletedDeployment';
import { DeploymentConfig } from '@/services/deploymentService';
import { hasValidCredentials } from '@/utils/environmentUtils';
import { DeploymentDashboardHeader } from './DeploymentDashboardHeader';
import { DeploymentDashboardContent } from './DeploymentDashboardContent';

type DeploymentStep = 'chat' | 'iac-preview' | 'preview' | 'deploying' | 'completed';

export function DeploymentDashboard() {
  const [currentStep, setCurrentStep] = useState<DeploymentStep>('chat');
  const [credentialsValid, setCredentialsValid] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [config, setConfig] = useState<DeploymentConfig>({
    os: 'Ubuntu 22.04 LTS',
    cpu: '8 cores',
    ram: '16GB',
    storage: '100GB SSD',
    region: 'US-East-1',
    type: 'web-application'
  });

  const checkCredentials = () => {
    const isValid = hasValidCredentials();
    console.log('Credential check result:', isValid);
    setCredentialsValid(isValid);
    return isValid;
  };

  const handleConfigGenerated = (newConfig: DeploymentConfig) => {
    console.log('AI generated configuration:', newConfig);
    
    // Check credentials before proceeding
    if (!checkCredentials()) {
      console.log('No valid credentials found, staying on chat');
      return;
    }
    
    setConfig(newConfig);
    setCurrentStep('iac-preview');
  };

  const handleQuickDeploy = (provider: string) => {
    if (!checkCredentials()) {
      console.log('Quick deploy blocked - no credentials');
      return;
    }
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

  // Check credentials on mount and when returning to this component
  React.useEffect(() => {
    console.log('DeploymentDashboard mounted, checking credentials...');
    checkCredentials();
  }, []);

  // Listen for storage changes and custom events
  React.useEffect(() => {
    const handleStorageChange = () => {
      console.log('Storage change detected, rechecking credentials...');
      checkCredentials();
    };

    const handleCredentialsUpdate = () => {
      console.log('Credentials update event detected, rechecking...');
      setTimeout(() => {
        checkCredentials();
      }, 100); // Small delay to ensure localStorage is updated
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('credentialsUpdated', handleCredentialsUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('credentialsUpdated', handleCredentialsUpdate);
    };
  }, []);

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
        credentialsValid={credentialsValid}
        onNewInfrastructure={handleNewInfrastructure}
      />

      <DeploymentDashboardContent
        credentialsValid={credentialsValid}
        onConfigGenerated={handleConfigGenerated}
        onQuickDeploy={handleQuickDeploy}
      />

      <FeaturesBanner />
    </div>
  );
}
