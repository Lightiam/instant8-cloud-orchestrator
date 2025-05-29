import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cloud, Plus, Settings, Zap, Database, CheckCircle } from 'lucide-react';
import { RAGConfigPreview } from './RAGConfigPreview';
import { DeploymentProgress } from './DeploymentProgress';

type DeploymentStep = 'configure' | 'preview' | 'deploying' | 'completed';

export function DeploymentDashboard() {
  const [currentStep, setCurrentStep] = useState<DeploymentStep>('configure');
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [config, setConfig] = useState({
    os: 'Ubuntu 22.04 LTS',
    cpu: '8 cores',
    ram: '16GB',
    storage: '100GB SSD',
    region: 'US-East-1'
  });

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
    setCurrentStep('configure');
  };

  const handleDeploymentComplete = () => {
    setCurrentStep('completed');
  };

  const handleNewDeployment = () => {
    setCurrentStep('configure');
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
        <h2 className="text-3xl font-bold tracking-tight">Deploy</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Deployment
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$847.92</div>
            <p className="text-xs text-muted-foreground">This month</p>
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RAG Instances</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Active RAG systems</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Deploy RAG Application</CardTitle>
          <CardDescription>Deploy your RAG system to multiple cloud providers with one click</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button 
              variant="outline" 
              className="h-24 flex flex-col gap-2 hover:border-orange-500 hover:bg-orange-50 transition-colors"
              onClick={() => handleQuickDeploy('aws')}
            >
              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                <Cloud className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium">AWS</span>
              <span className="text-xs text-gray-500">Starting at $127/mo</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col gap-2 hover:border-blue-500 hover:bg-blue-50 transition-colors"
              onClick={() => handleQuickDeploy('azure')}
            >
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                <Cloud className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium">Azure</span>
              <span className="text-xs text-gray-500">Starting at $142/mo</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col gap-2 hover:border-red-500 hover:bg-red-50 transition-colors"
              onClick={() => handleQuickDeploy('gcp')}
            >
              <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                <Cloud className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium">Google Cloud</span>
              <span className="text-xs text-gray-500">Starting at $134/mo</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Deployments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Deployments</CardTitle>
          <CardDescription>Your latest RAG system deployments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <div className="font-medium">Customer Support RAG</div>
                  <div className="text-sm text-gray-500">AWS EC2 • us-east-1</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">Running</div>
                <div className="text-xs text-gray-500">2 hours ago</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <div className="font-medium">Documentation RAG</div>
                  <div className="text-sm text-gray-500">Azure VM • eastus</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">Deploying</div>
                <div className="text-xs text-gray-500">5 minutes ago</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
