import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Cloud, Plus, Settings, Zap, Database, CheckCircle, MessageSquare, Sparkles } from 'lucide-react';
import { RAGConfigPreview } from './RAGConfigPreview';
import { DeploymentProgress } from './DeploymentProgress';
import { ChatDeploymentInterface } from '../deployment/ChatDeploymentInterface';

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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Deployment Complete</h2>
          <Button onClick={handleNewDeployment} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Deployment
          </Button>
        </div>

        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Successfully Deployed to {selectedProvider.toUpperCase()}
            </CardTitle>
            <CardDescription>Your RAG application is now running and ready to use</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleNewDeployment}>
              Deploy Another Instance
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Deployments</CardTitle>
              <Cloud className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">13</div>
              <p className="text-xs text-muted-foreground">+1 from deployment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$974.92</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>
      </div>
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
          {/* Quick Stats */}
          <div className="grid gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Deployments</CardTitle>
                <Cloud className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.5%</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Deploy Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Templates</CardTitle>
              <CardDescription>Skip the chat with pre-configured setups</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start h-auto p-3 hover:border-orange-500 hover:bg-orange-50"
                onClick={() => handleQuickDeploy('aws')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                    <Cloud className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Web App - AWS</div>
                    <div className="text-xs text-gray-500">$127/mo</div>
                  </div>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start h-auto p-3 hover:border-blue-500 hover:bg-blue-50"
                onClick={() => handleQuickDeploy('azure')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                    <Database className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">ML Pipeline - Azure</div>
                    <div className="text-xs text-gray-500">$342/mo</div>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Deployments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Customer Support RAG</div>
                    <div className="text-xs text-gray-500">AWS • 2 hours ago</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">ML Training Environment</div>
                    <div className="text-xs text-gray-500">Azure • 1 day ago</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Banner */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Powered by Advanced AI</h3>
              <p className="text-gray-600">Our AI understands complex infrastructure requirements and automatically configures optimal deployments across multiple cloud providers.</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">Multi-Cloud</Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">Auto-Config</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
