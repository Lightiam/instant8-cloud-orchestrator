
import React, { useState, useEffect } from 'react';
import { DeploymentProgressHeader } from './DeploymentProgressHeader';
import { DeploymentProgressOverview } from './DeploymentProgressOverview';
import { DeploymentStepsList } from './DeploymentStepsList';
import { DeploymentResult } from './DeploymentResult';

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

  return (
    <div className="space-y-6">
      <DeploymentProgressHeader provider={provider} progress={progress} onCancel={onCancel} />
      <DeploymentProgressOverview progress={progress} />
      <DeploymentStepsList steps={steps} />
      <DeploymentResult deploymentUrl={deploymentUrl} progress={progress} />
    </div>
  );
}
