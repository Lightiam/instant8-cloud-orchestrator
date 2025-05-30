
import React from 'react';
import { Button } from '@/components/ui/button';

interface DeploymentProgressHeaderProps {
  provider: string;
  progress: number;
  onCancel: () => void;
}

export function DeploymentProgressHeader({ provider, progress, onCancel }: DeploymentProgressHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-2xl font-bold">Deploying to {provider.toUpperCase()}</h3>
      {progress < 100 && (
        <Button variant="outline" onClick={onCancel}>
          Cancel Deployment
        </Button>
      )}
    </div>
  );
}
