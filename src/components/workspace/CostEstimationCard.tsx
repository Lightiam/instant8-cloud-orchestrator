
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud } from 'lucide-react';
import { DeploymentConfig } from '@/services/deploymentService';

interface CostEstimationCardProps {
  config: DeploymentConfig;
}

export function CostEstimationCard({ config }: CostEstimationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5" />
          Deployment Ready
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">AWS:</span>
            <span className="font-bold text-green-600">✓ Ready</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Azure:</span>
            <span className="font-bold text-blue-600">✓ Ready</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Google Cloud:</span>
            <span className="font-bold text-orange-600">✓ Ready</span>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <div className="text-lg font-bold text-primary">All Providers Available</div>
          <div className="text-sm text-gray-600">Choose your preferred platform</div>
        </div>
      </CardContent>
    </Card>
  );
}
