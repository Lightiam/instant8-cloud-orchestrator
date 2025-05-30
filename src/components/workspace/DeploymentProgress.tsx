
import React, { useState, useEffect } from 'react';
import { DeploymentProgressHeader } from './DeploymentProgressHeader';
import { DeploymentProgressOverview } from './DeploymentProgressOverview';
import { DeploymentStepsList } from './DeploymentStepsList';
import { DeploymentResult } from './DeploymentResult';
import { deploymentService, DeploymentConfig } from '@/services/deploymentService';
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
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentLogs, setDeploymentLogs] = useState<string[]>([]);
  const [steps, setSteps] = useState<DeploymentStep[]>([
    { id: '1', title: 'Validating credentials', status: 'pending' },
    { id: '2', title: 'Connecting to cloud provider', status: 'pending' },
    { id: '3', title: 'Provisioning cloud resources', status: 'pending' },
    { id: '4', title: 'Setting up virtual machine', status: 'pending' },
    { id: '5', title: 'Installing dependencies', status: 'pending' },
    { id: '6', title: 'Deploying application', status: 'pending' },
    { id: '7', title: 'Configuring networking', status: 'pending' },
    { id: '8', title: 'Running health checks', status: 'pending' }
  ]);

  useEffect(() => {
    if (!isDeploying) {
      startRealDeployment();
    }
  }, []);

  const startRealDeployment = async () => {
    console.log('🚀 Starting REAL deployment process...');
    setIsDeploying(true);
    
    try {
      // Create deployment configuration
      const config: DeploymentConfig = {
        os: 'Ubuntu 22.04 LTS',
        cpu: '4 cores',
        ram: '8GB',
        storage: '50GB SSD',
        region: 'us-east-1',
        type: 'web-application'
      };

      // Start the real deployment
      console.log(`📋 Deploying to ${provider} with config:`, config);
      toast.info(`Starting deployment to ${provider.toUpperCase()}...`);
      
      // Update steps as deployment progresses
      const deploymentPromise = deploymentService.deployToProvider(config, provider);
      
      // Simulate step progression while deployment runs
      const stepTimer = setInterval(() => {
        setProgress((prev) => {
          const newProgress = Math.min(prev + 3, 95); // Don't go to 100 until deployment completes
          const stepIndex = Math.floor(newProgress / 12);
          
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
          
          return newProgress;
        });
      }, 1000);

      // Wait for actual deployment to complete
      const result = await deploymentPromise;
      clearInterval(stepTimer);
      
      if (result.success) {
        console.log('✅ Real deployment succeeded:', result);
        setDeploymentLogs(result.logs);
        setDeploymentUrl(result.url || '');
        setProgress(100);
        setSteps(prevSteps => 
          prevSteps.map(step => ({ ...step, status: 'completed' }))
        );
        toast.success(`Successfully deployed to ${provider.toUpperCase()}!`);
        setTimeout(() => onComplete(), 1000);
      } else {
        console.error('❌ Real deployment failed:', result.error);
        setDeploymentLogs(result.logs);
        setSteps(prevSteps => 
          prevSteps.map((step, index) => ({
            ...step,
            status: index <= currentStep ? 'error' : 'pending'
          }))
        );
        toast.error(`Deployment to ${provider.toUpperCase()} failed: ${result.error}`);
      }
    } catch (error) {
      console.error('❌ Deployment error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Deployment failed: ${errorMsg}`);
      setSteps(prevSteps => 
        prevSteps.map((step, index) => ({
          ...step,
          status: index <= currentStep ? 'error' : 'pending'
        }))
      );
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="space-y-6">
      <DeploymentProgressHeader provider={provider} progress={progress} onCancel={onCancel} />
      <DeploymentProgressOverview progress={progress} />
      <DeploymentStepsList steps={steps} />
      
      {deploymentLogs.length > 0 && (
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Deployment Logs:</h4>
          <pre className="text-sm overflow-x-auto">
            {deploymentLogs.join('\n')}
          </pre>
        </div>
      )}
      
      <DeploymentResult deploymentUrl={deploymentUrl} progress={progress} />
    </div>
  );
}
