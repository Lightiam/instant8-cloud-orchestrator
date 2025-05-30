
import React from 'react';
import { Button } from '@/components/ui/button';

interface DeploymentProgressHeaderProps {
  provider: string;
  progress: number;
  onCancel: () => void;
}

export function DeploymentProgressHeader({ provider, progress, onCancel }: DeploymentProgressHeaderProps) {
  const getProviderName = (provider: string) => {
    switch (provider.toLowerCase()) {
      case 'aws': return 'AWS';
      case 'azure': return 'Microsoft Azure';
      case 'gcp': return 'Google Cloud Platform';
      default: return provider;
    }
  };

  return (
    <div className="flex items-center justify-between">
      <h3 className="text-2xl font-bold">Work in Progress - {getProviderName(provider)}</h3>
      {progress < 100 && (
        <Button variant="outline" onClick={onCancel}>
          Cancel Deployment
        </Button>
      )}
    </div>
  );
}
