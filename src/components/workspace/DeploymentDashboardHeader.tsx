
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface DeploymentDashboardHeaderProps {
  credentialsValid: boolean;
  onNewInfrastructure: () => void;
}

export function DeploymentDashboardHeader({ credentialsValid, onNewInfrastructure }: DeploymentDashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Infrastructure as Code Generator</h2>
        <p className="text-gray-600 mt-2">
          Describe your infrastructure needs and get ready-to-deploy IaC code
        </p>
      </div>
      <Button 
        className="flex items-center gap-2"
        onClick={onNewInfrastructure}
      >
        <Plus className="h-4 w-4" />
        New Infrastructure
      </Button>
    </div>
  );
}
