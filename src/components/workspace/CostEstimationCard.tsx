
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';
import { DeploymentConfig } from '@/services/deploymentService';

interface CostEstimationCardProps {
  config: DeploymentConfig;
}

export function CostEstimationCard({ config }: CostEstimationCardProps) {
  const getCosts = () => {
    const costs = {
      aws: config.type === 'machine-learning' ? '$342/month' : 
           config.type === 'database' ? '$156/month' : 
           config.type === 'api-backend' ? '$89/month' : '$127/month',
      azure: config.type === 'machine-learning' ? '$378/month' : 
             config.type === 'database' ? '$167/month' : 
             config.type === 'api-backend' ? '$98/month' : '$142/month',
      gcp: config.type === 'machine-learning' ? '$356/month' : 
           config.type === 'database' ? '$159/month' : 
           config.type === 'api-backend' ? '$92/month' : '$134/month'
    };
    return costs;
  };

  const costs = getCosts();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Cost Estimation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">AWS:</span>
            <span className="font-bold text-green-600">{costs.aws}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Azure:</span>
            <span className="font-bold text-blue-600">{costs.azure}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Google Cloud:</span>
            <span className="font-bold text-orange-600">{costs.gcp}</span>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <div className="text-lg font-bold text-primary">Best Value: AWS</div>
          <div className="text-sm text-gray-600">Recommended for your configuration</div>
        </div>
      </CardContent>
    </Card>
  );
}
