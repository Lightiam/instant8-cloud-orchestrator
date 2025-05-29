
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Cloud, Plus, Settings, Zap, Database, CheckCircle, Play, Sparkles, Clock } from 'lucide-react';
import { RAGConfigPreview } from './RAGConfigPreview';
import { DeploymentProgress } from './DeploymentProgress';

type DeploymentStep = 'configure' | 'preview' | 'deploying' | 'completed';

export function DeploymentDashboard() {
  const [currentStep, setCurrentStep] = useState<DeploymentStep>('configure');
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [prompt, setPrompt] = useState("Deploy a high-performance Ubuntu 22.04 server with 16GB RAM, GPU support for ML workloads, and Docker pre-installed across AWS and Azure in US-East regions");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [config, setConfig] = useState({
    os: 'Ubuntu 22.04 LTS',
    cpu: '8 cores',
    ram: '16GB',
    storage: '100GB SSD',
    region: 'US-East-1'
  });

  const handleAIDeploy = () => {
    console.log('Starting AI analysis of prompt:', prompt);
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setCurrentStep('preview');
    }, 2000);
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
    setCurrentStep('configure');
  };

  const handleDeploymentComplete = () => {
    setCurrentStep('completed');
  };

  const handleNewDeployment = () => {
    setCurrentStep('configure');
    setSelectedProvider('');
    setPrompt("Deploy a high-performance Ubuntu 22.04 server with 16GB RAM, GPU support for ML workloads, and Docker pre-installed across AWS and Azure in US-East regions");
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
        <h2 className="text-3xl font-bold tracking-tight">AI-Powered Deployment</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Deployment
        </Button>
      </div>

      {/* AI Deployment Prompt - Main Feature */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Smart Deployment Prompt</CardTitle>
              <CardDescription>Describe your infrastructure needs in plain English and let AI handle the rest</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your infrastructure needs in plain English... For example: 'Deploy a scalable web application with load balancer, auto-scaling, and database backup to AWS'"
            className="min-h-32 text-lg border-gray-200 focus:border-blue-500 resize-none"
          />
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">AI-Powered</Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Multi-Cloud</Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">RAG Ready</Badge>
            </div>
            <Button 
              onClick={handleAIDeploy}
              disabled={isAnalyzing || !prompt.trim()}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8"
            >
              {isAnalyzing ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Deploy with AI
                  <Sparkles className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
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

      {/* Quick Deploy Options */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Deploy Templates</CardTitle>
          <CardDescription>Pre-configured RAG deployments for common use cases</CardDescription>
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
              <span className="font-medium">AWS Template</span>
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
              <span className="font-medium">Azure Template</span>
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
              <span className="font-medium">GCP Template</span>
              <span className="text-xs text-gray-500">Starting at $134/mo</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Deployments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Deployments</CardTitle>
          <CardDescription>Your latest AI-generated deployments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <div className="font-medium">Customer Support RAG</div>
                  <div className="text-sm text-gray-500">AWS EC2 • us-east-1 • AI Generated</div>
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
                  <div className="text-sm text-gray-500">Azure VM • eastus • AI Generated</div>
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
