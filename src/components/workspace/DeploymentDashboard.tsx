import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare } from 'lucide-react';
import { RAGConfigPreview } from './RAGConfigPreview';
import { DeploymentProgress } from './DeploymentProgress';
import { ChatDeploymentInterface } from '../deployment/ChatDeploymentInterface';
import { IaCCodePreview } from '../deployment/IaCCodePreview';
import { CredentialsSetup } from '../deployment/CredentialsSetup';
import { DeploymentStats } from './DeploymentStats';
import { QuickTemplates } from './QuickTemplates';
import { RecentActivity } from './RecentActivity';
import { FeaturesBanner } from './FeaturesBanner';
import { CompletedDeployment } from './CompletedDeployment';
import { DeploymentConfig } from '@/services/deploymentService';

type DeploymentStep = 'credentials' | 'chat' | 'iac-preview' | 'preview' | 'deploying' | 'completed';

export function DeploymentDashboard() {
  const [currentStep, setCurrentStep] = useState<DeploymentStep>('credentials');
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

  const handleCredentialsSet = (isValid: boolean) => {
    setCredentialsValid(isValid);
    if (isValid && currentStep === 'credentials') {
      setCurrentStep('chat');
    }
  };

  const handleConfigGenerated = (newConfig: DeploymentConfig) => {
    console.log('AI generated configuration:', newConfig);
    setConfig(newConfig);
    setCurrentStep('iac-preview');
  };

  const handleQuickDeploy = (provider: string) => {
    if (!credentialsValid) {
      setCurrentStep('credentials');
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Infrastructure as Code Generator</h2>
          <p className="text-gray-600 mt-2">
            {credentialsValid 
              ? "Describe your infrastructure needs and get ready-to-deploy IaC code"
              : "Set up your credentials to start generating Infrastructure as Code"
            }
          </p>
        </div>
        <Button 
          className="flex items-center gap-2"
          onClick={() => setCurrentStep('chat')}
          disabled={!credentialsValid}
        >
          <Plus className="h-4 w-4" />
          New Infrastructure
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Credentials Setup - Always show at top */}
          <CredentialsSetup onCredentialsSet={handleCredentialsSet} />
          
          {/* Chat Interface - Show when credentials are valid or user is in chat step */}
          {(credentialsValid || currentStep === 'chat') && (
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">AI Infrastructure Code Generator</CardTitle>
                    <CardDescription>
                      {credentialsValid 
                        ? "Describe your infrastructure needs and get Infrastructure as Code"
                        : "Configure credentials above to enable IaC generation"
                      }
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ChatDeploymentInterface 
                  onConfigGenerated={handleConfigGenerated}
                  credentialsValid={credentialsValid}
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <DeploymentStats />
          <QuickTemplates onQuickDeploy={handleQuickDeploy} />
          <RecentActivity />
        </div>
      </div>

      <FeaturesBanner />
    </div>
  );
}
