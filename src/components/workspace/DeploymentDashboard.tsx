
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare } from 'lucide-react';
import { RAGConfigPreview } from './RAGConfigPreview';
import { DeploymentProgress } from './DeploymentProgress';
import { ChatDeploymentInterface } from '../deployment/ChatDeploymentInterface';
import { DeploymentStats } from './DeploymentStats';
import { QuickTemplates } from './QuickTemplates';
import { RecentActivity } from './RecentActivity';
import { FeaturesBanner } from './FeaturesBanner';
import { CompletedDeployment } from './CompletedDeployment';

type DeploymentStep = 'chat' | 'preview' | 'deploying' | 'completed';

export function DeploymentDashboard() {
  const [currentStep, setCurrentStep] = useState<DeploymentStep>('chat');
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [config, setConfig] = useState({
    os: 'Ubuntu 22.04 LTS',
    cpu: '8 cores',
    ram: '16GB',
    storage: '100GB SSD',
    region: 'US-East-1'
  });

  const handleConfigGenerated = (newConfig: any) => {
    console.log('AI generated configuration:', newConfig);
    setConfig(newConfig);
    setCurrentStep('preview');
  };

  const handleQuickDeploy = (provider: string) => {
    console.log(`Quick deploying to ${provider}`);
    setSelectedProvider(provider);
    setCurrentStep('preview');
  };

  const handleDeploy = (provider: string) => {
    console.log(`Starting deployment to ${provider}`);
    setSelectedProvider(provider);
    setCurrentStep('deploying');
  };

  const handleEditConfig = () => {
    setCurrentStep('chat');
  };

  const handleDeploymentComplete = () => {
    setCurrentStep('completed');
  };

  const handleNewDeployment = () => {
    setCurrentStep('chat');
    setSelectedProvider('');
  };

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
        onCancel={() => setCurrentStep('preview')}
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
          <h2 className="text-3xl font-bold tracking-tight">AI Deployment Assistant</h2>
          <p className="text-gray-600 mt-2">Chat with AI to configure and deploy your infrastructure</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">AI Deployment Chat</CardTitle>
                  <CardDescription>Describe your needs in natural language and get instant infrastructure recommendations</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ChatDeploymentInterface onConfigGenerated={handleConfigGenerated} />
            </CardContent>
          </Card>
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
