
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { SystemConfigurationCard } from './SystemConfigurationCard';
import { DeploymentDetailsCard } from './DeploymentDetailsCard';
import { SecurityNetworkCard } from './SecurityNetworkCard';
import { CostEstimationCard } from './CostEstimationCard';
import { CloudProviderSelection } from './CloudProviderSelection';

interface RAGConfigPreviewProps {
  config: any;
  onDeploy: (provider: string) => void;
  onEdit: () => void;
}

export function RAGConfigPreview({ config, onDeploy, onEdit }: RAGConfigPreviewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Deployment Configuration Preview</h3>
        <Button variant="outline" onClick={onEdit}>
          <Settings className="h-4 w-4 mr-2" />
          Edit Configuration
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <SystemConfigurationCard config={config} />
        <DeploymentDetailsCard config={config} />
        <SecurityNetworkCard />
        <CostEstimationCard config={config} />
      </div>

      <CloudProviderSelection onDeploy={onDeploy} />
    </div>
  );
}
