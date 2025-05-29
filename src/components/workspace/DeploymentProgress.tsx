
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ExternalLink,
  Copy,
  Terminal
} from 'lucide-react';
import { toast } from 'sonner';

interface DeploymentStep {
  id: string;
  title: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  duration?: string;
  details?: string;
}

interface DeploymentProgressProps {
  provider: string;
  onComplete: () => void;
  onCancel: () => void;
}

export function DeploymentProgress({ provider, onComplete, onCancel }: DeploymentProgressProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [deploymentUrl, setDeploymentUrl] = useState('');
  const [steps, setSteps] = useState<DeploymentStep[]>([
    { id: '1', title: 'Validating configuration', status: 'pending' },
    { id: '2', title: 'Provisioning cloud resources', status: 'pending' },
    { id: '3', title: 'Setting up virtual machine', status: 'pending' },
    { id: '4', title: 'Installing Docker and dependencies', status: 'pending' },
    { id: '5', title: 'Deploying RAG application', status: 'pending' },
    { id: '6', title: 'Configuring vector database', status: 'pending' },
    { id: '7', title: 'Running health checks', status: 'pending' },
    { id: '8', title: 'Deployment complete', status: 'pending' }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        const stepIndex = Math.floor(newProgress / 12.5);
        
        if (stepIndex < steps.length && stepIndex !== currentStep) {
          setCurrentStep(stepIndex);
          setSteps(prevSteps => 
            prevSteps.map((step, index) => ({
              ...step,
              status: index < stepIndex ? 'completed' : 
                     index === stepIndex ? 'running' : 'pending'
            }))
          );
        }

        if (newProgress >= 100) {
          clearInterval(timer);
          setSteps(prevSteps => 
            prevSteps.map(step => ({ ...step, status: 'completed' }))
          );
          setDeploymentUrl(`https://rag-app-${provider}-${Math.random().toString(36).substr(2, 9)}.instant8.cloud`);
          setTimeout(() => onComplete(), 1000);
          return 100;
        }
        
        return newProgress;
      });
    }, 800);

    return () => clearInterval(timer);
  }, [currentStep, steps.length, onComplete, provider]);

  const getStatusIcon = (status: DeploymentStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'running':
        return <Clock className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <div className="h-4 w-4 rounded-full border-2 border-gray-300" />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('URL copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Deploying to {provider.toUpperCase()}</h3>
        {progress < 100 && (
          <Button variant="outline" onClick={onCancel}>
            Cancel Deployment
          </Button>
        )}
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Deployment Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
          
          <div className="text-sm text-gray-600">
            Estimated time remaining: {progress < 100 ? `${Math.ceil((100 - progress) * 0.3)} minutes` : 'Complete'}
          </div>
        </CardContent>
      </Card>

      {/* Deployment Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Deployment Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                {getStatusIcon(step.status)}
                <div className="flex-1">
                  <div className="font-medium">{step.title}</div>
                  {step.status === 'running' && (
                    <div className="text-sm text-blue-600">In progress...</div>
                  )}
                  {step.status === 'completed' && (
                    <div className="text-sm text-green-600">✓ Completed</div>
                  )}
                </div>
                {step.status === 'completed' && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Done
                  </Badge>
                )}
                {step.status === 'running' && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Running
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Deployment Result */}
      {progress === 100 && deploymentUrl && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">🎉 Deployment Successful!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="font-medium text-green-800 mb-2">Your RAG application is now live:</div>
              <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border">
                <code className="flex-1 text-sm">{deploymentUrl}</code>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => copyToClipboard(deploymentUrl)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm"
                  onClick={() => window.open(deploymentUrl, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                  Open
                </Button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium text-green-800">API Endpoint:</div>
                <code className="text-gray-600">{deploymentUrl}/api/chat</code>
              </div>
              <div>
                <div className="font-medium text-green-800">Admin Panel:</div>
                <code className="text-gray-600">{deploymentUrl}/admin</code>
              </div>
            </div>

            <div className="pt-4 border-t border-green-200">
              <div className="font-medium text-green-800 mb-2">Next Steps:</div>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• Upload your documents to the RAG system</li>
                <li>• Configure your knowledge base settings</li>
                <li>• Test the chat interface</li>
                <li>• Monitor performance in the dashboard</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
