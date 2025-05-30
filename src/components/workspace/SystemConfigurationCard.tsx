
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cpu } from 'lucide-react';
import { DeploymentConfig } from '@/services/deploymentService';

interface SystemConfigurationCardProps {
  config: DeploymentConfig;
}

export function SystemConfigurationCard({ config }: SystemConfigurationCardProps) {
  const getSoftwareBadges = () => {
    if (config.type === 'machine-learning') {
      return (
        <>
          <Badge>Docker</Badge>
          <Badge>CUDA</Badge>
          <Badge>Python 3.11</Badge>
          <Badge>PyTorch</Badge>
          <Badge>TensorFlow</Badge>
          <Badge>Jupyter</Badge>
        </>
      );
    }
    if (config.type === 'web-application') {
      return (
        <>
          <Badge>Nginx</Badge>
          <Badge>Node.js</Badge>
          <Badge>SSL</Badge>
          <Badge>PM2</Badge>
        </>
      );
    }
    if (config.type === 'database') {
      return (
        <>
          <Badge>PostgreSQL</Badge>
          <Badge>Backup</Badge>
          <Badge>Monitoring</Badge>
          <Badge>SSL</Badge>
        </>
      );
    }
    if (config.type === 'api-backend') {
      return (
        <>
          <Badge>Docker</Badge>
          <Badge>Kubernetes</Badge>
          <Badge>Load Balancer</Badge>
          <Badge>Auto-Scale</Badge>
        </>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cpu className="h-5 w-5" />
          System Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Operating System:</span>
            <div className="font-medium">{config.os || 'Ubuntu 22.04 LTS'}</div>
          </div>
          <div>
            <span className="text-gray-600">CPU Cores:</span>
            <div className="font-medium">{config.cpu || '8 cores'}</div>
          </div>
          <div>
            <span className="text-gray-600">Memory:</span>
            <div className="font-medium">{config.ram || '16GB'}</div>
          </div>
          <div>
            <span className="text-gray-600">Storage:</span>
            <div className="font-medium">{config.storage || '100GB SSD'}</div>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <span className="text-gray-600 text-sm">Software Stack:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {getSoftwareBadges()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
